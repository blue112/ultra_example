"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyparser = require("body-parser");
const game_1 = require("./model/game");
const game_database = [];
const publishers_database = [];
const app = express();
app.use(bodyparser.urlencoded({ extended: false }));
app.get("/games", function (req, res, next) {
    res.locals.data = game_database.map(g => g.getPublic());
    next();
});
app.get("/game/:id", function (req, res, next) {
    const id = req.params.id;
    const game = game_database.find(g => g.getId() == id);
    if (game) {
        res.locals.data = game.getPublic();
        next();
    }
    else {
        next("Game not found");
    }
});
app.delete("/game/:id", function (req, res, next) {
    const id = parseInt(req.params.id);
    const game_pos = game_database.findIndex(g => g.getId() == id);
    if (game_pos !== -1) {
        game_database.splice(game_pos, 1);
        res.locals.data = { "success": "success" };
        next();
    }
    else {
        next("Game not found");
    }
});
app.put("/game/:id", function (req, res, next) {
    const id = req.params.id;
    const game = game_database.find(g => g.getId() == id);
    if (game) {
        game.update(req.body);
        res.locals.data = game.getPublic();
        next();
    }
    else {
        next("Game not found");
    }
});
app.put("/game", function (req, res, next) {
    const { title, price, publisher_id, tags, releaseDate } = req.body;
    if (!title || !price || !publisher_id || !tags || !releaseDate) {
        next("Missing parameters");
        return;
    }
    next();
}, function (req, res, next) {
    const { title, price, publisher_id, tags, releaseDate } = req.body;
    let id = 1;
    if (game_database.length > 0) {
        id = game_database[game_database.length - 1].getId() + 1;
    }
    const game = new game_1.default(id, title, price, publisher_id, tags, releaseDate);
    game_database.push(game);
    res.locals.data = game.getPublic();
    next();
});
app.use(function (req, res, next) {
    if (res.locals.data != null) {
        res.json(res.locals.data);
    }
    else {
        next("Method not found");
    }
});
app.use(function (error, req, res, next) {
    console.error(error);
    res.json({ error });
});
app.listen(3000, function () {
    console.log("Listening on port 3000");
});
//# sourceMappingURL=service.js.map