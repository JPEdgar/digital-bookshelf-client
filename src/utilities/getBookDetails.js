import axios from "axios";

const getBookDetails = async (API, isbn) => {
  console.log("using getBookDetails utility")
  const abortController = new AbortController();

  if (!API || !isbn) {
    // window.alert("Error in getting book details.");
    console.log("Error in getting book details.");
    return;
  }

  let bookDetails;
  try {
    const bookDetailsData = await axios.get(`${API}/volumes?q=isbn:${isbn}`, {
      signal: abortController.signal,
    });
    if (bookDetailsData) bookDetails = bookDetailsData.data.items[0];
  } catch (error) {
    console.log(error);
  }

  return bookDetails;
};

export default getBookDetails;
