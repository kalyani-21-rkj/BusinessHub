const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
console.log("✅ leaveRoutes Loaded");
const {
    applyLeave,
    getLeaves,
    getLeaveById,
    updateLeave,
    deleteLeave,
    approveLeave,
    rejectLeave,
    getLeaveStats,
} = require("../controllers/leaveController");


router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Leave Route Working",
  });
});

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Leave Route Working"
    });
});
router.post(
    "/",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    applyLeave
);

router.get(
    "/stats",
    protect,
    authorizeRoles("admin", "manager"),
    getLeaveStats
);

router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    getLeaves
);

router.get(
    "/:id",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    getLeaveById
);

router.put(
    "/:id",
    protect,
    authorizeRoles("admin", "manager"),
    updateLeave
);

router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteLeave
);

router.patch(
    "/:id/approve",
    protect,
    authorizeRoles("admin", "manager"),
    approveLeave
);

router.patch(
    "/:id/reject",
    protect,
    authorizeRoles("admin", "manager"),
    rejectLeave
);

module.exports = router;