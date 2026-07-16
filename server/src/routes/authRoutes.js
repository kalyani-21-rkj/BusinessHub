const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.get("/profile", authMiddleware, async (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});

router.post("/login", loginUser);
router.get("/test", (req, res) => {
    res.send("Auth Route Working");
});

module.exports = router;