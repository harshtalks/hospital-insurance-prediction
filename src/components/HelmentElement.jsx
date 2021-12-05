import Helmet from "react-helmet";
const HelmetEl = () => {
  return (
    <Helmet>
      <title>Hospital Insurance Price Prediction Model</title>
      <link
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Bitter:wght@100;200;300;400;500;600&family=Lato:wght@100;300;400;700&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};

export default HelmetEl;
