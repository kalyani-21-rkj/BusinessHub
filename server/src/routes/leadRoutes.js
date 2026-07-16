const express = require("express");
const router = express.Router();

const {
    createLead,
    getLeads,
    updateLead,
} = require("../controllers/leadController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const leadValidation = require("../validators/leadValidator");
const validate = require("../middleware/validate");

console.log("protect:", typeof protect);
console.log("authorizeRoles:", typeof authorizeRoles);
console.log("leadValidation:", leadValidation);
console.log("validate:", typeof validate);
console.log("createLead:", typeof createLead);

router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    leadValidation,
    validate,
    createLead
);

router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getLeads
);

router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    leadValidation,
    validate,
    updateLead
);

module.exports = router;