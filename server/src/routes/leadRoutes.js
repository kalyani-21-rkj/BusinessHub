const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addLead,
    getLeads,
} = require("../controllers/leadController");

router.post("/", protect, addLead);
router.get("/", protect, getLeads);

module.exports = router;