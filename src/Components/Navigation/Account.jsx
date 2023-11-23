import React, { forwardRef } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useLogout, useUserDetails } from "../../hooks";

function MenuDropdown() {
  const { logout } = useLogout();
  const { userDetails } = useUserDetails();

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
        <div className="d-flex justify-content-center align-items-start bg-success text-light">
          {userDetails.handle}
        </div>
        <Dropdown.Item as={Link} to="/user-settings">
          User Settings
        </Dropdown.Item>

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
