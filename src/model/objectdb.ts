interface ManageableObject
{
    setId(id: number): void;
    getId(): number;
    update(changes: any);
    getPublic(): any;
}

export default class ObjectDB<T extends ManageableObject>
{
    private collection: Array<T>

    public constructor()
    {
        this.collection = [];
    }

    public insert(obj:T): Boolean
    {
        let new_id = 1;
        if (this.collection.length > 0)
        {
            new_id = this.collection[this.collection.length - 1].getId() + 1;
        }

        obj.setId(new_id);

        this.collection.push(obj);
        return obj.getPublic();
    }

    public remove(id: number): Boolean
    {
        const obj_pos = this.collection.findIndex(g => g.getId() === id);
        if (obj_pos === -1)
        {
            return false;
        }

        this.collection.splice(obj_pos, 1);
        return true;
    }

    private getById(id: number): T | null
    {
        const obj = this.collection.find(g => g.getId() === id);

        if (!obj)
        {
            return null;
        }

        return obj;
    }

    public update(id: number, changes: any): Boolean
    {
        const obj = this.getById(id);
        if (!obj)
        {
            return null;
        }

        obj.update(changes);
        // No need to update the collection in this implementation (in memory array)

        return obj.getPublic();
    }

    public getOneById(id: number): any
    {
        const obj = this.getById(id);
        if (!obj)
        {
            return null;
        }

        return obj.getPublic();
    }

    public getPublicList(): Array<any>
    {
        return this.collection.map(obj => obj.getPublic());
    }
}
