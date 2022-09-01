import pg from 'pg'
export class Connection {
    getConnectionPostgres() {
        const connection = new pg.Client({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'postgres',
            port: 5432,
        });
        return connection;
    }
}
