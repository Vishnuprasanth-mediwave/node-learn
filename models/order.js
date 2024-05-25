module.exports = function model(sequelize, types) {

const Order = sequelize.define('Order', {
  id: {
    type: types.UUID,
    defaultValue: types.UUIDV4,
    primaryKey: true,
  },
  orderId: {
    type: types.STRING,
    allowNull: false,
    unique: true,
  },
  userId: {
    type: types.UUID,
    allowNull: false,
    references: {
      model: 'UserDetails', 
      key: 'id',
    },
  },
  addressId: {
    type: types.UUID,
    allowNull: false,
    references: {
      model: 'Address', 
      key: 'id',
    },
  },
  productDetails: {
    type: types.JSONB,
    allowNull: false,
  },
  status: {
    type: types.STRING,
    allowNull: false,
  },
  totalPrice: {
    type: types.FLOAT,
    allowNull: false,
  },
  deliveryCharge: {
    type: types.FLOAT,
    allowNull: true,
  },
  productPrice:{
    type: types.FLOAT,
    allowNull: false,
  },
},
{
  tableName: 'Order',
  indexes: [
    {
      fields: ['id'],
    },
  ],

});

Order.associate = (models) => {
  Order.belongsTo(models.UserDetails, {
    as: 'user',
    foreignKey: 'userId',
    targetKey: 'id'
  });
  Order.belongsTo(models.Address, {
    as: 'address',
    foreignKey: 'addressId',
    targetKey:'id'
  });
};

 return Order;
}
