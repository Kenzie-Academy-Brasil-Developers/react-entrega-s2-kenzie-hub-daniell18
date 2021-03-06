import { Box, Button, Grid, Paper, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Redirect, useHistory } from "react-router";
import axios from "axios";
import bg from "../../assets/image/bglarge.png";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useState } from "react";

function Register({ authorized }) {
  const [valueOption,setValueOption]=useState("Status")
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundImage: `url(${bg})`,
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
      fontSize: "38px",
      color: "white",
      margin: "0",
    },

    button: {
      background: "#9C8DE8",
      color: "white",
      height: "35px",
      width: "150px",
      fontSize: "20px",
    },
    paper: {
      width: "300px",
      backgroundColor: "rgb(163,160,176,0.5)",
      height: "100vh",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    input: {
      backgroundColor: "white",
      borderRadius: "10px",
width:"180px",
      marginTop: "2px",
    },
  
    paragrafo: {
      margin: "0",
      fontSize: "12px",
      color: "white",
    },
    redirect: {
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
    history.push("/");
  };
  const onhandleSubmit = ({
    name,
    email,
    password,
    bio,
    contact,
    course_module,
  }) => {
    const user = { name, email, password, bio, contact, course_module };
    axios
      .post("https://kenziehub.herokuapp.com/users", user)
      .then((_) => {
        toast.success("Conta criada com sucesso");
        history.push("/");
      })
      .catch((_) => toast.error("Erro ao crair conta tente novamente"));
    
  };
  const schema = yup.object().shape({
    email: yup.string().required("Campo Obrigatorio").email("Email invalido"),
    password: yup
      .string()
      .required("Senha Obrigatoria")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        "Coloque uma senha mais forte"
      ),
    confirmedPassword: yup
      .string()
      .required("Senha Obrigatoria")
      .oneOf([yup.ref("password"), null], "Senhas diferentes"),

    name: yup
      .string()
      .required("Campo Obrigatorio")
      .matches(
        /^[A-Za-z?????????????????????????????????????????????????????????????? ]+$/,
        "A Nome so deve conter Letras"
      ),
    bio: yup.string().required("Campo Obrigatorio"),
    contact: yup.string().required("Campo Obrigatorio"),
    course_module: yup.string().required("Campo Obrigatorio"),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
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
            initial={{ transform: "translateY(-1050px)", opacity: "0" }}
            animate={{ transform: "translateY(0px)", opacity: 1 }}
            exit={{ transform: "translateY(0)", opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Paper className={classe.paper}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                wrap="nowrap"
                alignItems="center"
                className={classe.container}
              >
                <Grid item>
                  <h2 className={classe.title}>Sign-Up</h2>
                </Grid>
                <Grid item>
                  <p className={classe.paragrafo}>{errors.name?.message}</p>
                  <TextField
                    className={classe.input}
                    variant="outlined"
                    label="Name"
                    error={false}
                    helperText=""
                    inputProps={{ style: { height: "11px" } }}
                    placeholde="Name"
                    {...register("name")}
                  />
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
                  <p className={classe.paragrafo}>
                    {errors.confirmedPassword?.message}
                  </p>
                  <TextField
                    className={classe.input}
                    type="password"
                    variant="outlined"
                    label="Confirmed Password"
                    placeholde="Confirmed Password"
                    {...register("confirmedPassword")}
                  />
                </Grid>
                <Grid item>
                  <p className={classe.paragrafo}>{errors.contact?.message}</p>
                  <TextField
                    className={classe.input}
                    variant="outlined"
                    label="contact"
                    placeholde="Contact"
                    {...register("contact")}
                  />
                </Grid>
                <Grid item>
                  <p className={classe.paragrafo}>{errors.bio?.message}</p>
                  <TextField
                    className={classe.input}
                    variant="outlined"
                    label="Bio"
                    placeholde="Bio"
                    {...register("bio")}
                  />
                </Grid>
                <Grid item>
                  <p className={classe.paragrafo}>
                    {errors.course_module?.message}
                  </p>
                  <TextField
                    className={classe.input}
                    variant="outlined"
                    defaultValue={valueOption}
                    label="Modulo autal"
                    placeholde="Modulo atual"
                    onChange={(e)=>setValueOption(e.target.value)}
                    {...register("course_module")}
                    select
                  
                  >
                <option  value="Primeiro m??dulo (Introdu????o ao Frontend)">Primeiro Modulo</option>
               <option  value="Segundo m??dulo (Frontend Avan??ado)">Segundo Modulo</option>
               <option  value="Terceiro m??dulo (Introdu????o ao Backend)">Terceiro Modulo</option>
               <option  value="Quarto m??dulo (Backend Avan??ado)">Quarto Modulo</option>
                  </TextField>
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
                    Ja tem uma conta ? Fa??a o
                    <button
                      className={classe.redirect}
                      onClick={() => {
                        handleclik();
                      }}
                    >
                      Login
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
export default Register;
