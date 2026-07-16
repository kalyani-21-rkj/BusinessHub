const express = require("express");
const router = express.Router();

const {
    applyLeave,
    getLeaves,
    updateLeave,
} = require("../controllers/leaveController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const leaveValidation = require("../validators/leaveValidator");
const validate = require("../middleware/validate");

router.post(
    "/",
    protect,
    authorizeRoles("admin", "employee"),
    leaveValidation,
    validate,
    applyLeave
);

router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getLeaves
);

router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    leaveValidation,
    validate,
    updateLeave
);

module.exports = router;