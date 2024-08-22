const express = require("express");
const router = express.Router();
const DataController = require("../controllers/operationController");

// Middleware to use the database from app locals
router.use((req, res, next) => {
    req.dataController = new DataController(req.app.locals.db);
    next();
});

// Route to add data
router.post("/add", (req, res) => {
    req.dataController.addData(req, res);
});

// You can add more routes here for other operations (get, update, delete)

module.exports = router;
