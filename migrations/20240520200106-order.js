'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Order', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      orderId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'UserDetails',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      addressId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Address', 
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      productDetails: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deliveryCharge: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      totalPrice: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      productPrice:{
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Order');
  },
};
