export const findMeanAndSTD = (data) => {
  const mean = data.mean(0);
  const diffFromMean = data.sub(mean);
  const squaredDiffFromMean = diffFromMean.square();
  const variance = squaredDiffFromMean.mean(0);
  const std = variance.sqrt();

  return { mean, std };
};

export const findNormalizedData = (data, mean, std) => {
  const diffFromMean = data.sub(mean);
  const normalizedData = diffFromMean.div(std);

  return normalizedData;
};
