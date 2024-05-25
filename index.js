const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const config = require("./config/config");
// const pgClient = require('./pg-config');
const { models, Sequelize } = require("./config/sequelize-config");
const Op = Sequelize.Op;

// const { notfound } = require("./middlewares/notFound.middleware");
// const { errorHandler } = require("./middlewares/errorHandler.middleware");
 
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order")
const addressRoute = require("./routes/address")
const adminRoute =  require("./routes/admin")



// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/address', addressRoute)
app.use('/admin', adminRoute )


app.listen(config.port, config.host, () => {
  console.log(`Server running at http://${config.host}:${config.port}/`);
});
