const Heading = () => {
  return (
    <div className="container mx-auto p-8">
      <h4 className="uppercase text-center text-lg font-medium underline">
        Harsh Pareek
      </h4>
      <h1
        className="font-serif uppercase font-extrabold text-center text-2xl md:text-4xl lg:text-6xl font-bold tracking-wider md:mt-40 mt-20  text-black text-opacity-80"
        style={{ fontFamily: '"Bitter", serif', color: "#582f0e" }}
      >
        Hospital Insurance Price Prediction
      </h1>
      <h4 className="uppercase text-center mt-3 lg:mt-6 font-bold text-xl text-gray-500">
        Deep Learning Model to estimate the insurance billing with the help of
        kaggle database
      </h4>
      <div className="img container flex justify-center  mt-4 md:my-20 mb-4 md:mb-10">
        <img
          src="https://openclipart.org/download/240521/doctorsinmasks.svg"
          alt="hospital"
        />
      </div>
      <div className="border-t-2 border-gray-500 border-solid"></div>
    </div>
  );
};

export default Heading;
