const { body } = require("express-validator");

module.exports=[

body("employee")
.notEmpty()
.withMessage("Employee Required"),

body("date")
.notEmpty()
.withMessage("Date Required"),

body("status")
.notEmpty()
.withMessage("Status Required"),

];