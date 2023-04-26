import { useAppDispatch } from "@/store/hooks";
import { setModalMovie, openModal } from "@/store/modalSlice";
import { Movie } from "@/typings";
import Image from "next/image";
import React from "react";

interface Props {
  movie: Movie;
}

function MovieCard({ movie }: Props) {
  const dispatch = useAppDispatch();

  return (
    <div
      className="relative h-28 min-w-[180px]  transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105 md:hover:brightness-110 cursor-pointer overflow-hidden"
      onClick={() => {
        dispatch(setModalMovie(movie));
        dispatch(openModal(false));
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie?.backdrop_path || movie?.poster_path
        }`}
        alt="movie card"
        fill
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        className="object-cover rounded-lg"
      />
    </div>
  );
}

export default MovieCard;
