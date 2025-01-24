export function deleteRentalError(resource) {
  return {
    type: "deleteRental",
    message: `${resource} not finished yet!`,
  };
}
