const { sequelize, models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;
exports.OrderPlaced = async (req, res) => {
  try {
      const userId = req.params.id;
      let price = 0;
      let total = 0;
      const orderProducts = req.body.productDetails;
      const listOfProducts = [];

      for (const item of orderProducts) {
          const product = await models.Product.findOne({
              where: { id: item.productId }
          });

          if (!product) {
              return res.status(404).json({ error: `Product with ID ${item.productId} not found` });
          }

          const productPrices = product.price[item.type];
          if (!productPrices) {
              return res.status(400).json({ error: `Type ${item.type} not found for product ${item.productId}` });
          }

          const priceItem = productPrices.find(p => p[item.washType] !== undefined);
          if (!priceItem) {
              return res.status(400).json({ error: `washType ${item.washType} not found for product ${item.productId}` });
          }

          const itemPrice = priceItem[item.washType];
          price += itemPrice;

          listOfProducts.push({
              productId: product.id,
              name: product.product_name,
              type: item.type,
              washType: item.washType,
              price: itemPrice
          });
      }

      function generateOrderId() {
          const randomNum = Math.floor(10000000 + Math.random() * 90000000);
          return `OD${randomNum}`;
      }

      const orderId = generateOrderId();
      const deliveryCharge = req.body.deliveryCharge || 0;
      total = price + deliveryCharge;

      const orderData = {
          userId,
          orderId,
          totalPrice: total,
          productDetails: listOfProducts,
          status: "pending",
          deliveryCharge,
          addressId: req.body.addressId,
          productPrice: price
      };

      const orderResp = await models.Order.create(orderData);

      res.status(200).json({ message: "Order placed successfully", orderResp });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error", msg: error.message });
  }
};

exports.OrderUpdate = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    let price = 0;
    let total = 0;
    const listOfProducts = [];

    const order = await models.Order.findOne({ where: { orderId: orderId } });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const deliveryCharge = req.body.deliveryCharge ?? order.deliveryCharge;
    const orderProducts = req.body?.productDetails ?? order.productDetails;

    for (const item of orderProducts) {
      const product = await models.Product.findOne({ where: { id: item.productId } });

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      if (!product.price[item.type]) {
        throw new Error(`Type ${item.type} not found for product ${item.productId}`);
      }

      const prices = product.price[item.type];
      let itemPriceFound = false;
      
      for (const priceItem of prices) {
        if (priceItem[item.washType] !== undefined) {
          const itemPrice = priceItem[item.washType];
          price += itemPrice;
          listOfProducts.push({
            productId: product.id,
            name: product.product_name,
            type: item.type,
            washType: item.washType,
            price: itemPrice
          });
          itemPriceFound = true;
          break; // Found the price, no need to continue loop
        }
      }

      if (!itemPriceFound) {
        throw new Error(`washType ${item.washType} not found for product ${item.productId}`);
      }
    }

    total = price + deliveryCharge;

    const updateData = {
      productDetails: listOfProducts,
      deliveryCharge: deliveryCharge,
      totalPrice: total,
      addressId: req.body.addressId ?? order.addressId,
      status: req.body.status ?? order.status,
      productPrice: price
    };

    const [updated] = await models.Order.update(updateData, { where: { orderId: orderId } });

    if (updated === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ message: "Order successfully updated", order: updateData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", msg: error.message });
  }
};


exports.getAllOrdersWithDetails = async (req, res) => {
  try {
    const orders = await models.Order.findAll({
      include: [
        {
          model: models.UserDetails,
          as: 'user',
          attributes: ['id', 'name','mobileNumber','email'] // Include necessary user attributes
        },
        {
          model: models.Address,
          as: 'address',
          attributes: ['id', 'street', 'city', 'state', 'postalCode', 'address_type'] // Include necessary address attributes
        }
      ]
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error', msg: error.message });
  }
};

exports.getOrdersByUserId = async (req, res) => {
  try {
    const orders = await models.Order.findAll({
      where:{userId:req.params.id},
      include: [
        {
          model: models.UserDetails,
          as: 'user',
          attributes: ['id', 'name','mobileNumber','email'] // Include necessary user attributes
        },
        {
          model: models.Address,
          as: 'address',
          attributes: ['id', 'street', 'city', 'state', 'postalCode', 'address_type'] // Include necessary address attributes
        }
      ]
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error', msg: error.message });
  }
};

exports.getOrdersByOrderId = async (req, res) => {
  try {
    const orders = await models.Order.findOne({
      where:{orderId:req.params.orderId},
      include: [
        {
          model: models.UserDetails,
          as: 'user',
          attributes: ['id', 'name','mobileNumber','email'] // Include necessary user attributes
        },
        {
          model: models.Address,
          as: 'address',
          attributes: ['id', 'street', 'city', 'state', 'postalCode', 'address_type'] // Include necessary address attributes
        }
      ]
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error', msg: error.message });
  }
};


exports.orderDeleted = async (req, res) => {
  try {
    const OrderId = req.params.orderId; 

    const deletedRows = await models.Order.destroy({
      where: { orderId: OrderId }
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product successfully deleted" , deletedRows});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", msg: error.message });
  }
};