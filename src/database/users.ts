import { Pool } from "pg";

export async function getUserByUsername (dbConnection : Pool, username: string) : Promise<User>
{
    const result = await dbConnection.query("SELECT * FROM dev.users WHERE username=$1", [username]);

    if (result.rowCount == 0) return null as any;
    
    const userData = result.rows[0];
    return new User(userData.id, userData.username, userData.name, userData.surname, userData.password, userData.email, userData.creation_date);
    
}

export class User {
    private id: number;
    private username: string;
    private name: string;
    private surname: string;
    private password: string;
    private email: string;
    private creation_date: string;

    constructor(id: number, username: string, name: string, 
        surname: string, password: string, email: string, creation_date: string)
    {
        this.id = id;
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.email = email;
        this.creation_date = creation_date;
    }

    Username() { return this.username; }
    Name() {return this.name; }
    Surname() {return this.surname; }
    Password() {return this.password; }
    Email() {return this.email; }
}