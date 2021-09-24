import { Box, Button, Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
function Tech() {
  const schema = yup.object().shape({
    title: yup.string().required("Campo Obrigatorio"),
    status: yup.string().required("Campo Obrigatorio"),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [tech] = useState(
    JSON.parse(localStorage.getItem("@Kenziehub:user")) || ""
  );
  const [token] = useState(
    JSON.parse(localStorage.getItem("@Kenziehub:token")) || ""
  );

  const [open, setOpen] = useState(false);
  const handleClose = (e) => {
    axios
      .post(
        "https://kenziehub.herokuapp.com/users/techs",
        { title: e.title, status: e.status },
        {
          headers: {
            Authorization: `Bearer${token}`,
          },
        }
      )
      .catch((err) => console.log(err));
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100vw",
      height: "200px",
      fontFamily: "Roboto",
      display: "flex",
      marginTop: "20px",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    title: {
      color: "white",
      marginLeft: "20px",
    },
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    titleModal: {
      color: "#433D63",
    },
    box: {
      backgroundColor: "#F0F0F0",
      width: "300px",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "15px",
      flexDirection: "column",
      borderRadius: "10px",
      height: "40vh",
    },
    button: {
      width: "100px",
      backgroundColor: "#9C8DE8",
      color: "#F0F0F0",
    },
  }));
  const classe = useStyles();

  return (
    <>
      <div className={classe.root}>
        <h3 className={classe.title}>Minhas Tecnologias</h3>
        <div>
          {tech.tech
            ? tech.tech.map((element) => <div>{element.title}</div>)
            : "nao tem"}
        </div>
        <button onClick={() => handleOpen()}>open</button>
        <Modal className={classe.modal} open={open} onClose={handleClose}>
          <Box
            className={classe.box}
            component="form"
            onSubmit={handleSubmit(handleClose)}
          >
            <h2 className={classe.titleModal}>Adicione uma Tecnologia</h2>
            <TextField label="Tecnologia" {...register("title")} />
            <TextField label="Status" {...register("status")} />
            <Button className={classe.button} variant="contained" type="submit">
              Adicionar
            </Button>
          </Box>
        </Modal>
      </div>
    </>
  );
}
export default Tech;
