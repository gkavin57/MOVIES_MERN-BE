import Express from "express";
import bcrypt from "bcrypt";
import {
  createUser,
  generateHashedPassword,
  getUserByName,
} from "../services/user.service.js";
import jwt from "jsonwebtoken";
const router = Express.Router();

router.post("/signup", async function (request, response) {
  const { username, password } = request.body;

  const userFromDB = await getUserByName(username);
  console.log(userFromDB);
  if (userFromDB) {
    response.status(400).send({ message: "user already exists" });
  } else if (password.length < 8) {
    response.status(400).send({ message: "password must be 8 characters" });
  } else {
    const hashedPassword = await generateHashedPassword(password);
    console.log(hashedPassword);
    const result = await createUser({
      username: username,
      password: hashedPassword,
    }); //db la normal object the store pannanum
    response.send(result);
  }
});

router.post("/login", async function (request, response) {
  const { username, password } = request.body;

  const userFromDB = await getUserByName(username);
  console.log(userFromDB);
  if (!userFromDB) {
    response.status(401).send({ message: "invalid credentials" });
  } else {
    const storedDBPassword = userFromDB.password;
    const isPasswordCheck = await bcrypt.compare(password, storedDBPassword);
    console.log(isPasswordCheck);
    if (isPasswordCheck) {
      const token = jwt.sign({ id: userFromDB._id }, process.env.SECRET_KEY); //unique id and secret key kudukanum
      response.send({ message: "successful login", token: token });
    } else {
      response.status(401).send({ message: "invalid credentials" });
    }
  }
}); //db la normal object the store pannanum

export default router;
