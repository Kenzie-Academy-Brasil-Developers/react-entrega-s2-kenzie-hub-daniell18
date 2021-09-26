import { Box, Button, Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import Card from "../Card";

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
    axios.post(
      "https://kenziehub.herokuapp.com/users/techs",
      { title: e.title, status: e.status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100vw",

      fontFamily: "Roboto",
      display: "flex",
      marginTop: "40px",
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
      margin: "0",
    },
    box: {
      backgroundColor: "#F0F0F0",
      width: "300px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "7px",
      flexDirection: "column",
      borderRadius: "10px",
      height: "50vh",
    },
    button: {
      width: "100px",
      backgroundColor: "#9C8DE8",
      color: "#F0F0F0",
    },
    paragrafo: {
      marginTop: "1px",
      fontSize: "10px",
    },
    card: {
      display: "flex ",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    ButtonAdd: {
      color: "white",
      marginRight: "20px",
      textTransform: "none",
      fontSize: "14px",
      "&:hover": {
        color: "#9C8DE8",
        textDecoration: "underline",
      },
    },
    headerTech: {
      display: "flex",
      width: "100vw",
      marginTop: "15px",
      justifyContent: "space-between",
    },
  }));

  const classe = useStyles();

  console.log(tech);
  return (
    <>
      <div className={classe.root}>
        <div className={classe.headerTech}>
          <h3 className={classe.title}>Minhas Tecnologias</h3>
          <Button
            variant="text"
            endIcon={<BiCommentAdd />}
            className={classe.ButtonAdd}
            onClick={() => handleOpen()}
          >
            Adicione tecnologias
          </Button>
        </div>
        <div className={classe.card}>
          {tech.techs
            ? tech.techs.map((element, index) => (
                <div key={index}>
                  <Card
                    title={element.title}
                    status={element.status}
                    techid={element.id}
                  />
                </div>
              ))
            : ""}
        </div>

        <Modal className={classe.modal} open={open} onClose={handleClose}>
          <Box
            className={classe.box}
            component="form"
            onSubmit={handleSubmit(handleClose)}
          >
            <h2 className={classe.titleModal}>Adicione uma Tecnologia</h2>
            <p className={classe.paragrafo}>{errors.title?.message}</p>
            <TextField label="Tecnologia" {...register("title")} />
            <p className={classe.paragrafo}>{errors.status?.message}</p>
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
