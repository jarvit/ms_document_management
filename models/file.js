const sql = require("./db.js");

// constructor
const File = function(file) {
  this.id = file.id;
  this.nome = file.nome;
  this.tipo = file.tipo;
  this.classe = file.classe;
  this.categoria = file.categoria;
  this.autore = file.autore;
  this.template = file.template;
  this. livello = file.livello;
};

File.create = (newFile, result) => {
    sql.query("INSERT INTO file SET ?", newFile, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created file: ", { id: res.insertId, ...newFile });
        result(null, { id: res.insertId, ...newFile });
    });
};

File.findById = (id, result) => {
    sql.query(`SELECT * FROM file WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found file: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found file with the id
        result({ kind: "not_found" }, null);
    });
};

File.getAll = (nome, result) => {
    let query = "SELECT * FROM file";

    if (nome) {
        query += ` WHERE nome LIKE '%${nome}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("files: ", res);
        result(null, res);
    });
};

File.updateById = (id, file, result) => {
    sql.query("UPDATE file SET nome = ?, tipo = ?, classe = ?, categoria = ?, autore = ?, template = ?, livello = ? WHERE id = ?", [file.nome, file.tipo, file.classe, file.categoria, file.autore, file.template, file.livello, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found file with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated file: ", { id: id, ...file });
        result(null, { id: id, ...file });
    });
};

File.remove = (id, result) => {
    sql.query("DELETE FROM file WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found File with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted file with id: ", id);
        result(null, res);
    });
};

File.removeAll = result => {
  sql.query("DELETE FROM file", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} file`);
    result(null, res);
  });
};

module.exports = File;