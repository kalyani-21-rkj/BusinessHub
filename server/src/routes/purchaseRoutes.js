const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    addPurchase,
    getPurchases,
    getPurchaseById,
    updatePurchase,
    deletePurchase,
    getPurchaseStats,
} = require("../controllers/purchaseController");

router.get(
    "/stats",
    protect,
    authorizeRoles("admin", "manager"),
    getPurchaseStats
);

router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getPurchases
);


router.get(
    "/:id",
    protect,
    authorizeRoles("admin", "manager"),
    getPurchaseById
);
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    addPurchase
);
router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    updatePurchase
);
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deletePurchase
);

module.exports = router;