module.exports = function model(sequelize, types) {
  
const Product = sequelize.define('Product', {
  id: {
    type: types.UUID,
    defaultValue: types.UUIDV4,
    primaryKey: true
  },
  product_name: {
    type: types.STRING,
    allowNull: false,
    unique:true
  },
  image_path: {
    type: types.STRING,
    allowNull: true,
  },
  clothes_type: {
    type: types.ARRAY(types.STRING),
    allowNull: true,
  },
  price: {
    type: types.JSONB, // Use JSONB for nested objects in PostgreSQL
    allowNull: false,
  },
});

return Product;
}