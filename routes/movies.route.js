import Express from "express";
import { client } from "../index.js";

const router = Express.Router();

router.get("/", async function (request, response) {
  if (request.query.rating) {
    request.query.rating = +request.query.rating;
  }
  console.log(request.query);
  const movies = await client
    .db("B40wd")
    .collection("movies")
    .find(request.query)
    .toArray();
  response.send(movies);
  // console.log(movies);
});

router.get("/:id", async function (request, response) {
  const { id } = request.params;
  const movie = await client
    .db("B40wd")
    .collection("movies")
    .findOne({ id: id });

  movie
    ? response.send(movie)
    : response.status(400).send({ message: "movie not found" });
  console.log(id);
});

router.delete("/:id", async function (request, response) {
  const { id } = request.params;
  const result = await client
    .db("B40wd")
    .collection("movies")
    .deleteOne({ id: id });

  result.deletedCount > 0 //object naala .delecount
    ? response.send({ meaasge: "movie deleted successfully" }) //friendly message
    : response.status(400).send({ message: "movie not found" });
  console.log(result);
});

router.post("/", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await client.db("B40wd").collection("movies").insertMany(data); //db la normal object the store pannanum
  response.send(result);
});

router.put("/:id", async function (request, response) {
  const { id } = request.params;
  const data = request.body;

  const result = await client
    .db("B40wd")
    .collection("movies")
    .updateOne({ id: id }, { $set: data });
  console.log(result);
  response.send(result);
});

export default router;
