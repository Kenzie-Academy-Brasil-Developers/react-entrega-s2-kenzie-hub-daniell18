import { Grid } from "@material-ui/core";
import Tech from "../../components/Tech";
import Header from "../../components/Header";
import "./style.css";

import { Redirect } from "react-router";
import Works from "../../components/Works";
import { motion } from "framer-motion";
function Logon({ authorized, setAuthorized }) {
  if (!authorized) {
    return <Redirect to="/" />;
  }
  return (
    <motion.div
      className="teste"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <Grid
        className="root"
        container
        wrap="nowrap"
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Header setAuthorized={setAuthorized} />
        </Grid>
        <Grid>
          <Tech />
        </Grid>
        <Grid>
          <Works />
        </Grid>

        <footer className="footer"></footer>
      </Grid>
    </motion.div>
  );
}
export default Logon;
