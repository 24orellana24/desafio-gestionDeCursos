const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => console.log("Servido incializado en puerto 3000"));

const { nuevoCurso, consultaCursos, editarCurso, eliminarCurso } = require("./consultas");

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
});

app.post("/curso", async (req, res) => {
  const curso = req.body;
  const respuesta = await nuevoCurso(curso);
  res.send(respuesta);
});

app.get("/cursos", async (req, res) => {
  const respuesta = await consultaCursos();
  res.send(respuesta);
});

app.put("/curso", async (req, res) => {
  const curso = req.body;
  const respuesta = await editarCurso(curso);
  res.send(respuesta);
});

app.delete("/curso/:id", async (req, res) => {
  const { id } = req.params;
  const respuesta = await eliminarCurso(id);
  res.send(respuesta);
});