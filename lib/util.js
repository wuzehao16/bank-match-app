export function formatData (val) {
  for (let i in val) {
    val[i] = (
      typeof val[i] == "object"
      ? val[i][0]
      : val[i])
  }
  return val
};
