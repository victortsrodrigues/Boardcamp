export function conflictError(resource) {
  return {
      type: "conflict",
      message: `${resource} already exists!`
  }
}