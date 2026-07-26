import { useState } from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  Edit,
  Delete,
  Email,
  Phone,
  Badge,
  BusinessCenter,
  CurrencyRupee,
} from "@mui/icons-material";
const EmployeeTable = ({
  employees,
  loading,
  onEdit,
  onDelete,
}) => {

  const [openDelete, setOpenDelete] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const confirmDelete = () => {

    onDelete(selectedId);

    setOpenDelete(false);

    setSnackbar({
      open: true,
      severity: "success",
      message: "Employee deleted successfully",
    });

  };

  if (loading) {
    return (
      <Typography
        align="center"
        sx={{ py: 10 }}
      >
        Loading Employees...
      </Typography>
    );
  }

  if (employees.length === 0) {
    return (
      <Typography
        align="center"
        sx={{ py: 10 }}
      >
        No Employees Found
      </Typography>
    );
  }

  return (

    <>
      <Grid
        container
        spacing={3}
      >
        {employees.map((employee) => (

  <Grid
    item
            xs={12}
            sm={6}
              md={4}
              lg={4}
              xl={3}
    key={employee._id}
  >

    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
                overflow: "hidden",
                background: "#fff",
                height: 400,  
                width: 310,
                boxShadow: "0 6px 20px rgba(15,23,42,.06)",
                transition: ".3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 16px 35px rgba(37,99,235,.12)",
        },
      }}
    >

      <CardContent sx={{ p: 3 }}>

        {/* Header */}

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >

          <Box
            width="100%"
          >

            <Box
  display="flex"
  alignItems="center"
  gap={2}
  mb={2}
>
  <Avatar
    sx={{
      width: 54,
      height: 54,
      fontSize: 24,
      fontWeight: 700,
      background: "linear-gradient(135deg,#2563EB,#3B82F6)",
    }}
  >
    {employee.fullName?.charAt(0)}
  </Avatar>

  <Typography
    fontWeight={700}
    fontSize={20}
  >
    {employee.fullName}
  </Typography>
</Box>


          </Box>



        </Box>

        {/* Email */}

        <Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 1,
    mt: 2,
  }}
>
  <Email
    sx={{
      color: "#2563EB",
      fontSize: 18,
      flexShrink: 0,
    }}
  />

  <Typography
    variant="body2"
    sx={{
      color: "#64748B",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }}
  >
    {employee.email}
  </Typography>
</Box>
        {/* Phone */}

        <Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 1,
    mt: 1.5,
  }}
>
  <Phone
    sx={{
      color: "#2563EB",
      fontSize: 18,
      flexShrink: 0,
    }}
  />

  <Typography
    variant="body2"
    sx={{
      color: "#64748B",
    }}
  >
    {employee.phone}
  </Typography>
</Box>
                {/* Department */}

        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: 1.5,
      }}
    >
          <BusinessCenter
            sx={{
              color: "#2563EB",
              fontSize: 18,
            }}
          />

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {employee.department}
          </Typography>

        </Box>

        {/* Designation */}

        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: 1.5,
      }}
    >
          <Badge
            sx={{
              
            color: "#2563EB",
            fontSize: 18,
            flexShrink: 0,
  
            }}
          />

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {employee.designation}
          </Typography>

        </Box>

        {/* Salary */}

        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: 1.5,
      }}
    >
          <CurrencyRupee
            sx={{
              color: "#2563EB",
              fontSize: 18,
            }}
          />

          <Typography
            fontWeight={700}
            color="#2563EB"
          >
            ₹{Number(employee.salary).toLocaleString()}
          </Typography>

        </Box>
        <Box mt={2}>
  <Chip
    label={employee.status}
    size="small"
    color={
      employee.status === "Active"
        ? "primary"
        : employee.status === "Inactive"
        ? "error"
        : "warning"
    }
    sx={{
      borderRadius: "20px",
      fontWeight: 600,
    }}
  />
</Box>
        <Box
          sx={{
           borderTop: "1px solid #E2E8F0",
            mt: 3,
            pt: 2,
            display: "flex",
          justifyContent: "flex-end",
          gap: 2,
      }}
      >
  <Tooltip title="Edit">
    <IconButton
      size="small"
      onClick={() => onEdit(employee)}
      sx={{
        bgcolor: "#EFF6FF",
        "&:hover": {
          bgcolor: "#DBEAFE",
        },
      }}
    >
      <Edit color="primary" fontSize="small" />
    </IconButton>
  </Tooltip>

  <Tooltip title="Delete">
    <IconButton
      size="small"
      onClick={() => handleDeleteClick(employee._id)}
      sx={{
        bgcolor: "#FEF2F2",
        "&:hover": {
          bgcolor: "#FEE2E2",
        },
      }}
    >
      <Delete color="error" fontSize="small" />
    </IconButton>
  </Tooltip>
</Box>

      </CardContent>

    </Card>

  </Grid>

))}

      </Grid>
      

      {/* Delete Dialog */}

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
      >
        <DialogTitle>
          Delete Employee
        </DialogTitle>

        <DialogContent>
          <Typography color="text.secondary">
            Are you sure you want to delete this employee?
          </Typography>
        </DialogContent>

        <DialogActions>

          <Button
            onClick={() => setOpenDelete(false)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={confirmDelete}
          >
            Delete
          </Button>

        </DialogActions>

      </Dialog>

      {/* Snackbar */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar({
            ...snackbar,
            open: false,
          })
        }
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    </>
  );

};

export default EmployeeTable;
    