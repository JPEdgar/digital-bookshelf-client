import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";

import SearchBar from "./SearchBar";
import AdvancedOptions from "./SearchBar/AdvancedOptions";

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleClick = () => {
    setShowOptions((curr) => !curr);
  };

  return (
    <>
      <SearchBar />
      <Button onClick={() => handleClick()} variant="success">
        {showOptions ? "Hide Advanced Options" : "Show Advanced Options"}
      </Button>
      {showOptions && <AdvancedOptions />}
    </>
  );
};

export default Navbar;
