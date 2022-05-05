const Exchange = require("../models/stockExchange.model.js");
// Create and Save a new exchange
exports.create = (req, res) => {
  
};
// Retrieve all exchanges from the database (with condition).
exports.findAll = (req, res) => {
  
};
// Find a single exchange with a id
exports.findOne = (req, res) => {
  
};
// find all published exchanges
exports.findAllPublished = (req, res) => {
  
};
// Update a exchange identified by the id in the request
exports.update = (req, res) => {
  
};
// Delete a exchange with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all exchanges from the database.
exports.deleteAll = (req, res) => {
  
};

//Create a new object
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a exchange
  const exchange = new Exchange({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });
  // Save exchange in the database
  Exchange.create(exchange, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the exchange."
      });
    else res.send(data);
  });
};

// Retrieve all exchanges from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;
  Exchange.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving exchanges."
      });
    else res.send(data);
  });
};
exports.findAllPublished = (req, res) => {
  Exchange.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving exchanges."
      });
    else res.send(data);
  });
};

//Retrieve a single object
exports.findOne = (req, res) => {
  Exchange.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found exchange with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving exchange with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

//Update an object
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  Exchange.updateById(
    req.params.id,
    new Exchange(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found exchange with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating exchange with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

//Delete an object
exports.delete = (req, res) => {
  Exchange.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found exchange with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete exchange with id " + req.params.id
        });
      }
    } else res.send({ message: `exchange was deleted successfully!` });
  });
};

//Delete all objects
exports.deleteAll = (req, res) => {
  Exchange.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All exchange were deleted successfully!` });
  });
};