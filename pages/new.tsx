import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Head from "next/head";
import requests from "@/utils/requests";
import { Movie } from "@/typings";
import Row from "@/components/Row";
import Modal from "@/components/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeModal } from "@/store/modalSlice";
import { getSession } from "next-auth/react";
import { NextPageContext } from "next";

interface Props {
  trendingNow: Movie[];
  popularTv: Movie[];
  popularMovies: Movie[];
  newMovies: Movie[];
  newTv: Movie[];
}

const New = ({
  trendingNow,
  popularTv,
  popularMovies,
  newMovies,
  newTv,
}: Props) => {
  const { showModal } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  return (
    <>
      <Head>
        <title>Netflix Clone - New & Popular</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`relative h-screen bg-gradient-to-b from-neutral-900/30 to-neutral-950 ${
          showModal && "h-screen overflow-hidden"
        }`}
      >
        <Header />

        <main className="relative px-4 pb-20 space-y-16 lg:space-y-24 lg:px-12">
          <Banner trendingNow={trendingNow} />
          <section className="space-y-4 md:space-y-8">
            <Row title="Trending Now" movies={trendingNow} />
            <Row title="Popular TV" movies={popularTv} />
            <Row title="Popular Movies" movies={popularMovies} />
            <Row title="New Movies" movies={newMovies} />
            <Row title="New TV Shows" movies={newTv} />
          </section>
        </main>
        <Modal visible={showModal} onClose={() => dispatch(closeModal())} />
      </div>
    </>
  );
};

export default New;

export const getServerSideProps = async (context: NextPageContext) => {
  //Checks for active session and redirects to login page
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  //Fetches all movie lists and returns them as props
  const [trendingNow, inTheatres, popularMovies, newMovies, newTv] =
    await Promise.all([
      fetch(requests.fetchTrending).then((res) => res.json()),
      fetch(requests.fetchPopTv).then((res) => res.json()),
      fetch(requests.fetchPopularMovies).then((res) => res.json()),
      fetch(requests.fetchNewMovies).then((res) => res.json()),
      fetch(requests.fetchNewTv).then((res) => res.json()),
    ]);

  return {
    props: {
      trendingNow: trendingNow.results,
      popularTv: inTheatres.results,
      popularMovies: popularMovies.results,
      newMovies: newMovies.results,
      newTv: newTv.results,
    },
  };
};