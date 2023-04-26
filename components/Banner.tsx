import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Movie } from "@/typings";
import { InformationCircleIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useAppDispatch } from "@/store/hooks";
import { openModal, setModalMovie } from "@/store/modalSlice";

interface Props {
  trendingNow: Movie[];
}

function Banner({ trendingNow }: Props) {
  const [bannerMovie, setBannerMovie] = useState<Movie | null>(null);
  const dispatch = useAppDispatch();

  //Chooses a random movie for the banner
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * trendingNow.length);
    const randomMovie = trendingNow[randomIndex];
    setBannerMovie(randomMovie);
  }, [trendingNow]);

  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-screen -z-10 overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/original${
            bannerMovie?.backdrop_path || bannerMovie?.poster_path
          }`}
          alt="banner image"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col pt-24 lg:pt-44 space-y-4 lg:space-y-10">
        <h1 className="font-bold text-xl md:text-2xl lg:text-4xl">
          {bannerMovie?.title ||
            bannerMovie?.name ||
            bannerMovie?.original_name}
        </h1>

        <p
          className="max-w-xs text-xs md:max-w-xl md:text-base lg:max-w-2xl lg:text-lg"
          style={{ textShadow: "0.5px 0.5px #dfdfdf" }}
        >
          {bannerMovie?.overview}
        </p>

        <div className="flex space-x-2">
          <button
            className="bg-white text-black flex items-center rounded gap-x-2 px-5 py-1.5 font-semibold trasition hover:opacity-70 md:py-2.5 md:px-8 md:text-xl"
            onClick={() => {
              dispatch(setModalMovie(bannerMovie));
              dispatch(openModal(true));
            }}
          >
            <PlayIcon className="w-4 text-black md:w-7" />
            Play
          </button>
          <button
            className="bg-gray-400/70 flex items-center rounded gap-x-2 px-5 py-1.5 font-semibold trasition hover:opacity-70 md:py-2.5 md:px-8 md:text-xl"
            onClick={() => {
              dispatch(setModalMovie(bannerMovie));
              dispatch(openModal(false));
            }}
          >
            <InformationCircleIcon className="w-4 md:w-7" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
