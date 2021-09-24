import { Grid } from "@material-ui/core";
import Tech from "../../components/Tech";
import Header from "../../components/Header";

import { makeStyles } from "@material-ui/styles";
import { Redirect } from "react-router";
function Logon({ authorized, setAuthorized }) {
  const useStyles = makeStyles((theme) => ({
    root: { height: "100vh", backgroundColor: "#403F45" },
    header: {
      height: "20vh",
    },
  }));
  const classe = useStyles();
  if (!authorized) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <Grid
        className={classe.root}
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item className={classe.header}>
          <Header setAuthorized={setAuthorized} />
        </Grid>
        <Grid>
          <Tech />
        </Grid>
      </Grid>
    </>
  );
}
export default Logon;
