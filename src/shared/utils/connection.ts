import pg from 'pg'
export class Connection {
    getConnectionPostgres() {
        const connection = new pg.Client({
            user: process.env.DB_USERNAME,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT || 5432),
        });
        return connection;
    }
}
