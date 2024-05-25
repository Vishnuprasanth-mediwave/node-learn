module.exports = function model(sequelize, types) {

const UserDetails = sequelize.define("UserDetails", {
  id: {
    type: types.UUID,
    defaultValue: types.UUIDV4,
    primaryKey: true
  },
  customerId: {
    type: types.STRING,
    allowNull: false,
    unique: true,
  },
  mobileNumber: {
    type: types.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: types.STRING,
    allowNull: false,
  },
  email: {
    type: types.STRING,
    allowNull: true,
  },
 
  active_detail: {
    type: types.STRING,
    allowNull: true,
  },
  
});
UserDetails.associate = (models) => {
  UserDetails.hasMany(models.Address, { foreignKey: 'userId' });

  UserDetails.hasMany(models.Order, {
    as: 'orders',
    foreignKey: 'userId',
    sourceKey:'id'
  });
};
return UserDetails;
}