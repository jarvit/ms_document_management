const sql = require("./db.js");

// constructor
const User = function(user) {
  this.id = user.id;
  this.username = user.nome;
  this.tipo = user.tipo;
  this. livello = user.livello;
};

User.findById = (id, result) => {
    sql.query(`SELECT * FROM user WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found user with the id
        result({ kind: "not_found" }, null);
    });
};

User.getAll = (username, result) => {
    let query = "SELECT * FROM user";

    if (username) {
        query += ` WHERE username LIKE '%${username}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

module.exports = User;