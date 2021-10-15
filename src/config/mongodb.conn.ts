import { connection, connect } from "mongoose";

export class DbMongo {
    constructor() {}

    connect(h: string, dbName: string) {
        let connectionUri = `mongodb://${h}/${dbName}`;

        connect(connectionUri, (err : any) => {
            if (err) {
                console.log('connection failed with mongo.');
            } else {
                console.log('connection successful with mongo.');
            }
        });

    }
}

export const mon_stat_connection = connection.readyState;