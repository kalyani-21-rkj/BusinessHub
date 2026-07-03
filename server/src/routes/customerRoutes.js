const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addCustomer,
    getCustomers,
} = require("../controllers/customerController");

router.post("/", protect, addCustomer);

router.get("/", protect, getCustomers);

module.exports = router;