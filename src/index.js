import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import GlobalWrapper from "./context/GlobalWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GlobalWrapper>
    <App />
  </GlobalWrapper>
);
