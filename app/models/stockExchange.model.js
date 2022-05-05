const sql = require("./db.js");
// constructor
const Exchange = function(exchange) {
  this.title = exchange.title;
  this.description = exchange.description;
  this.published = exchange.published;
};
Exchange.create = (newExchange, result) => {
  sql.query("INSERT INTO exchange SET ?", newExchange, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created exchange: ", { id: res.insertId, ...newExchange });
    result(null, { id: res.insertId, ...newExchange });
  });
};

Exchange.findById = (id, result) => {
  sql.query(`SELECT * FROM exchange WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found exchange: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found exchange with the id
    result({ kind: "not_found" }, null);
  });
};
Exchange.getAll = (title, result) => {
  let query = "SELECT * FROM exchange";
  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("exchanges: ", res);
    result(null, res);
  });
};
Exchange.getAllPublished = result => {
  sql.query("SELECT * FROM exchange WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("exchange: ", res);
    result(null, res);
  });
};
Exchange.updateById = (id, exchange, result) => {
  sql.query(
    "UPDATE exchange SET title = ?, description = ?, published = ? WHERE id = ?",
    [exchange.title, exchange.description, exchange.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found exchange with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated exchange: ", { id: id, ...exchange });
      result(null, { id: id, ...exchange });
    }
  );
};
Exchange.remove = (id, result) => {
  sql.query("DELETE FROM exchange WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found exchange with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted exchange with id: ", id);
    result(null, res);
  });
};
Exchange.removeAll = result => {
  sql.query("DELETE FROM exchange", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} exchanges`);
    result(null, res);
  });
};
module.exports = Exchange;