import express from "express";
import cors from "cors";
import { Optional } from "utility-types";
import { version } from "../package.json";
import { JSendBase, jsend } from "../src/lib/jsend";
import { PingSuccessVersionNumber } from "../src/App";

const app = express();

app.set("port", process.env.PORT || 4000);
app.use(express.json());
// @ts-ignore
app.use(cors());

// app.use(compression());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

/**
 * An error occurred in processing the request,
 * i.e. an exception was thrown
 */
export type ResGenericError = Optional<JSendBase<{}, "error">, "data">;

/**
 * There was a problem with the data submitted,
 * or some pre-condition of the API call wasn't
 * satisfied
 */
export type ResGenericFail = Optional<JSendBase<{}, "fail">, "data">;

app.get("/ping", async (req, res) => {
  jsend<PingSuccessVersionNumber>(res, {
    status: "success",
    data: {
      deployedVersion: version,
    },
  });
});

export default app;
