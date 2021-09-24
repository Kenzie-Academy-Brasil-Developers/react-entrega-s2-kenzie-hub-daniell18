import { Grid } from "@material-ui/core";

import Header from "../../components/Header";
function Logon() {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Header />
        </Grid>
      </Grid>
    </>
  );
}
export default Logon;
