import React, { useEffect, useState } from "react";

import axios from "axios";
import { Card, Button } from "react-bootstrap";

const FriendsListCard = ({ friendID }) => {
  const [requestData, setRequestData] = useState();

  useEffect(() => {
    const getRequestInfo = async () => {
      const { data } = await axios.get(
        `http://localhost:4000/api/user/${friendID}`,
        { friendID }
      );
      setRequestData(data);
    };
    getRequestInfo();
  }, []);
  console.log(friendID);

  const handleClick = async () => {
    console.log(requestData);
  };
  
  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{requestData?.handle}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary" onClick={() => handleClick()}>
            Accept Request
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default FriendsListCard;
