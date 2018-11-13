import * as express from "express";
import * as bodyparser from "body-parser";
import Game from "./model/game";
import ObjectDB from "./model/objectdb";

const game_database:ObjectDB<Game> = new ObjectDB<Game>();

const app = express();
app.use(bodyparser.urlencoded({extended: false}));


// Get list
app.get("/games", function(req, res, next)
{
    res.locals.data = game_database.getPublicList();
    next();
});

// Get by id
app.get("/game/:id", function(req, res, next)
{
    const game = game_database.getOneById(parseInt(req.params.id));

    if (game)
    {
        res.locals.data = game;
        next();
    }
    else
    {
        next("Game not found");
    }
});

// Remove
app.delete("/game/:id", function(req, res, next)
{
    const deleted = game_database.remove(parseInt(req.params.id));

    if (deleted)
    {
        res.locals.data = {"success": "success"};
        next();
    }
    else
    {
        next("Game not found");
    }
});

// Update
app.put("/game/:id", function(req, res, next)
{
    const updated_game = game_database.update(parseInt(req.params.id), req.body);

    if (updated_game)
    {
        res.locals.data = updated_game;
        next();
    }
    else
    {
        next("Game not found");
    }
});

// Create
app.put("/game", function(req, res, next)
{
    const {title, price, publisher_id, tags, releaseDate} = req.body;
    if (!title || !price || !publisher_id || !tags || !releaseDate)
    {
        next("Missing parameters");
        return;
    }

    next();
}, function(req, res, next)
{
    const {title, price, publisher_id, tags, releaseDate} = req.body;
    const game = new Game(title, price, publisher_id, tags, releaseDate);
    const result = game_database.insert(game);

    res.locals.data = result;
    next();
});

app.use(function(req, res, next)
{
    if (res.locals.data != null)
    {
        res.json(res.locals.data);
    }
    else
    {
        next("Method not found");
    }
})
app.use(function(error, req, res, next)
{
    console.error(error);
    res.json({error});
});

app.listen(3000, function()
{
    console.log("Listening on port 3000");
});
