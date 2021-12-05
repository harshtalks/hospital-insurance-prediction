const Baseline = ({ baseline }) => {
  return (
    <div className="container text-center px-8 mx-auto my-5 md:my-10">
      <p className="leading-loose text text-sm md:px-40 md:text-base">
        Before we begin our model fitting process, we need to have baseline
        error measurement, so we have a basic knowledge of what we expect from
        our model. for our model, we will be using SGD 'schocastic gradient
        descent' as an optimizer and 'meanSquaredError' as a loss function
        because our model will be susceptible to outliers.
      </p>
      <h4
        className="bg-yellow-400 mx-auto uppercase py-3 my-2 md:my-8 font-bold"
        style={{ width: "60%" }}
      >
        Baseline Error: {baseline}
      </h4>
      <p className="leading-loose text text-sm md:px-40 md:text-base">
        the value we got for the baseline error is{" "}
        <span className="font-bold">{baseline}</span> This means that whenever
        our model is predicting for the example features, the output will have
        mean square error of <span className="font-bold">{baseline}</span> hence
        the predicted billing charge will have margin error of{" "}
        <span className="font-bold">
          {Math.sqrt(baseline).toFixed(2) + "$"}
        </span>
        . now this is a lot. and we want to reduce this loss. For that we will
        use a multilayer perceptron model.
      </p>
    </div>
  );
};

export default Baseline;
