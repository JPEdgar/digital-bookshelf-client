import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const MouseoverInfo = ({ children, text, direction = "top" }) => {
  return (
    <>
      <OverlayTrigger placement={direction} overlay={<Tooltip>{text}</Tooltip>}>
        {children}
      </OverlayTrigger>
    </>
  );
};

export default MouseoverInfo;
