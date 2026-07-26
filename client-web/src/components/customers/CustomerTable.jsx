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
  Divider,
} from "@mui/material";

import {
  Edit,
  Delete,
  Email,
  Phone,
  //LocationOn,
  //Person,
} from "@mui/icons-material";

import { deleteCustomer } from "../../services/customerService";

const CustomerTable = ({
  customers,
  loading,
  onEdit,
  refreshCustomers,
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

  const handleDelete = async () => {
    try {
      await deleteCustomer(selectedId);

      refreshCustomers();

      setSnackbar({
        open: true,
        severity: "success",
        message: "Customer deleted successfully",
      });
    } catch (err) {
      console.log(err);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Unable to delete customer",
      });
    }

    setOpenDelete(false);
  };

  if (loading) {
    return (
      <Typography
        align="center"
        sx={{ py: 8 }}
      >
        Loading Customers...
      </Typography>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
                {customers.map((customer) => (
          <Grid
            item
            xs={12}
            sm={6}
              md={4}
              lg={4}
              xl={3}
            key={customer._id}
          >
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                background: "#fff",
                height: 300,  
                width: 300,
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
                  alignItems="center"
                  gap={2}
                >
                  <Avatar
                    sx={{
                      width: 44,
                      height: 44,
                      fontSize: 26,
                      fontWeight: 700,
                      background:
                        "linear-gradient(135deg,#2563EB,#1D4ED8)",
                    }}
                  >
                    {customer.fullName?.charAt(0)}
                  </Avatar>

                  <Box flex={1}>
                    <Typography
                      fontWeight={700}
                      fontSize={20}
                    >
                      {customer.fullName}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      
                      
                    </Typography>
                  </Box>
                </Box>

                <Box mt={3}>

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
    {customer.phone}
  </Typography>
</Box>
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
    {customer.email}
  </Typography>
</Box>

                  

                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Chip
                      label={customer.status}
                      size="small"
                      color={
                        customer.status === "Customer"
                          ? "success"
                          : customer.status === "Lead"
                          ? "warning"
                          : "error"
                      }
                    />

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2.5 }} />

                                <Grid container spacing={1.5}>

                  <Grid item xs={3}>
                    <Tooltip title="Call Customer">
                      <IconButton
                        fullWidth
                        sx={{
                          width: 34,
                            height: 34,
                            bgcolor: "#EFF6FF",
                            color: "#2563EB",
                            "&:hover": {
                            bgcolor: "#DBEAFE",
                          },
                        }}
                      >
                        <Phone />
                      </IconButton>
                    </Tooltip>
                  </Grid>

                  <Grid item xs={3}>
                    <Tooltip title="Send Email">
                      <IconButton
                        fullWidth
                        sx={{
                          width: 34,
                            height: 34,
                            bgcolor: "#EFF6FF",
                            color: "#2563EB",
                            "&:hover": {
                            bgcolor: "#DBEAFE",
                          },
                        }}
                      >
                        <Email />
                      </IconButton>
                    </Tooltip>
                  </Grid>

                  <Grid item xs={3}>
                    <Tooltip title="Edit Customer">
                      <IconButton
                          onClick={() => onEdit(customer)}
                          sx={{
                            width: 34,
                            height: 34,
                            bgcolor: "#EFF6FF",
                            color: "#2563EB",
                            "&:hover": {
                            bgcolor: "#DBEAFE",
                        },
                    }}
                >
                <Edit sx={{ fontSize: 18 }} />
                </IconButton>
                    </Tooltip>
                  </Grid>

                  <Grid item xs={3}>
                    <Tooltip title="Delete Customer">
                      <IconButton
  onClick={() => handleDeleteClick(customer._id)}
  sx={{
    width: 34,
    height: 34,
    bgcolor: "#FEF2F2",
    color: "#EF4444",
    "&:hover": {
      bgcolor: "#FEE2E2",
    },
  }}
>
  <Delete sx={{ fontSize: 18 }} />
</IconButton>
                    </Tooltip>
                  </Grid>

                </Grid>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
            {/* Delete Dialog */}

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1,
            minWidth: 360,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 700,
            fontSize: 22,
          }}
        >
          Delete Customer
        </DialogTitle>

        <DialogContent>
          <Typography color="text.secondary">
            Are you sure you want to delete this customer?
            <br />
            This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button
            variant="outlined"
            onClick={() => setOpenDelete(false)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}

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
          variant="filled"
          severity={snackbar.severity}
          onClose={() =>
            setSnackbar({
              ...snackbar,
              open: false,
            })
          }
          sx={{
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomerTable;

    