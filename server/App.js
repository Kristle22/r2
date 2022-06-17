const express = require('express')
const app = express()
const port = 3003

const cors = require("cors");
app.use(cors());
const mysql = require("mysql");
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "la_ma",
});


// Routes
// READ
app.get('/', (req, res) => {
  res.send('Hello, World!')
})
app.get('/zuikis', (req, res) => {
  res.send('Labas, Zuiki!')
})

app.get('/medziai', (req, res) => {
  const sql = `
SELECT
*
FROM trees`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});
// CREATE
// INSERT INTO table_name(column1, column2, column3, ...)
// VALUES(value1, value2, value3, ...);
app.post('/medziai', (req, res) => {
  const sql = `
  INSERT INTO trees
  (type, title, height)
  VALUES (?, ?, ?)
  `;
  con.query(sql, [req.body.type, req.body.title, req.body.height], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
});

// DELETE
// DELETE FROM table_name WHERE condition;
app.delete('/medziai/:treeId', (req, res) => {
  const sql = `
  DELETE FROM trees
  WHERE id = ?
  `;
  con.query(sql, [req.params.treeId], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
});

// EDIT(PUT);
app.update('/medziai/:treeId', (req, res) => {
  const sql = `
  UPDATE trees SET id = ?, title = ?, height = ?, type = ?
  where id = ?
  `;
  con.query(sql, [req.body.type, req.body.title, req.body.height], (err, result) => {
    if (err) throw err;
    res.send(result);
  })
});

app.listen(port, () => {
  console.log(`Bebras klauso porto Nr. ${port}`)
})