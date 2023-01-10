import Express from "express";
import { auth } from "../middleware/auth.js";
import {
  getMovies,
  getMovieById,
  deleteMovieById,
  createMovies,
  updateMovieById,
} from "../services/movies.service.js";

const router = Express.Router();

router.get("/", async function (request, response) {
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  console.log(request.query);

  const movies = await getMovies(request);

  response.send(movies);
  // console.log(movies);
});

router.get("/:id", async function (request, response) {
  const { id } = request.params;
  const movie = await getMovieById(id);

  movie
    ? response.send(movie)
    : response.status(400).send({ message: "movie not found" });
  console.log(id);
});

router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  const result = await deleteMovieById(id);

  result.deletedCount > 0 //object naala .delecount
    ? response.send({ meaasge: "movie deleted successfully" }) //friendly message
    : response.status(400).send({ message: "movie not found" });
  console.log(result);
});

router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await createMovies(data); //db la normal object the store pannanum
  response.send(result);
});

router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;

  const result = await updateMovieById(id, data);
  console.log(result);
  response.send(result);
});

export default router;
