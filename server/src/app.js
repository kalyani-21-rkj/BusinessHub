const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const customerRoutes = require("./routes/customerRoutes");
const leadRoutes = require("./routes/leadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const productRoutes = require("./routes/productRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

// Security
app.use(helmet());
app.use(cors());

// Request Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compress responses
app.use(compression());

// Logging (only in development)
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests. Try again later."
    }
});

app.use(limiter);

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec)
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payments", paymentRoutes);

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "BusinessHub API Running..."
    });
});

// Global Error Handler (keep this LAST)
app.use(errorHandler);

module.exports = app;