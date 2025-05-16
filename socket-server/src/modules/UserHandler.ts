export default class UserHandler {
    private _id: string;
    private _name: string;
    private _role: string;

    constructor(id: string, name: string, role: string) {
        this._id = id;
        this._name = name;
        this._role = role;
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get role(): string {
        return this._role;
    }
}
