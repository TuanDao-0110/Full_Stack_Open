import React from "react";
import { MsgType, NofiticationType } from "../types/systemTypes";

export default function Message({ message, type }: NofiticationType) {
  return (
    <div
      style={{
        color: type === MsgType.fail ? "red" : "green",
      }}
    >
      {message}
    </div>
  );
}
