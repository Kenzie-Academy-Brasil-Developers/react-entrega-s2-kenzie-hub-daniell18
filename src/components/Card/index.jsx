import { Button, makeStyles, Paper } from "@material-ui/core";
import { MdBook } from "react-icons/md";
import { GiEmptyHourglass } from "react-icons/gi";
import { AiOutlineLink, AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
function Card({ title, status, deploy_url, techid, workid,att,setAtt }) {
  const [token] = useState(
    JSON.parse(localStorage.getItem("@Kenziehub:token")) || ""
  );
  const useStyles = makeStyles((theme) => ({
    Paper: {
      marginLeft: "20px",
      width: "190px",
      marginTop: "15px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      height: "13vh",
      backgroundColor: "#9C8DE8",
      color: "white",
    },
    titleIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px",
    },
    span: {
      fontSize: "9px",
      display: "flex",
      gap: "10px",
    },
    link: {
      color: "white",
    },
    delete: {},
  }));

  const classe = useStyles();
  const handleDelete = (_) => {
    if (techid) {
      axios
        .delete(`https://kenziehub.herokuapp.com/users/techs/${techid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(
          (_) => {toast.success("Tecnologia removida")
          
          let aux=att.filter((item)=>item.id!==techid)
          setAtt(aux)
        }
        );
    } else {
      axios
        .delete(`https://kenziehub.herokuapp.com/users/works/${workid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(
          (_) =>{ toast.success("Trabalho removido")
         
          let aux=att.filter((item)=>item.id!==workid)
          setAtt(aux)}
        );
    }
  };
  return (
    <>
      <Paper className={classe.Paper}>
        <Button className={classe.delete} onClick={() => handleDelete()}>
          {<AiFillDelete />}
        </Button>
        <div>
          <div className={classe.titleIcon}>
            <MdBook /> {title}
          </div>
          <div className={classe.titleIcon}>
            <GiEmptyHourglass />
            {status}
          </div>
          <div className={classe.titleIcon}>
            {deploy_url && (
              <div>
                <span className={classe.span}>
                  <AiOutlineLink />
                  <a className={classe.link} href={deploy_url}>
                    {deploy_url}
                  </a>
                </span>
              </div>
            )}
          </div>
        </div>
      </Paper>
    </>
  );
}
export default Card;
