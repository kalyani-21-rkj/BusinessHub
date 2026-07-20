const express = require("express");

const router = express.Router();

const {
  createBill,
  getBills,
  getBillById,
  deleteBill,
} = require("../controllers/billController");

router.post("/", createBill);
router.get("/", getBills);
router.get("/:id", getBillById);
router.delete("/:id", deleteBill);

module.exports = router;