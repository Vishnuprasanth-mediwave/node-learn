module.exports = function model(sequelize, types) {
const Address = sequelize.define("Address", {
    id: {
      type: types.UUID,
      defaultValue: types.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: types.UUID,
      allowNull: false,
      references: {
        model: {
          tableName: 'UserDetails',
        },
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    street: {
      type: types.STRING,
      allowNull: true,
    },
    city: {
      type: types.STRING,
      allowNull: true,
    },
    state: {
      type: types.STRING,
      allowNull: true,
    },
    postalCode: {
      type: types.STRING,
      allowNull: true,
    },
    address_type: {
        type: types.STRING,
        allowNull: true,
      }
      
    },
    {
        // Define indexes for the model
        tableName: 'Address',
        indexes: [
          {
            fields: ['userId'] // Index on userId field
          },
          // Add more indexes if needed
        ]
    });
    
  
  // Establish the association
  Address.associate = (models) => {
    Address.belongsTo(models.UserDetails, { foreignKey: 'userId' });

    Address.hasMany(models.Order, {
      as: 'orders',
      foreignKey: 'addressId',
      sourceKey:'id'
    });
  };
  return Address ;
}