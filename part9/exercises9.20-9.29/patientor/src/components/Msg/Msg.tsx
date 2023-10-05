import React from "react";
import Alert from "@mui/material/Alert";
import { MsgType } from "../../types";
interface Iprop {
  msgType: MsgType;
  show: boolean;
  value : string
}
export default function Msg({ msgType, show ,value}: Iprop) {
  return show ? <Alert severity={msgType}>{value} — check it out!</Alert> : <></>;
}
