const sql = require("./db.js");

// constructor
const Template = function(template) {
  this.id = template.id;
  this.classe = template.classe;
  this.categoria = template.categoria;
  this.nome = template.nome;
  this.tipo = template.tipo;
  this.contenuto = template.contenuto;
};

Template.create = (newTemplate, result) => {
    sql.query("INSERT INTO template SET ?", newTemplate, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created template: ", { id: res.insertId, ...newTemplate });
        result(null, { id: res.insertId, ...newTemplate });
    });
};

Template.findById = (id, result) => {
    sql.query(`SELECT * FROM template WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found template: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found template with the id
        result({ kind: "not_found" }, null);
    });
};

Template.getAll = (nome, result) => {
    let query = "SELECT * FROM template";

    if (nome) {
        query += ` WHERE nome LIKE '%${nome}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("templates: ", res);
        result(null, res);
    });
};

Template.updateById = (id, template, result) => {
    sql.query("UPDATE template SET classe = ?, categoria = ?, nome = ?, tipo = ?, contenuto = ? WHERE id = ?", [template.classe, template.categoria, template.nome, template.tipo, template.contenuto, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found template with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated template: ", { id: id, ...template });
        result(null, { id: id, ...template });
    });
};

Template.remove = (id, result) => {
    sql.query("DELETE FROM template WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Template with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted template with id: ", id);
        result(null, res);
    });
};

Template.removeAll = result => {
  sql.query("DELETE FROM template", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} template`);
    result(null, res);
  });
};

module.exports = Template;