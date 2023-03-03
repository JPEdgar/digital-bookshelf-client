import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

import MouseoverInfo from "./MouseoverInfo";

const LockUnlockIcon = ({ state, setState, text }) => {
  return (
    <MouseoverInfo text={text}>
      <FontAwesomeIcon
        style={{
          cursor: "pointer",
        }}
        icon={state ? faLock : faLockOpen}
        onClick={() => setState((curr) => !curr)}
      />
    </MouseoverInfo>
  );
};

export default LockUnlockIcon;
