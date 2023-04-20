import { useContext } from "react";

import { SearchContext } from "../../context/search/SearchContext";

const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) throw Error("Context error - useSearchContext out-of-scope.");

  return context;
};

export default useSearchContext;
