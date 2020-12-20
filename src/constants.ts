import logo from "./assets/included-logo.png";

export const DEFAULT_COURSE_ID = "9vKyx1VhF5gX2vnWzXrM";

export const SERVER_URL =
  process.env.REACT_APP_SERVER_URL ||
  !process.env.NODE_ENV ||
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://ivc-prod.herokuapp.com";

export const LOGO_SRC = logo;
