module.exports = app => {
  const exchanges = require("../controllers/stockExchange.controller.js");
  var router = require("express").Router();
  // Create a new exchange
  router.post("/", exchanges.create);
  // Retrieve all exchanges
  router.get("/", exchanges.findAll);
  // Retrieve all published exchanges
  router.get("/published", exchanges.findAllPublished);
  // Retrieve a single exchange with id
  router.get("/:id", exchanges.findOne);
  // Update a exchange with id
  router.put("/:id", exchanges.update);
  // Delete a exchange with id
  router.delete("/:id", exchanges.delete);
  // Delete all exchanges
  router.delete("/", exchanges.deleteAll);
  app.use('/api/exchanges', router);
};