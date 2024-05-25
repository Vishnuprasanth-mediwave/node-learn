const { productUpdateSchema, productAddSchema } = require("../validation/productValidation");

exports.productUpdateMiddleware = async (req, res ,next) => {
    try {
        const { error } = productUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        
        next();
    } catch (error) {
        console.error("Validation error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.productAddMiddleware = async (req, res ,next) => {
    try {
        const { error } = productAddSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        
        next();
    } catch (error) {
        console.error("Validation error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
