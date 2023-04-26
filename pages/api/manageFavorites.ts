import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = JSON.parse(req.body);

    //Adds a new movie to the database
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteMovies: {
            push: JSON.stringify(data.movie),
          },
        },
      });
      return res.status(200).json(updatedUser);
    }
    //Removes selected movie from the database
    if (req.method === "DELETE") {
      const { currentUser } = await serverAuth(req, res);

      const index = data.data;

      currentUser.favoriteMovies.splice(index, 1);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteMovies: currentUser.favoriteMovies,
        },
      });

      return res.status(200).json(updatedUser);
    }

    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
