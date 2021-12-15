module.exports = app => {
    
    const template = require("../controllers/template.js");
    const file = require("../controllers/file.js");
    const user = require("../controllers/user.js");

    var routerTemplate = require("express").Router();
    var routerUser = require("express").Router();
    var routerFile = require("express").Router();

    // Retrieve all users
    routerUser.get("/", user.findAll);
  
    // Retrieve a single user with id
    routerUser.get("/:id", user.findOne);


    // Create a new template
    routerTemplate.post("/", template.create);
  
    // Retrieve all templates
    routerTemplate.get("/", template.findAll);
  
    // Retrieve a single template with id
    routerTemplate.get("/:id", template.findOne);
  
    // Update a template with id
    routerTemplate.put("/:id", template.update);
  
    // Delete a template with id
    routerTemplate.delete("/:id", template.delete);
  
    // Delete all templates
    routerTemplate.delete("/", template.deleteAll);

    // Create a new file
    routerFile.post("/", file.create);
  
    // Retrieve all files
    routerFile.get("/", file.findAll);
  
    // Retrieve a single file with id
    routerFile.get("/:id", file.findOne);
  
    // Update a file with id
    routerFile.put("/:id", file.update);
  
    // Delete a file with id
    routerFile.delete("/:id", file.delete);
  
    // Delete all files
    routerFile.delete("/", file.deleteAll);
  
    app.use('/api/user', routerUser);
    app.use('/api/file', routerFile);
    app.use('/api/template', routerTemplate);

};