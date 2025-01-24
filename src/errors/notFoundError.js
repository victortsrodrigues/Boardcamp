export function notFoundError(resource) {
  return {
      type: "notFound",
      message: `${resource} not found!`
  }
}