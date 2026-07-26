import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Avatar,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";

import {
  Edit,
  Delete,
  Visibility,
  Download,
} from "@mui/icons-material";

import { downloadPayslip } from "../../services/payrollService";

const PayrollTable = ({
  payrolls = [],
  loading,
  onView,
  onEdit,
  onDelete,
}) => {
  const handleDownload = async (id) => {
    try {
      const res = await downloadPayslip(id);

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = "Payslip.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);

      alert("Unable to Download Payslip");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        py={8}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (payrolls.length === 0) {
    return (
      <Typography
        align="center"
        sx={{ py: 8 }}
      >
        No Payroll Found
      </Typography>
    );
  }

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid #E5E7EB",
      }}
    >
      <Table>

        <TableHead>

          <TableRow
            sx={{
              bgcolor: "#F8FAFC",
            }}
          >
            <TableCell sx={{ fontWeight: 700 }}>
              Employee
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Department
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Basic Salary
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Bonus
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Deduction
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Net Salary
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Status
            </TableCell>

            <TableCell
              align="center"
              sx={{ fontWeight: 700 }}
            >
              Payslip
            </TableCell>

            <TableCell
              align="center"
              sx={{ fontWeight: 700 }}
            >
              Actions
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {payrolls.map((payroll) => (

            <TableRow
              key={payroll._id}
              hover
              sx={{
                transition: ".25s",
                "&:hover": {
                  bgcolor: "#F9FAFB",
                },
              }}
            >

              {/* Employee */}

              <TableCell>

                <Box
                  display="flex"
                  alignItems="center"
                  gap={2}
                >

                  <Avatar
                    sx={{
                      bgcolor: "#2563EB",
                      width: 44,
                      height: 44,
                      fontWeight: 700,
                    }}
                  >
                    {payroll.employee?.fullName?.charAt(0)}
                  </Avatar>

                  <Typography fontWeight={600}>
                    {payroll.employee?.fullName}
                  </Typography>

                </Box>

              </TableCell>

              {/* Department */}

              <TableCell>
                {payroll.employee?.department}
              </TableCell>

              {/* Basic */}

              <TableCell>
                ₹{Number(
                  payroll.basicSalary || 0
                ).toLocaleString("en-IN")}
              </TableCell>

              {/* Bonus */}

              <TableCell
                sx={{
                  color: "#16A34A",
                  fontWeight: 600,
                }}
              >
                ₹{Number(
                  payroll.bonus || 0
                ).toLocaleString("en-IN")}
              </TableCell>

              {/* Deduction */}

              <TableCell
                sx={{
                  color: "#DC2626",
                  fontWeight: 600,
                }}
              >
                ₹{Number(
                  payroll.deduction || 0
                ).toLocaleString("en-IN")}
              </TableCell>

              {/* Net Salary */}

              <TableCell
                sx={{
                  fontWeight: 700,
                  color: "#2563EB",
                }}
              >
                ₹{Number(
                  payroll.netSalary || 0
                ).toLocaleString("en-IN")}
              </TableCell>

              {/* Status */}

              <TableCell>

                <Chip
                  label={payroll.paymentStatus}
                  size="small"
                  color={
                    payroll.paymentStatus === "Paid"
                      ? "success"
                      : "warning"
                  }
                  sx={{
                    borderRadius: 5,
                    fontWeight: 600,
                  }}
                />

              </TableCell>

              {/* Download */}

              <TableCell align="center">

                <Tooltip title="Download Payslip">

                  <IconButton
                    onClick={() =>
                      handleDownload(payroll._id)
                    }
                    sx={{
                      bgcolor: "#EFF6FF",
                      color: "#2563EB",
                      "&:hover": {
                        bgcolor: "#DBEAFE",
                      },
                    }}
                  >
                    <Download fontSize="small" />
                  </IconButton>

                </Tooltip>

              </TableCell>

              {/* Actions */}

              <TableCell align="center">

                <Tooltip title="View Payroll">

                  <IconButton
                    onClick={() => onView(payroll)}
                    sx={{
                      bgcolor: "#F3F4F6",
                      color: "#374151",
                      mr: 1,
                      "&:hover": {
                        bgcolor: "#E5E7EB",
                      },
                    }}
                  >
                    <Visibility fontSize="small" />
                  </IconButton>

                </Tooltip>

                <Tooltip title="Edit Payroll">

                  <IconButton
                    onClick={() => onEdit(payroll)}
                    sx={{
                      bgcolor: "#EFF6FF",
                      color: "#2563EB",
                      mr: 1,
                      "&:hover": {
                        bgcolor: "#DBEAFE",
                      },
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>

                </Tooltip>

                <Tooltip title="Delete Payroll">

                  <IconButton
                    onClick={() =>
                      onDelete(payroll._id)
                    }
                    sx={{
                      bgcolor: "#FEF2F2",
                      color: "#EF4444",
                      "&:hover": {
                        bgcolor: "#FEE2E2",
                      },
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>

                </Tooltip>

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Paper>
  );
};

export default PayrollTable;