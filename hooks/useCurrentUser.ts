import useSWR from "swr";

//Data fetching function
async function fetcher(url: string) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);

  return { data, error, isLoading, mutate };
};

export default useCurrentUser;
