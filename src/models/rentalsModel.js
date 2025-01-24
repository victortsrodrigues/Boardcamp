import joi from "joi";

export const rentalSchema = joi.object({
  daysRented: joi.number()
    .positive()
    .required()
    .messages({
      'number.base': '"daysRented" must be a number',
      'number.positive': '"daysRented" must be greater than 0',
      'any.required': '"daysRented" is required'
    }),

  gameId: joi.number()
    .required()
    .messages({
      'number.base': '"gameId" must be a number',
      'any.required': '"gameId" is required'
    }),

  customerId: joi.number()
    .required()
    .messages({
      'number.base': '"customerId" must be a number',
      'any.required': '"customerId" is required'
    })
});
