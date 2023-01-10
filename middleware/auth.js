import jwt from "jsonwebtoken";

//api protect panna middeware create pannaum using jwt(custom middleware-auth)
export const auth = (request, response, next) => {
  try {
    const token = request.header("x-auth-token");
    console.log("token", token);

    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    response.status(401).send({ message: err.message });
  }
};

//next()-->auth active pana apm,async function a trigger pannum
