import joi from "joi";

export const gameSchema = joi.object({
  name: joi.string().trim().required().min(1),
  image: joi.string(),
  stockTotal: joi.number().positive().required(),
  pricePerDay: joi.number().positive().required()
})