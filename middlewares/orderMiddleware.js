const { orderAddSchema, orderUpdateSchema } = require("../validation/orderValidation");

exports.orderUpdateMiddleware = async (req, res ,next) => {
    try {
        const { error } = orderUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        
        next();
    } catch (error) {
        console.error("Validation error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.orderAddMiddleware = async (req, res ,next) => {
    try {
        const { error } = orderAddSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        
        next();
    } catch (error) {
        console.error("Validation error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
