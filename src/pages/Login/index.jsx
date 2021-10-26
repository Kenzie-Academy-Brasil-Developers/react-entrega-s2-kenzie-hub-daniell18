import { Box, Button, Grid, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Redirect, useHistory } from "react-router";
import bglarge from "../../assets/image/bglarge.png";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
function Login({ authorized, setAuthorized }) {
  const schema = yup.object().shape({
    email: yup.string().required("Campo Obrigatorio"),
    password: yup.string().required("Campo Obrigatorio"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "100vh",
      backgroundImage: `url(${bglarge})`,
      display: "flex",
      flexDirection: "column",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      fontFamily: "roboto",
      background: "rgb(0,0,0,0.8)",
      justifyContent: "center",
      alignItems: "center",
    },

    title: {
      fontSize: "48px",
      color: "white",
      margin: "0",
      marginTop: "15px",
    },

    button: {
      background: "#9C8DE8",
      color: "white",

      width: "150px",
      fontSize: "20px",
    },
    paper: {
      width: "300px",
      backgroundColor: "rgb(163,160,176,0.5)",
      height: "61vh",
    },
    input: {
      backgroundColor: "white",
      borderRadius: "10px",
      marginTop: "2px",
    },
    container: {
      gap: "20px",
    },
    paragrafo: {
      margin: "0",
      color: "white",
    },
    teste: {
      background: "transparent",
      border: "none",
      fontSize: "16px",
      fontFamily: "roboto",
      color: "#00EEC3",
      fontWeight: "bold",
      "&:hover": {
        color: "blue",
      },
    },
  }));
  const history = useHistory();
  const classe = useStyles();
  const handleclik = () => {
    history.push("/register");
  };
  const onhandleSubmit = (e) => {
   
    axios
      .post("https://kenziehub.herokuapp.com/sessions", e)
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem("@Kenziehub:token", JSON.stringify(token));
        localStorage.setItem("@Kenziehub:user", JSON.stringify(user));
        localStorage.setItem("@Kenziehub:authorized",JSON.stringify(true))
        localStorage.setItem("@Kenziehub:techs",JSON.stringify( response.data.user.techs))
        localStorage.setItem("@Kenziehub:works",JSON.stringify( response.data.user.works))
        toast.success("Login realizado com sucesso");
        setAuthorized(true);
        
      })
      .catch((_) => {
        toast.error("Erro ao ralizar login");
      })
    
  };

  if (authorized) {
    return <Redirect to="/logon" />;
  }
  return (
    <>
      <div>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onhandleSubmit)}
          autoComplete="off"
          className={classe.root}
        >
          <motion.div
            initial={{ transform: "translateX(-1050px)", opacity: "0" }}
            animate={{ transform: "translateX(0px)", opacity: 1 }}
            exit={{ transform: "translateX(0)", opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Paper className={classe.paper}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                className={classe.container}
              >
                <Grid item>
                  <h2 className={classe.title}>Sign-in</h2>
                </Grid>
                <Grid item>
                  <p className={classe.paragrafo}>{errors.email?.message}</p>
                  <TextField
                    className={classe.input}
                    variant="outlined"
                    label="Email"
                    placeholde="Email"
                    {...register("email")}
                  />
                </Grid>
                <Grid item>
                  <p className={classe.paragrafo}>{errors.password?.message}</p>
                  <TextField
                    className={classe.input}
                    variant="outlined"
                    label="Password"
                    type="password"
                    placeholde="password"
                    {...register("password")}
                  />
                </Grid>
                <Grid item>
                  <Button
                    className={classe.button}
                    type="submit"
                    variant="contained"
                  >
                    Entrar
                  </Button>
                </Grid>
                <Grid item>
                  <p className={classe.paragrafo}>
                    E novo por aqui ?{" "}
                    <button
                      className={classe.teste}
                      onClick={() => {
                        handleclik();
                      }}
                    >
                      Cadastre-se
                    </button>
                  </p>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Box>
      </div>
    </>
  );
}
export default Login;
