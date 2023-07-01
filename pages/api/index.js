const express = require("express");
const mysql = require("mysql");
const app = express();
require("dotenv").config();
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.get("/api", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.end("DANNA - HELLO WORLD");
});

// DANNA

// TOUR
app.get("/api/danna/tour", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  const query = "SELECT * FROM danna_tour";
  connection.query(query, (error, results) => {
    const shows = results;
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json(shows);
    }
  });
});
app.post("/api/danna/tour", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  const query = `INSERT INTO danna_tour (city, state, venue, date, tickets, tickets_vip) VALUES (?,?,?,?,?,?);`;
  const values = [
    req.body.city,
    req.body.state,
    req.body.venue,
    req.body.date,
    req.body.tickets,
    req.body.tickets_vip,
  ];
  connection.query(query, values, (error, result) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.end("DANNA - SHOW ADDED");
    }
  });
});
app.put("/api/danna/tour/update/:id", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  const query = `UPDATE danna_tour SET city='prueba2' WHERE id = '${req.params.id}'`;
  connection.query(query, (error, result) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.end("DANNA - SHOW UPDATED");
    }
  });
});
app.delete("/api/danna/tour/:id", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  const query = `DELETE FROM danna_tour WHERE id = '${req.params.id}'`;
  connection.query(query, (error, result) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.end("DANNA - SHOW DELETED");
    }
  });
});

// FORO
app.get("/api/danna/comments", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  const query = "SELECT * FROM danna_comments";
  connection.query(query, (error, results) => {
    const shows = results;
    if (error) {
      res.status(500).json({ error });
    } else {
      res.json(shows);
    }
  });
});
app.post("/api/danna/comments", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  const query = `INSERT INTO danna_comments (author, comment, date) VALUES (?,?,?);`;
  const values = [req.body.author, req.body.comment, req.body.date];
  connection.query(query, values, (error, result) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.end("DANNA - COMMENT ADDED");
    }
  });
});

module.exports = app;
