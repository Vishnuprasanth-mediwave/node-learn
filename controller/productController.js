const { models, Sequelize } = require("../config/sequelize-config");
const Op = Sequelize.Op;

exports.ProductAdd = async (req, res) => {  
    try {
        const existingProduct = await models.Product.findOne({ where: { product_name: req.body.product_name } });
    
        if (existingProduct) {
          return res.status(400).json({ error: "Product already exists, please change the product name" });
        }
      await models.Product.create(req.body);
      res.status(200).json({ message: "successfully Added"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" , msg : error});
    }
  };

  exports.getAllProduct = async (req, res) => {  
    try {
        const { search, sortOrder, startsWith, clothesType } = req.query;
    
        // Determine the sorting order from query parameters
        const order = sortOrder === 'desc' ? 'DESC' : 'ASC';
        
        // Create a filter for the search query
        let where = {};
    
        if (search) {
          where.product_name = {
            [Op.iLike]: `%${search}%`
          };
        }
    
        if (startsWith) {
          where.product_name = {
            [Op.iLike]: `${startsWith}%`
          };
        }
        
        if (clothesType) {
            const clothesTypeArray = Array.isArray(clothesType) ? clothesType : [clothesType];
            where.clothes_type = {
              [Op.overlap]: clothesTypeArray // Use overlap to find any common elements
            };
          }
        // Fetch all products with the specified filter and sorting order
        const products = await models.Product.findAll({
          where,
          order: [['product_name', order]]
        });
    
      res.status(200).json({ results: products});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" , msg : error});
    }
  };

  exports.productUpdate = async (req, res) => {
    try {
      const productId = req.params.id; 
      const updateData = req.body;
  
      const updatedProduct = await models.Product.update(updateData, {
        where: { id: productId }
      });
  
      if (updatedProduct==0) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.status(200).json({ message: "Product successfully updated", product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error", msg: error.message });
    }
  };
  

exports.productDeleted = async (req, res) => {
  try {
    const productId = req.params.id; 

    const deletedRows = await models.Product.destroy({
      where: { id: productId }
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", msg: error.message });
  }
};


