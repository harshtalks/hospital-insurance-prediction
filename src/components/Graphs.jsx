import Age from "./Age";
import BMI from "./Bmi";
import AgeBMI from "./AgeBMI";
const Graphs = () => {
  return (
    <div className="grid md:grid-cols-3 mx-auto">
      <Age />
      <BMI />
      <AgeBMI />
    </div>
  );
};

export default Graphs;
