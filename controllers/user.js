const User = require("../models/user.js");

// Retrieve all users from the database (with condition).
exports.findAll = (req, res) => {
    const username = req.query.username;
  
    User.getAll(username, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving user."
            });
        else res.send(data);
    });
};

// Find a single user with a id
exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
            });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};