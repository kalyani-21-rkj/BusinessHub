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
} from "@mui/icons-material";

import { deleteAttendance } from "../../services/attendanceService";

const AttendanceTable = ({
  attendance = [],
  loading,
  refreshAttendance,
  onEdit,
}) => {

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this attendance record?"
    );

    if (!confirmDelete) return;

    try {

      await deleteAttendance(id);

      alert("Attendance Deleted Successfully");

      refreshAttendance();

    } catch (err) {

      console.log(err);

      alert("Unable to Delete Attendance");

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

  if (attendance.length === 0) {
    return (
      <Typography
        align="center"
        sx={{ py: 8 }}
      >
        No Attendance Found
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
              Designation
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Date
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Check In
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Check Out
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Status
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Remarks
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

          {attendance.map((record) => (

            <TableRow
              key={record._id}
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
                    {record.employee?.fullName?.charAt(0)}
                  </Avatar>

                  <Typography fontWeight={600}>
                    {record.employee?.fullName}
                  </Typography>

                </Box>

              </TableCell>

              {/* Department */}

              <TableCell>
                {record.employee?.department}
              </TableCell>

              {/* Designation */}

              <TableCell>
                {record.employee?.designation}
              </TableCell>

              {/* Date */}

              <TableCell>
                {new Date(record.date).toLocaleDateString()}
              </TableCell>

              {/* Check In */}

              <TableCell>
                {record.checkIn || "--"}
              </TableCell>

              {/* Check Out */}

              <TableCell>
                {record.checkOut || "--"}
              </TableCell>

              {/* Status */}

              <TableCell>

                <Chip
                  label={record.status}
                  size="small"
                  color={
                    record.status === "Present"
                      ? "success"
                      : record.status === "Absent"
                      ? "error"
                      : record.status === "Half Day"
                      ? "warning"
                      : "info"
                  }
                  sx={{
                    borderRadius: 5,
                    fontWeight: 600,
                  }}
                />

              </TableCell>

              {/* Remarks */}

              <TableCell>
                {record.remarks || "--"}
              </TableCell>

              {/* Actions */}

              <TableCell align="center">

                <Tooltip title="Edit Attendance">

                  <IconButton
                    onClick={() => onEdit(record)}
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

                <Tooltip title="Delete Attendance">

                  <IconButton
                    onClick={() =>
                      handleDelete(record._id)
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

export default AttendanceTable;