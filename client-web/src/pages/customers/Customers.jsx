/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Paper,
  TextField,
  InputAdornment,
  Typography,
} from "@mui/material";

import {
  Search,
  Add,
} from "@mui/icons-material";

import CustomerTable from "../../components/customers/CustomerTable";
import CustomerModal from "../../components/customers/CustomerModal";

import { getCustomers } from "../../services/customerService";

const Customers = () => {

  const [customers, setCustomers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchCustomers = async (search = "") => {

    try {

      setLoading(true);

      const res = await getCustomers(1, search);

      setCustomers(res.data.customers || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchCustomers();

  }, []);

  useEffect(() => {

    const timer = setTimeout(() => {

      fetchCustomers(keyword);

    }, 400);

    return () => clearTimeout(timer);

  }, [keyword]);

  return (

    <Box sx={{ p: 3 }}>

      {/* Header */}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
        mb={4}
      >

        <Box>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            Customer Management
          </Typography>

          <Typography
            color="text.secondary"
            mt={0.5}
          >
            Manage your customers
          </Typography>

        </Box>

      </Box>

      {/* Search + Add Button */}

      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 4,
          borderRadius: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          boxShadow: "0 8px 24px rgba(37,99,235,.06)",
        }}
      >

        <TextField
          placeholder="Search customer..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          size="small"
          sx={{
            width: {
              xs: "100%",
              sm: 320,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setSelectedCustomer(null);
            setOpenModal(true);
          }}
          sx={{
            bgcolor: "#2563EB",
            borderRadius: 3,
            px: 3,
            py: 1.2,
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#1D4ED8",
            },
          }}
        >
          Add Customer
        </Button>

      </Paper>

      {/* Customer Cards */}

      <CustomerTable
        customers={customers}
        loading={loading}
        onEdit={(customer) => {
          setSelectedCustomer(customer);
          setOpenModal(true);
        }}
        refreshCustomers={() => fetchCustomers(keyword)}
      />

      {/* Modal */}

      <CustomerModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedCustomer(null);
        }}
        customer={selectedCustomer}
        onSuccess={() => fetchCustomers(keyword)}
      />

    </Box>

  );

};

export default Customers;