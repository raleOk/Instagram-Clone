import { useState, useEffect, useCallback } from "react";

const useFetchOnScroll = (fetchPostsOnScroll, page, setPage, nextPage) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;
    setPage(prevState => {
      return prevState + 1;
    });
  }, [isFetching, setPage]);

  useEffect(() => {
    if (nextPage === null) {
      setIsFetching(false);
      return;
    }
    fetchPostsOnScroll(page);
  }, [page, fetchPostsOnScroll]);

  return [isFetching, setIsFetching];
};

export default useFetchOnScroll;
