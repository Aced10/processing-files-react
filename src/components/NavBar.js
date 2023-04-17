import { useNavigate } from "react-router-dom";
import { Grid, Link } from "@mui/material";

const LogInPage = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2}>
      <Grid item xs={10} sm={4}>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate("/users");
          }}
        >
          Usuarios
        </Link>
      </Grid>
      <Grid item xs={10} sm={4}>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            navigate("/file-processing");
          }}
        >
          Procesamiento Archivos
        </Link>
      </Grid>
      <Grid item xs={10} sm={4}>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            window.sessionStorage.removeItem("user");
            window.sessionStorage.removeItem("userToken");
            navigate("/login");
          }}
        >
          Cerrar Sesion
        </Link>
      </Grid>
    </Grid>
  );
};

export default LogInPage;
