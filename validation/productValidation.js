// validations/productValidation.js
const Joi = require('joi');

const priceSchema = Joi.object().pattern(
    Joi.string(),
    Joi.array().items(Joi.object().required()).required()
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
