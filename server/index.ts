import { initialize } from "fireactive";
import app from "./app";

initialize({
  databaseURL: 'https://included-m-default-rtdb.europe-west1.firebasedatabase.app/'
})

const server = app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});