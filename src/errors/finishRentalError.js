export function finishRentalError(resource) {
  return {
    type: "finishRental",
    message: `${resource} already finished!`,
  };
}
