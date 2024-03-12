const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");

require("dotenv").config();

const app = express();

//middleware run from top to bottom [sequence matters]

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//get all restaurants

app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const restaurants = await db.query("select * from restaurants");

    res.status(200).json({
      status: "success",
      results: restaurants.rows.length,
      data: {
        restaurants: restaurants.rows,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

//get individual restaurant

app.get("/api/v1/restaurants/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const restaurants = await db.query(
      "select * from restaurants where id=$1",
      [id]
    );

    const avg_rating = await db.query(
      "select trunc(AVG(rating),2) from reviews where restaurant_id=$1",
      [id]
    );

    const reviews = await db.query(
      "select * from reviews where restaurant_id=$1",
      [id]
    );

    res.status(200).json({
      status: "success",
      results: restaurants.rows.length,
      data: {
        restaurants: restaurants.rows,
        reviews: reviews.rows,
        total_reviews: reviews.rows.length,
        avg_rating: avg_rating.rows[0].trunc,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

//create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const { name, location, price_range } = req.body;

    const restaurants = await db.query(
      "insert into restaurants (name,location,price_range) values ($1,$2,$3) returning *",
      [name, location, price_range]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurants: restaurants.rows,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

//update a restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, location, price_range } = req.body;

    const results = await db.query(
      "update restaurants set name=$1,location=$2,price_range=$3 where id=$4 returning *",
      [name, location, price_range, id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurants: results.rows,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

//delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await db.query("delete from restaurants where id=$1", [id]);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

//add review

app.post("/api/v1/restaurants/:id/addreview", async (req, res) => {
  const id = req.param.id;
  const {} = req.body;

  try {
    const { restaurant_id, name, review, rating } = req.body;

    const reviews = await db.query(
      "insert into reviews(restaurant_id,name,review,rating) values ($1,$2,$3,$4) returning *",
      [restaurant_id, name, review, rating]
    );

    res.status(201).json({
      status: "success",
      data: {
        restaurants: reviews.rows,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

const port = process.env.PORT | 3005;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
