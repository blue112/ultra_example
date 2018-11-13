export default class Producer
{
    private id: number;
    private name: string;
    private siret: number;
    private phone: string;

    public constructor(name: string, siret: string, phone: string)
    {
        this.name = name;
        this.phone = phone;
        this.siret = parseInt(siret);
    }

    public update(changes)
    {
        const modifiedKeys = Object.keys(changes);
        for (let key of modifiedKeys)
        {
            const value = changes[key];
            switch (key)
            {
                case "name":
                case "phone":
                    this[key] = value;
                    break;
                case "siret":
                    this.siret = parseInt(value);
                    break;
            }
        }
    }

    public getPublic()
    {
        return {
            id: this.id,
            name: this.name,
            siret: this.siret,
            phone: this.phone
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
