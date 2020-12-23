import includedVcLogo from "./assets/included-vc-logo.png";
import includedMLogo from "./assets/included-m-logo.png";

export const DEFAULT_COURSE_ID = "main-course";

export const SERVER_URL =
  process.env.REACT_APP_SERVER_URL ||
  !process.env.NODE_ENV ||
  process.env.NODE_ENV === "development"
    ? "https://api.github.com/repos/richardcrng/included-m/contents/content"
    : "https://api.github.com/repos/richardcrng/included-m/contents/content";

export const INCLUDED_VC_LOGO = includedVcLogo;
export const INCLUDED_M_LOGO = includedMLogo;
