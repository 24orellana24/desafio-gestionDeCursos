const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "postgres",
  database: "cursos",
  port: 5432,
});

async function nuevoCurso(curso) {
  try {
    const result = await pool.query(`
      INSERT INTO
      cursos (nombre, nivel, fecha, duracion)
      values ('${curso.nombre}', '${curso.nivelTecnico}', '${curso.fechaInicio}', '${curso.duracion}')
      RETURNING *`
    );
    return result.rows;
  } catch (err) {
    console.log(`Error en query nuevo:\n${err.code}`);
    return err.code;
  }
}

async function consultaCursos() {
  try {
    const result = await pool.query(`SELECT * FROM cursos`);
    return result.rows;
  } catch (err) {
    console.log(`Error en query consulta:\n${err.code}`);
    return err.code;
  }
}

async function editarCurso(curso) {
  try {
    const result = await pool.query(`
      UPDATE cursos
      SET
        nombre = '${curso.nombre}',
        nivel = '${curso.nivelTecnico}',
        fecha = '${curso.fechaInicio}',
        duracion = '${curso.duracion}'
      WHERE id = '${curso.id}'
      RETURNING *`
    );
    return result.rows;
  } catch (err) {
    console.log(`Error en query editar:\n${err.code}`);
    return err.code;
  }
}

async function eliminarCurso(id) {
  try {
    const result = await pool.query(`DELETE FROM cursos WHERE id = '${id}' RETURNING *;`);
    return result.rows[0].nombre;
  } catch (err) {
    console.log(`Error en query eliminar:\n${err}`);
    return err.code;
  }
}

module.exports = { nuevoCurso, consultaCursos, editarCurso, eliminarCurso };