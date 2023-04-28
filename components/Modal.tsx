import React, { useCallback, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAppSelector } from "@/store/hooks";
import { Element, Genre } from "@/typings";
import ReactPlayer from "react-player/lazy";
import {
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";
import FavoriteButton from "./FavoriteButton";
import { Toaster } from "react-hot-toast";

interface Props {
  visible: boolean;
  onClose: any;
}

function Modal({ visible, onClose }: Props) {
  const [isVisible, setIsVisible] = useState(visible);
  const { movie, play } = useAppSelector((state) => state.modal);
  const [trailer, setTrailer] = useState("sY2djp46FeY");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  //Gets movie details
  const movieFetch = useCallback(async () => {
    try {
      const response = await fetch("/api/movie", {
        method: "POST",
        body: JSON.stringify(movie),
      });
      const data = await response.json();

      //Sets video source if some videos are provided by TMDB
      if (data?.videos.results.length !== 0) {
        //Sets video source to trailer if available
        let index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        //Sets video to first video from the data set if "Trailer" video cannot be found
        if (index === -1) {
          index = 0;
        }
        setTrailer(data.videos?.results[index]?.key);
        //Sets video source to fallback video if no videos are provided by TMDB
      } else {
        setTrailer("sY2djp46FeY");
      }
      //Sets genres
      if (data?.genres) {
        setGenres(data.genres);
      }
    } catch (error) {
      console.log(error);
    }
  }, [movie]);

  useEffect(() => {
    if (!movie) return;
    movieFetch();
  }, [movie, movieFetch]);

  //Displays modal by setting it's visibility class
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  //Displays full window player if the play button was used to open the modal
  useEffect(() => {
    if (play) {
      setPlaying(play);
    }
  }, [play]);

  //Closes the modal
  const handleClose = useCallback(() => {
    setIsVisible(false);
    setPlaying(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  //Returns if visibility is false
  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Full window video player */}
      {playing && (
        <div className="z-50 fixed inset-0">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            config={{
              file: { attributes: { disablePictureInPicture: true } },
              youtube: {
                playerVars: {
                  disablekb: 1,
                  iv_load_policy: 3,
                  cc_load_policy: 0,
                  modestbranding: 1,
                },
              },
            }}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            controls={true}
            playing={true}
          />
          {/* Close button */}
          <div
            onClick={handleClose}
            className="absolute top-2 right-4 z-50 cursor-pointer h-14 w-14 rounded-full bg-neutral-900 flex items-center justify-center hover:bg-neutral-800"
          >
            <XMarkIcon className="text-white w-8" />
          </div>
        </div>
      )}

      {!playing && (
        <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
          <div className="relative w-full md:w-[60vw] mx-auto max-w-3xl max-h-[95vh] top-2 rounded-md overflow-hidden">
            <div
              className={`${
                isVisible ? "scale-100" : "scale-0"
              } transform duration-300 relative flex-auto bg-neutral-900 drop-shadow-md`}
            >
              <Toaster position="bottom-center" />
              {/* Close button */}
              <div
                onClick={handleClose}
                className="absolute top-0.5 right-0.5  z-50 cursor-pointer  h-10 w-10 rounded-full bg-neutral-900 bg-opacity-70 flex items-center justify-center"
              >
                <XMarkIcon className="text-white w-6 " />
              </div>

              {/* Video player section */}
              <div className="relative pt-[56.25%]">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailer}`}
                  config={{
                    youtube: {
                      playerVars: {
                        disablekb: 1,
                        iv_load_policy: 3,
                      },
                    },
                  }}
                  width="100%"
                  height="100%"
                  style={{ position: "absolute", top: "0", left: "0" }}
                  controls={false}
                  playing={!playing}
                  muted={muted}
                />

                {/* Player controls */}
                <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                  <div className="flex space-x-2">
                    <button
                      className="flex items-center gap-x-2 rounded bg-white w-32 px-4 text-xl font-bold text-neutral-900 transition hover:bg-[#e6e6e6]"
                      onClick={() => setPlaying(true)}
                    >
                      <PlayIcon className="w-7 text-neutral-900" />
                      Play
                    </button>
                    <FavoriteButton movie={movie} />
                  </div>
                  <button
                    className="flex items-center w-[32px] h-[32px] text-neutral-900 bg-white rounded-full transition hover:bg-[#e6e6e6]"
                    onClick={() => setMuted(!muted)}
                  >
                    {muted ? (
                      <SpeakerXMarkIcon className="m-auto h-5 w-5" />
                    ) : (
                      <SpeakerWaveIcon className="m-auto h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Movie info and description */}
              <div className="flex flex-col space-y-2 justify-between rounded-b-md bg-neutral-800 px-7 py-5 md:flex-row md:space-x-2 md:space-y-0">
                <div className="space-y-2 md:w-[80%]">
                  <div className="flex items-center space-x-2 text-sm">
                    <p className="font-semibold text-green-400">
                      {(movie!.vote_average * 10).toFixed(2)}% Match
                    </p>
                    <p className="font-light">
                      {movie?.release_date || movie?.first_air_date}
                    </p>
                    <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                      HD
                    </div>
                  </div>
                  <p className="text-sm">{movie?.overview}</p>
                </div>

                <div className="space-y-2 text-xs ">
                  <div className="font-bold text-sm text-orange-500">
                    {movie?.title || movie?.original_name}
                  </div>
                  <div>
                    <span className="text-[#b4b4b4]">Genres:</span>{" "}
                    {genres.map((genre) => genre.name).join(", ")}
                  </div>
                  <div>
                    <span className="text-[#b4b4b4]">Original language:</span>{" "}
                    {movie?.original_language}
                  </div>
                  <div>
                    <span className="text-[#b4b4b4]">Total votes:</span>{" "}
                    {movie?.vote_count}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
