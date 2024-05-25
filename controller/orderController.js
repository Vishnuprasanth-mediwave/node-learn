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
                throw new Error(`Product with ID ${item.productId} not found`);
            }

            if (product.price[item.type]) {
                const prices = product.price[item.type];
                prices.forEach(priceItem => {
                    if (priceItem[item.washType] !== undefined) {
                        price += priceItem[item.washType];
                        const result = {
                            name: product.product_name,
                            type: item.type,
                            washType: item.washType,
                            price: priceItem[item.washType]
                        }
                        listOfProducts.push(result)
                    }
                });
            } else {
                throw new Error(`Type ${item.type} not found for product ${item.productId}`);
            }
        }

        function generateOrderId() {
            const randomNum = Math.floor(10000000 + Math.random() * 90000000);
            return `OD${randomNum}`;
        }

        const orderId = generateOrderId();
        if (req.body.deliveryCharge) {
            total = price + req.body.deliveryCharge
        }

        const ordeResp = await models.Order.create({ userId, orderId: orderId, totalPrice: total, productDetails: listOfProducts, status: "pending", deliveryCharge: req.body.deliveryCharge,addressId: req.body.addressId, productPrice: price });

        res.status(200).json({ message: "Order placed successfully", ordeResp });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", msg: error.message });
    }
};

exports.getOrdersWithDetails = async (req, res) => {
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
