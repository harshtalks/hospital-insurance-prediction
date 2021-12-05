import { data } from "../data/insurance";

export class InsuranceDataSet {
  constructor() {
    this.trainFeatures = null;
    this.trainTargets = null;
    this.testFeatures = null;
    this.testTargets = null;
    this.featureList = null;
  }

  get numFeatures() {
    if (this.trainFeatures === null) {
      throw new Error("data must be loaded beforeHand");
    }
    return this.trainFeatures[0].length;
  }

  loadData() {
    const {
      trainFeatures,
      testFeatures,
      trainTargets,
      testTargets,
      featureNames
    } = DataProvider();
    this.trainFeatures = trainFeatures;
    this.testFeatures = testFeatures;
    this.trainTargets = trainTargets;
    this.testTargets = testTargets;
    this.featureList = featureNames;

    this.shuffle(this.trainFeatures, this.trainTargets);
    this.shuffle(this.trainFeatures, this.trainTargets);
  }

  shuffle(data, target) {
    let counter = data.length;
    let temp = 0;
    let index = 0;
    while (counter > 0) {
      index = (Math.random() * counter) | 0;
      counter--;
      // data:
      temp = data[counter];
      data[counter] = data[index];
      data[index] = temp;
      // target:
      temp = target[counter];
      target[counter] = target[index];
      target[index] = temp;
    }
  }
}

const DataProvider = () => {
  const convertedArray = data.map((el) => Object.values(el));

  const keyNames = Object.keys(data[0]);
  const featureNames = keyNames.slice(0, -1);

  convertedArray.forEach((el) => {
    const sex = featureNames.indexOf("sex");
    if (el[sex] === "female") {
      el[sex] = 1;
    } else el[sex] = 1;

    const smoker = featureNames.indexOf("smoker");
    if (el[smoker] === "yes") {
      el[smoker] = 1;
    } else el[smoker] = 0;

    const region = featureNames.indexOf("region");
    if (el[region] === "southwest") {
      el[region] = 1;
    } else el[region] = 0;
    return el;
  });

  const features = convertedArray.map((el) => el.slice(0, -1));
  const targets = convertedArray.map((el) => el.slice(-1));

  const trainFeatures = features.slice(0, 1000);
  const testFeatures = features.slice(1001, convertedArray.length);

  const trainTargets = targets.slice(0, 1000);
  const testTargets = targets.slice(1001, targets.length);

  return {
    trainFeatures,
    trainTargets,
    testFeatures,
    testTargets,
    featureNames
  };
};
