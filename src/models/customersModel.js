import joi from "joi";

export const customerSchema = joi.object({
  cpf: joi
    .string()
    .length(11)
    .required()
    .pattern(/^[0-9]+$/) // numeric digits only
    .messages({
      "string.base": '"cpf" must be a string',
      "string.length": '"cpf" must contain 11 characters',
      "string.empty": '"cpf" cannot be a empty string',
      "any.required": '"cpf" is mandatory',
      "string.pattern.base": '"cpf" must contain only numbers',
    }),

  phone: joi
    .string()
    .pattern(/^[0-9]{10,11}$/) // 10 or 11 numeric digits
    .required()
    .messages({
      "string.base": '"phone" must be a string',
      "string.pattern.base": '"phone" must contain 10 or 11 numeric digits',
      "string.empty": '"phone" cannot be a empty string',
      "any.required": '"phone" is mandatory',
    }),

  name: joi
    .string()
    .required()
    .min(1) // cannot be a empty string
    .trim() // Removes blank spaces at the beginning/end
    .messages({
      "string.base": '"name" must be a string',
      "string.empty": '"name" cannot be a empty string',
      "any.required": '"name" is mandatory',
      "string.min": '"name" cannot be a empty string',
    }),
});
