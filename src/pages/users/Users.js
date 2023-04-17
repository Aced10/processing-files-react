import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Grid, TextField, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Components
import UsersModal from "components/UsersModal";
import NavBar from "components/NavBar";

// Services
import {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from "../../services/UsersServices";

const columns = [
  { id: "name", label: "Nombre", minWidth: 150 },
  { id: "email", label: "Email" },
  {
    id: "address",
    label: "Dirección",
    minWidth: 120,
    align: "right",
  },
  {
    id: "phone",
    label: "Teléfono",
    minWidth: 170,
    align: "right",
  },
  { id: "role", label: "Role", minWidth: 100 },
  {
    id: "actions",
    label: "",
    minWidth: 60,
    align: "right",
  },
];

const UsersPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [customers, setCustomers] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleModal = () => {
    if (openModal) setUser(null);
    setOpenModal(!openModal);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCreateUser = async (customer) => {
    await createCustomer(customer);
    await loadCustomers();
    handleModal();
  };

  const handleUpdateUser = async (customer, idCustomer) => {
    await updateCustomer(idCustomer, customer);
    await loadCustomers();
    handleModal();
  };

  const updateUserAction = async (user) => {
    setUser(user);
    handleModal();
  };

  const deleteUserAction = async (customerId) => {
    await deleteCustomer(customerId);
    await loadCustomers();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const loadCustomers = async () => {
    const response = await getCustomers(search);
    setCustomers(response.data.data);
  };

  useEffect(() => {
    if (!window.sessionStorage.getItem("user")) navigate("/login");
    loadCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <NavBar />
      <Typography color="primary" variant="h2">
        USUARIOS
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TextField
          id="name"
          label="Buscar"
          color="primary"
          margin="normal"
          fullWidth          
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {customers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  row.actions = (
                    <Grid item xs={8}>
                      <EditIcon onClick={() => updateUserAction(row)} />
                      <DeleteIcon onClick={() => deleteUserAction(row._id)} />
                    </Grid>
                  );
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={customers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <UsersModal
        open={openModal}
        handleClose={handleModal}
        user={user}
        handleCreate={handleCreateUser}
        handleUpdate={handleUpdateUser}
      />
      <Grid item xs={8}>
        <Button variant="contained" onClick={handleModal}>
          Crear Usuario
        </Button>
      </Grid>
    </>
  );
};

export default UsersPage;
