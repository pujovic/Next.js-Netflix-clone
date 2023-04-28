import React, { useCallback, useMemo } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { Movie } from "@/typings";
import toast from "react-hot-toast";

interface Props {
  movie: Movie | null;
}

function FavoriteButton({ movie }: Props) {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  //Checks if the selected movie is in favorite movies
  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteMovies || [];
    const id = movie?.id;
    const isInFavorites = (el: any) => JSON.parse(el).id === id;
    //If there is no id mathing the selected movie id the function return will be -1, and if there is a one it will return the index
    return list.findIndex(isInFavorites);
  }, [currentUser, movie]);

  // Adds/removes selected movie to/from favorite movies
  const toggleFavorites = useCallback(async () => {
    let data;

    const toastStyle = {
      background: "white",
      color: "black",
      fontWeight: "bold",
      fontSize: "16px",
      padding: "15px",
      borderRadius: "9999px",
      maxWidth: "1000px",
    };

    //Sends a request to delete the movie with the selected index
    if (isFavorite > -1) {
      const response = await fetch("/api/manageFavorites", {
        method: "DELETE",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json;",
        },
        body: JSON.stringify({
          data: isFavorite,
        }),
      });
      data = await response.json();

      //Displays pop-up notification
      toast(
        `${movie?.title || movie?.original_name} has been removed from My List`,
        {
          duration: 4000,
          style: toastStyle,
        }
      );

      //Sends a request to add the movie with movie data in the body
    } else {
      const response = await fetch("/api/manageFavorites", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json;",
        },
        body: JSON.stringify({ movie: movie }),
      });
      data = await response.json();

      //Displays pop-up notification
      toast(
        `${movie?.title || movie?.original_name} has been added to My List.`,
        {
          duration: 4000,
          style: toastStyle,
        }
      );
    }

    const updatedFavoriteMovies = data?.favoriteMovies;

    mutate({
      ...currentUser,
      favoriteMovies: updatedFavoriteMovies,
    });
    mutateFavorites();
  }, [movie, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite > -1 ? CheckIcon : PlusIcon;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer bg-white w-[32px] h-[32px] rounded-full flex justify-center items-center transition hover:bg-[#e6e6e6]"
    >
      <Icon className="text-neutral-900 m-auto h-6 w-6" />
    </div>
  );
}

export default FavoriteButton;
