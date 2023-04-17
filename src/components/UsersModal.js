import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

/**
 * 
 * @param {name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: { values: ["admin", "client"], message: "El role no es válido" },
    default: "client",
  },} param0 
 * @returns 
 */

const UserModal = ({ handleCreate, handleUpdate, user, open, handleClose }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [address, setAddress] = useState(null);
  const [phone, setPhone] = useState(null);
  const [role, setRole] = useState(null);

  const createUser = async () => {
    await handleCreate({
      name,
      email,
      password,
      role,
      address,
      phone,
    });
    setName(null);
    setEmail(null);
    setPassword(null);
    setRole(null);
    setAddress(null);
    setPhone(null);
  };

  const editUser = async () => {
    await handleUpdate(
      {
        name: name ?? user?.name,
        email: email ?? user?.email,
        password: password ?? user?.password,
        address: address ?? user?.address,
        phone: phone ?? user?.phone,
        role: role ?? user?.role,
      },
      user._id
    );
    setName(null);
    setEmail(null);
    setPassword(null);
    setRole(null);
    setAddress(null);
    setPhone(null);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {user ? "Editar Usuario" : "Crear Usuario"}
        </DialogTitle>
        <DialogContent dividers={true}>
          <Box
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
          >
            <TextField
              id="name"
              label="Nombre"
              color="primary"
              margin="normal"
              required
              fullWidth
              value={name ?? user?.name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="email"
              label="Email"
              color="primary"
              margin="normal"
              required
              fullWidth
              value={email ?? user?.email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              color="primary"
              margin="normal"
              required
              fullWidth
              value={password ?? user?.password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                id="role"
                color="primary"
                margin="normal"
                required
                fullWidth
                value={role ?? user?.role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value={"admin"}>Administrador</MenuItem>
                <MenuItem value={"client"}>Cliente</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id="address"
              label="Dirección"
              color="primary"
              margin="normal"
              required
              fullWidth
              value={address ?? user?.address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              id="phone"
              label="Teléfono"
              color="primary"
              margin="normal"
              required
              fullWidth
              value={phone ?? user?.phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={user ? editUser : createUser}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserModal;
