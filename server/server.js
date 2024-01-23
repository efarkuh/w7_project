import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({ connectionString: dbConnectionString });

app.get("/", async (request, response) => {
  const result = await db.query("SELECT * FROM messages");
  response.json(result.rows);
});

app.get("/categories", async (request, response) => {
    const result = await db.query("SELECT * FROM categories");
    response.json(result.rows);
  });

app.post("/", async (request, response) => {
  const name = request.body.name;
  const message = request.body.message;
  const category = request.body.category;

  const newPost = await db.query("INSERT INTO messages (name, message, category) VALUES ($1, $2, $3) RETURNING *", [name, message, category]);
  response.json(newPost.rows[0]);
});

app.delete("/:id", async (request, response) => {
  const recordId = request.params.id;
  const result = await db.query("DELETE FROM messages WHERE id = $1", [recordId]);
  response.json(result.rows);
});

app.listen(8080, function () {
  console.log("Server listening at http://localhost:8080");
});

app.post("/categories", async (request, response) => {
    const {types}  = request.body;
    console.log("Received types:", types);  // Log the received types

    // Add validation for categoryName
    const result = await db.query("INSERT INTO categories (types) VALUES ($1) RETURNING *", [types]);
    response.json(result.rows[0]);
});
