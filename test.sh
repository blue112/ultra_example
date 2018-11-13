function query()
{
    curl -s $@ | jshon
}

echo "Create an entry"
query -XPUT -d 'title=Game&price=19.99&publisher_id=1&tags=a,b,c&releaseDate=1542128639000' $1:3000/game
echo "Create an entry"
query -XPUT -d 'title=Game&price=19.99&publisher_id=1&tags=a,b,c&releaseDate=1542128639000' $1:3000/game
echo "Create an entry"
query -XPUT -d 'title=Game&price=19.99&publisher_id=1&tags=a,b,c&releaseDate=1542128639000' $1:3000/game

echo "Listing the 3rd one"
query $1:3000/game/3

echo "Updating the 2nd one"
query -XPUT -d "title=Marvelous" -s $1:3000/game/2
query $1:3000/game/2

echo "Deleting all but one"
query -XDELETE $1:3000/game/1
query -XDELETE $1:3000/game/2

echo "Listing"
query $1:3000/games

echo "Deleting the last one"
query -XDELETE $1:3000/game/3

echo "Listing"
query $1:3000/games
