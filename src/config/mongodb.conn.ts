import { connection, connect } from "mongoose";

export class DbMongo {
    constructor() {}

    connect(h: string, dbName: string, u?: string, pass?: string, p?: number) {
        let connectionUrl = `mongodb://${h}/${dbName}`;

        if(u != undefined && pass != undefined) {
            //mongodb+srv://Irfan-Khan:<password>@cluster0.05p4a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
            connectionUrl = `mongodb+srv://${u}:${pass}@cluster0.05p4a.mongodb.net/${dbName}?retryWrites=true&w=majority`;
        }

        connect(connectionUrl, (err : any) => {
            if (err) {
                console.log(err);
                console.log('connection failed with mongo.');
            } else {
                console.log('connection successful with mongo.');
            }
        });

    }
}

export const mon_stat_connection = connection.readyState;
