import { useEffect } from "react";
import "./styles/main.scss";
import HelmetEl from "./components/HelmentElement";
import { InsuranceDataSet } from "./context/dataContext";
import * as normalization from "./js/normalization";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";
import { useState, useRef } from "react";
//importing Components
import Heading from "./components/Heading";
import ProjectDetails from "./components/Project";
import Baseline from "./components/Baseline";
import Response from "./components/Response";

export default function App() {
  const [baseline, setBaseline] = useState(null);
  const [epochStatus, setEpochStatus] = useState(null);
  const [haveWeightList, setWeightList] = useState(null);
  const [loss, setLoss] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const insuranceData = new InsuranceDataSet();
  const buttonEl = useRef(null);
  const tensor = {};
  let modelContainer = useRef(null);

  const arrayToTensor = () => {
    tensor.rawTrainFeatures = tf.tensor2d(insuranceData.trainFeatures);
    tensor.rawTestFeatures = tf.tensor2d(insuranceData.testFeatures);
    tensor.trainTargets = tf.tensor2d(insuranceData.trainTargets);
    tensor.testTargets = tf.tensor2d(insuranceData.testTargets);

    const { mean, std } = normalization.findMeanAndSTD(tensor.rawTrainFeatures);

    tensor.trainFeatures = normalization.findNormalizedData(
      tensor.rawTrainFeatures,
      mean,
      std
    );

    tensor.testFeatures = normalization.findNormalizedData(
      tensor.rawTestFeatures,
      mean,
      std
    );
  };

  useEffect(() => {
    finalFunc();
  }, []);

  const finalFunc = async () => {
    insuranceData.loadData();
    arrayToTensor();
    setUpdateStatus(
      "Data is now available as tensors.\nClick a train button to begin."
    );
    computeBaseline();
    await setup();
  };

  const computeBaseline = () => {
    const avgValue = tensor.trainTargets.mean();

    const baseLineError = tensor.testTargets.sub(avgValue).square().mean();
    const baseLineFixed = baseLineError.dataSync()[0].toFixed(2);
    setBaseline(baseLineFixed);
  };

  const multiLayerPerceptron = () => {
    const model = tf.sequential();

    model.add(
      tf.layers.dense({
        inputShape: [6],
        units: 50,
        activation: "sigmoid",
        kernelInitializer: "leCunNormal"
      })
    );

    model.add(
      tf.layers.dense({
        units: 50,
        activation: "sigmoid",
        kernelInitializer: "leCunNormal"
      })
    );

    model.add(
      tf.layers.dense({
        units: 1
      })
    );

    model.summary();

    return model;
  };

  const run = async (model, isWeightlistShown) => {
    model.compile({
      optimizer: tf.train.sgd(0.01),
      loss: "meanSquaredError"
    });

    let trainLogs = [];
    setUpdateStatus("Starting Training Process");

    await model.fit(tensor.trainFeatures, tensor.trainTargets, {
      batchSize: 40,
      epochs: 200,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: async (epoch, logs) => {
          setEpochStatus(
            `${epoch + 1} epoch${
              epoch + 1 === 1 ? " as" : "s have"
            } been completed out of ${200} epochs`
          );
          trainLogs.push(logs);

          tfvis.show.history(modelContainer.current, trainLogs, [
            "loss",
            "val_loss"
          ]);

          if (isWeightlistShown) {
            model.layers[0]
              .getWeights()[0]
              .data()
              .then((kernelAsArr) => {
                const weightList = describeKernelElements(kernelAsArr);
                setWeightList(weightList);
              });
          }
        }
      }
    });

    setUpdateStatus("Running Model on Test Data...");

    const results = model.evaluate(tensor.testFeatures, tensor.testTargets, {
      batchSize: 40
    });

    const test_loss = results.dataSync()[0];
    const train_loss = trainLogs[trainLogs.length - 1].loss;
    const val_loss = trainLogs[trainLogs.length - 1].val_loss;
    setLoss({
      testLoss: test_loss,
      trainLoss: train_loss,
      valLoss: val_loss
    });
  };

  const describeKernelElements = (kernel) => {
    tf.util.assert(
      kernel.length === 6,
      `kernel must be a array of length 6, got ${kernel.length}`
    );

    const outList = [];
    for (let i = 0; i < kernel.length; i++) {
      outList.push({
        description: insuranceData.featureList[i],
        value: kernel[i]
      });
    }

    return outList;
  };

  const setup = async () => {
    buttonEl.current.addEventListener("click", async () => {
      const model = multiLayerPerceptron();
      await run(model, false);
    });
  };

  return (
    <>
      <HelmetEl />
      <Heading />
      <ProjectDetails />
      <Baseline baseline={baseline} />
      <Response
        updateStatus={updateStatus}
        modelContainer={modelContainer}
        haveWeightList={haveWeightList}
        loss={loss}
        baseline={baseline}
      />
      <div className="container mx-auto flex justify-center">
        <button
          ref={buttonEl}
          className="bg-yellow-500 my-10 py-2 text-lg px-10 uppercase font-bold "
        >
          Start Training
        </button>
      </div>
    </>
  );
}
