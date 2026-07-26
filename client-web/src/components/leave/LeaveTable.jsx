/* eslint-disable react-hooks/set-state-in-effect */

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
  Stack,
} from "@mui/material";

import {
  Edit,
  Delete,
  Visibility,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";

import {
  approveLeave,
  rejectLeave,
  deleteLeave,
} from "../../services/leaveService";

const LeaveTable = ({
  leaves = [],
  loading,
  refreshLeaves,
  onEdit,
}) => {
  const handleApprove = async (id) => {
    try {
      await approveLeave(id);
      refreshLeaves();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id);
      refreshLeaves();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this leave record?"
    );

    if (!confirmDelete) return;

    try {
      await deleteLeave(id);
      refreshLeaves();
    } catch (err) {
      console.log(err);
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

  if (leaves.length === 0) {
    return (
      <Typography align="center" sx={{ py: 8 }}>
        No Leave Records Found
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
              mt:2,
            }}
          >
            <TableCell sx={{ fontWeight: 700 }}>
              Employee
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Department
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Leave Type
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              From
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              To
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Days
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Status
            </TableCell>

            <TableCell
              align="center"
              sx={{ fontWeight: 700 }}
            >
              Approval
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

          {leaves.map((leave) => (

            <TableRow
              key={leave._id}
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
                    {leave.employee?.fullName?.charAt(0)}
                  </Avatar>

                  <Typography fontWeight={600}>
                    {leave.employee?.fullName}
                  </Typography>

                </Box>

              </TableCell>

              {/* Department */}

              <TableCell>
                {leave.employee?.department}
              </TableCell>

              {/* Leave Type */}

              <TableCell>
                {leave.leaveType}
              </TableCell>

              {/* From */}

              <TableCell>
                {new Date(
                  leave.fromDate
                ).toLocaleDateString()}
              </TableCell>

              {/* To */}

              <TableCell>
                {new Date(
                  leave.toDate
                ).toLocaleDateString()}
              </TableCell>

              {/* Days */}

              <TableCell>
                <Typography fontWeight={700}>
                  {leave.totalDays}
                </Typography>
              </TableCell>

              {/* Status */}

              <TableCell>

                <Chip
                  label={leave.status}
                  size="small"
                  color={
                    leave.status === "Approved"
                      ? "success"
                      : leave.status === "Rejected"
                      ? "error"
                      : "warning"
                  }
                  sx={{
                    borderRadius: 5,
                    fontWeight: 600,
                  }}
                />

              </TableCell>

              {/* Approval */}

              <TableCell align="center">

                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={1}
                >

                  <Tooltip title="Approve">

                    <IconButton
                      onClick={() =>
                        handleApprove(leave._id)
                      }
                      sx={{
                        bgcolor: "#ECFDF5",
                        color: "#16A34A",
                        "&:hover": {
                          bgcolor: "#DCFCE7",
                        },
                      }}
                    >
                      <CheckCircle fontSize="small" />
                    </IconButton>

                  </Tooltip>

                  <Tooltip title="Reject">

                    <IconButton
                      onClick={() =>
                        handleReject(leave._id)
                      }
                      sx={{
                        bgcolor: "#FEF2F2",
                        color: "#DC2626",
                        "&:hover": {
                          bgcolor: "#FEE2E2",
                        },
                      }}
                    >
                      <Cancel fontSize="small" />
                    </IconButton>

                  </Tooltip>

                </Stack>

              </TableCell>

              {/* Actions */}

              <TableCell align="center">

                <Tooltip title="View">

                  <IconButton
                    onClick={() => onEdit(leave)}
                    sx={{
                      bgcolor: "#F3F4F6",
                      mr: 1,
                      "&:hover": {
                        bgcolor: "#E5E7EB",
                      },
                    }}
                  >
                    <Visibility fontSize="small" />
                  </IconButton>

                </Tooltip>

                <Tooltip title="Edit">

                  <IconButton
                    onClick={() => onEdit(leave)}
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

                <Tooltip title="Delete">

                  <IconButton
                    onClick={() =>
                      handleDelete(leave._id)
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

export default LeaveTable;