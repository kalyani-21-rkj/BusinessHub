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

import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeModal from "../../components/employees/EmployeeModal";

import {
  getEmployees,
  deleteEmployee,
} from "../../services/employeeService";

const Employees = () => {

  const [employees, setEmployees] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchEmployees = async (search = "") => {

    try {

      setLoading(true);

      const res = await getEmployees(1, search);

      setEmployees(res.data.employees || []);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchEmployees();

  }, []);

  useEffect(() => {

    const timer = setTimeout(() => {

      fetchEmployees(keyword);

    }, 400);

    return () => clearTimeout(timer);

  }, [keyword]);

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {

      await deleteEmployee(id);

      fetchEmployees(keyword);

      alert("Employee Deleted Successfully");

    } catch (error) {

      console.error(error);

      alert("Unable to delete employee");

    }

  };

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
            Employee Management
          </Typography>

          <Typography
            color="text.secondary"
            mt={0.5}
          >
            Manage your employees
          </Typography>

        </Box>

      </Box>

      {/* Search + Button */}

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
          placeholder="Search employee..."
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
            setSelectedEmployee(null);
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
          Add Employee
        </Button>

      </Paper>

      {/* Cards */}

      <EmployeeTable
        employees={employees}
        loading={loading}
        onEdit={(employee) => {
          setSelectedEmployee(employee);
          setOpenModal(true);
        }}
        onDelete={handleDelete}
      />

      {/* Modal */}

      <EmployeeModal
        open={openModal}
        employee={selectedEmployee}
        onClose={() => {
          setOpenModal(false);
          setSelectedEmployee(null);
        }}
        onSuccess={() => fetchEmployees(keyword)}
      />

    </Box>

  );

};

export default Employees;