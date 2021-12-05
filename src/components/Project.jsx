import { data } from "../data/insurance";
import Graphs from "./Graphs";
const ProjectDetails = () => {
  const keyNames = Object.keys(data[0]);
  const listFeatures = keyNames.slice(0, -1);
  return (
    <div className="container text-center px-8  mx-auto mb-5">
      <p
        className="leading-loose text text-sm md:px-40 md:text-base"
        style={{ color: "#495057" }}
      >
        Health Insurance companies have a tough task at determining premiums for
        their customers. While the health care law in the United States does
        have some rules for the companies to follow to determine premiums, it’s
        really up to the companies on what factor/s they want to hold more
        weightage to. So, what are the most important factors? And how much
        statistical importance do they hold? Using Multiple Linear Regression.
        we will try to determine the most (statistically) significant factors
        (independent variables) that influence the premiums charged (dependent
        variable) by an insurance company. we have downloaded the dataset from
        Kaggle.
      </p>
      <div className="container my-8">
        <h2 className="text-xl md:text-3xl">Features</h2>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3">
          {listFeatures &&
            listFeatures.map((el) => (
              <h4
                className="bg-red-200 m-3 text-xl py-1 md:py-2 uppercase text-bold"
                key={el}
              >
                {el}
              </h4>
            ))}
        </div>
      </div>
      <Graphs />
    </div>
  );
};

export default ProjectDetails;
