import joi from "joi";

export const gameSchema = joi.object({
  name: joi.string().trim().required().min(1).messages({
    "string.empty": '"name" cannot be an empty string',
    "any.required": '"name" is mandatory',
  }),
  image: joi.string(),
  stockTotal: joi.number().positive().required().messages({
    "number.base": '"stockTotal" must be a number',
    "number.positive": '"stockTotal" must be greater than 0',
    "any.required": '"stockTotal" is mandatory',
  }),
  pricePerDay: joi.number().positive().required().messages({
    "number.base": '"pricePerDay" must be a number',
    "number.positive": '"pricePerDay" must be greater than 0',
    "any.required": '"pricePerDay" is mandatory',
  }),
});
