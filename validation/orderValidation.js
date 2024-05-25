const Joi = require('joi');

const productSchema = Joi.object({
    productId: Joi.string().uuid().required(),
    type: Joi.string().required(),
    washType: Joi.string().required()
});

const orderAddSchema = Joi.object({
    productDetails: Joi.array().items(productSchema).required(),
    deliveryCharge: Joi.number().integer().min(0).required(),
    addressId: Joi.string().uuid().required()
});
const orderUpdateSchema = Joi.object({
    productDetails: Joi.array().items(productSchema).optional(),
    deliveryCharge: Joi.number().integer().min(0).optional(),
    addressId: Joi.string().uuid().optional(),
    status:Joi.string().optional()
});


module.exports = {
    orderUpdateSchema,
    orderAddSchema
  };