const File = require("../models/file.js");

// Create and Save a new template
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    
    //Create a File
    const file = new File({
        id: req.body.id,
        nome: req.body.nome,
        tipo: req.body.tipo,
        classe: req.body.classe,
        categoria: req.body.categoria,
        autore: req.body.autore,
        template: req.body.template,
        livello: req.body.livello
    });
    
    // Save File in the database
    File.create(file, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the File."
            });
        else res.send(data);
    });
};

// Retrieve all files from the database (with condition).
exports.findAll = (req, res) => {
    const nome = req.query.nome;
  
    File.getAll(nome, (err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving file."
            });
        else res.send(data);
    });
};

// Find a single template with a id
exports.findOne = (req, res) => {
    File.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found File with id ${req.params.id}.`
            });
            } else {
                res.status(500).send({
                    message: "Error retrieving File with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Update a file identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    
    File.updateById(req.params.id, new File(req.body), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found File with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error updating File with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Delete a template with the specified id in the request
exports.delete = (req, res) => {
    File.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found File with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete File with id " + req.params.id
                });
            }
        } else res.send({ message: `File was deleted successfully!` });
    });
};

// Delete all files from the database.
exports.deleteAll = (req, res) => {
    File.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all files."
            });
        else res.send({ message: `All Files were deleted successfully!` });
    });
};

