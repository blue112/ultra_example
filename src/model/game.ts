export default class Game
{
    private id: number;
    private title: string;
    private price: number;
    private publisher_id: number;
    private tags: Array<string>;
    private releaseDate: Date;

    public constructor(title: string, price: string, publisher_id: string, tags: string, releaseDate: string)
    {
        this.title = title;
        this.price = parseFloat(price);
        this.publisher_id = parseInt(publisher_id);
        this.tags = tags.split(",");
        this.releaseDate = new Date(parseInt(releaseDate));
    }

    public update(changes)
    {
        const authorized_keys = ["title", "price", "publisher_id", "tags", "releaseDate"]
        const modifiedKeys = Object.keys(changes);
        for (let key of modifiedKeys)
        {
            const value = changes[key];
            switch (key)
            {
                case "title":
                    this.title = value;
                    break;
                case "price":
                    this.price = parseFloat(value);
                    break;
                case "publisher_id":
                    this.publisher_id = parseInt(value);
                    break;
                case "tags":
                    this.tags = value.split(",");
                    break;
                case "releaseDate":
                    this.releaseDate = new Date(parseInt(value));
                    break;
            }
        }
    }

    public getPublic()
    {
        return {
            id: this.id,
            title: this.title,
            price: this.price,
            publisher_id: this.publisher_id,
            tags: this.tags,
            releaseDate: this.releaseDate
        };
    }

    public setId(new_id: number)
    {
        this.id = new_id;
    }

    public getId()
    {
        return this.id;
    }
}
