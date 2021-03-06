import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Redirect } from "react-router";
import logoKenzie from "../../assets/image/logoF.png";
function Header({ setAuthorized }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      height: "88px",
      width: "100vw",
      backgroundColor: "#433D63",
    },
    logoKenzie: {
      backgroundImage: `url(${logoKenzie})`,
      width: "300px",
      height: "88px",
    },
    subTitle: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "rgb(67,61,99,0.6)",
      width: "100vw",
      height: "55px",
    },
    paragrafo: {
      color: "white",
      marginLeft: "20px",
    },
    button: {
      color: "white",
      marginRight: "20px",
    },
  }));

  const classe = useStyles();
  const handclick = () => {
    localStorage.removeItem("@Kenziehub:authorized")
    setAuthorized(false);
    return <Redirect to="/" />;
    
  };
  return (
    <>
      <div className={classe.root}>
        <div className={classe.logoKenzie}></div>
        <div className={classe.subTitle}>
          <p className={classe.paragrafo}>Meu perfil</p>
          <Button className={classe.button} onClick={() => handclick()}>
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
export default Header;
