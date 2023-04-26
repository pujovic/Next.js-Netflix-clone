import useSWR from "swr";

//Data fetching function
async function fetcher(url: string) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

const useFavorites = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/favorites", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFavorites;
