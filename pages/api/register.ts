import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).end();
    }

    const data = JSON.parse(req.body);
    const { email, name, password } = data;

    //Checks the database if a user with the provided email exists
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }

    if (!isValidUserName(name)) {
      return res
        .status(422)
        .json({ error: "Username must be at least 3 characters long." });
    }

    if (!isValidEmail(email)) {
      return res.status(422).json({ error: "Invalid email" });
    }

    if (!isValidPassword(password)) {
      return res.status(422).json({ error: "Invalid password" });
    }

    //Password hashing
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
        favoriteMovies: [],
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` });
  }
}

//Input validating functions
function isValidPassword(value: string, minLength = 8) {
  return value && value.trim().length >= minLength;
}

function isValidEmail(value: string) {
  const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
  return value && isValid;
}

function isValidUserName(value: string, minLength = 3) {
  const isValid = /^\w+[^@]$/.test(value);
  return value && value.trim().length >= minLength && isValid;
}
