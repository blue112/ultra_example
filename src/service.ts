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

// Using post so it's harder to do it by mistake
app.post("/process/updateGameAvailability", function(req, res, next)
{
    const DAY = 1000 * 3600 * 24;
    const TWELVE_MONTHES = DAY * 365;
    const EIGHTEEN_MONTHES = DAY * 547;
    const now = new Date().getTime();

    let deleted = 0;
    let updated = 0;

    // Get all titles
    const list = game_database.getPublicList();

    // Find thoses that should be removed or updated
    for (let game of list)
    {
        const delta = now - game.releaseDate.getTime();
        console.log(delta, game.releaseDate);
        if (delta > EIGHTEEN_MONTHES)
        {
            game_database.remove(game.id);
            deleted++;
        }
        else if (delta > TWELVE_MONTHES)
        {
            const new_price = game.price * 0.8;
            game_database.update(game.id, { price: new_price });
            updated++;
        }
    }

    res.locals.data = {"success": "success", "deleted": deleted, "updated": updated};
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
