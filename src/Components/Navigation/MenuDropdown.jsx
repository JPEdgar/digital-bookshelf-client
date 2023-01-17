import React, { forwardRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import { useLogout } from "../../hooks";

function MenuDropdown() {
  const { logout } = useLogout();
  return (
    <Dropdown align="end" className="ms-1">
      <Dropdown.Toggle as={CustomToggle}>
        <img
          alt=""
          src="https://picsum.photos/200"
          style={{ height: "30px", borderRadius: "50%" }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>User Settings</Dropdown.Item>
        <Dropdown.Item onClick={() => logout()}>Log Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

export default MenuDropdown;
