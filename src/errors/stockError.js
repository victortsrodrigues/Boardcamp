export function stockError(resource) {
  return {
      type: "unprocessable",
      message: `${resource} not in stock!`
  }
}