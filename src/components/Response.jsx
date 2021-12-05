const Response = ({
  modelContainer,
  loss,
  haveWeightList,
  updateStatus,
  baseline
}) => {
  return (
    <div className="container mx-auto px-10 flex flex-col items-center">
      {updateStatus && (
        <h1
          className="text-center uppercase my-5 font-semibold underline"
          style={{ width: "fit-content" }}
        >
          {updateStatus}
        </h1>
      )}
      <div className="" ref={(el) => (modelContainer.current = el)}></div>
      {loss && (
        <table class="table-auto container my-4 uppercase mx-auto font-semibold">
          <thead className="">
            <tr>
              <th className="w-1/2 mb-4 pb-3">Type of Loss</th>
              <th className="">Loss</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-yellow-200 border-solid border-b-2 border-yellow-500">
              <td className="py-2 text-center ">Training Loss</td>
              <td className="text-center">{loss.trainLoss}</td>
            </tr>
            <tr className="bg-yellow-200 text-center border-b-2 border-solid border-yellow-500">
              <td className="py-2 ">Validation Loss</td>
              <td>{loss.valLoss}</td>
            </tr>
            <tr className="bg-yellow-200 text-center border-solid border-b-2 border-yellow-500">
              <td className="py-2">Testing Loss</td>
              <td>{loss.testLoss}</td>
            </tr>
            {baseline && (
              <tr className="bg-yellow-200 text-center border-solid border-b-2 border-yellow-500">
                <td className="py-2">Baseline Error</td>
                <td>{baseline}</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Response;
