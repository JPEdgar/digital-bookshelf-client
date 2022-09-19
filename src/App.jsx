import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const App = () => {
  const api =
    "https://www.googleapis.com/books/v1/volumes?q=harry+potter+inauthor:rowling";
    // "https://www.googleapis.com/books/v1/volumes?q=harry+potter";

  const [tempRes, setTestRes] = useState();

  useEffect(() => {
    const Test = async () => {
      const temp = await axios.get(api).then((res) => res.data);
      console.log(temp);
    //   console.log(JSON.parse(temp));
    };

    Test();
  }, []);

  return <div>App</div>;
};

export default App;
