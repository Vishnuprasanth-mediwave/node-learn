// models/otp.js
module.exports = function model(sequelize, types) {

const otpTable = sequelize.define("otpTable", {
  id: {
    type: types.UUID,
    defaultValue: types.UUIDV4,
    primaryKey: true
  },
  mobileNumber: {
    type: types.STRING,
    allowNull: false,
  },
  otp: {
    type: types.STRING,
    allowNull: false,
  }
  },
  {
    tableName: 'otpTable',
    indexes: [
      {
        fields: ['id'],
      },
    ],
  
});

return otpTable;
}