import { useState, useEffect, useCallback } from "react";

const useFetchOnScroll = (fetchItems, page, setPage, noMorePages) => {
  const [isFetching, setIsFetching] = useState(false);

  //scroll callback
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }, [isFetching]);

  //useEffect listening for when the page gets scrolled down
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  //useEffect handling the parametres of the fetchItems function
  useEffect(() => {
    if (!isFetching) return;
    if (noMorePages) return;
    setPage(prevState => {
      return prevState + 1;
    });
  }, [isFetching, setPage, noMorePages]);

  //useEffect calling the fetchItems function when a page changes
  useEffect(() => {
    fetchItems(page);
  }, [page, fetchItems]);

  return [isFetching, setIsFetching];
};

export default useFetchOnScroll;
