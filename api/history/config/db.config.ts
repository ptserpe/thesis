import { Sequelize } from 'sequelize-typescript'
import { UserHistory } from '../model/userhistory.model';

const dialect: any = "postgres";

export const connection = new Sequelize({
    host: process.env.HOST,
    dialect: dialect,
    port: Number.parseInt(process.env.DB_PORT),
    database: process.env.DB,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    pool: {
        max: 10,
        min: 0,
        acquire: 20000,
        idle: 5000
    },
    models: [UserHistory]
});