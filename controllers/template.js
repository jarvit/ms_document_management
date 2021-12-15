const Template = require("../models/template.js");

// Create and Save a new template
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    
    //Create a template
    const template = new Template({
        id: req.body.id,
        classe: req.body.classe,
        categoria: req.body.categoria,
        nome: req.body.nome,
        tipo: req.body.tipo,
        contenuto: req.body.contenuto
    });

    // Save Tutorial in the database
    Template.create(template, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Template."
            });
        else res.send(data);
    });
};

// Retrieve all templates from the database (with condition).
exports.findAll = (req, res) => {
    const nome = req.query.nome;
  
    Template.getAll(nome, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving template."
            });
        else res.send(data);
    });
};

// Find a single template with a id
exports.findOne = (req, res) => {
    Template.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Template with id ${req.params.id}.`
            });
            } else {
                res.status(500).send({
                    message: "Error retrieving Template with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a template identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    
    Template.updateById(req.params.id, new Template(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Template with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating Template with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Delete a template with the specified id in the request
exports.delete = (req, res) => {
    Template.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Template with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Template with id " + req.params.id
                });
            }
        } else res.send({ message: `Template was deleted successfully!` });
    });
};

// Delete all templates from the database.
exports.deleteAll = (req, res) => {
    Template.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all templates."
            });
        else res.send({ message: `All Template were deleted successfully!` });
    });
};

