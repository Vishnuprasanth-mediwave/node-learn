// validations/productValidation.js
const Joi = require('joi');
const priceItemSchema = Joi.object().pattern(
  Joi.string(),
  Joi.number().min(0).required()
).required();

const priceSchema = Joi.object().pattern(
  Joi.string(),
  Joi.array().items(priceItemSchema).min(1).required()
).required();

const productUpdateSchema = Joi.object({
  product_name: Joi.string().optional(),
  image_path: Joi.string().optional(),
  clothes_type: Joi.array().items(Joi.string()).optional(),
  price: priceSchema.optional(),
});

const productAddSchema = Joi.object({
    product_name: Joi.string().required(),
    image_path: Joi.string().optional(),
    clothes_type: Joi.array().items(Joi.string()).optional(),
    price: priceSchema.required(),
  });

module.exports = {
  productUpdateSchema,
  productAddSchema
};
