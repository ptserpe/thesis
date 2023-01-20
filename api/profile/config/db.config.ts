import { Sequelize } from 'sequelize-typescript'
import { UserProfile } from '../model/userprofile.model';

const dialect: any = "postgres";

export const connection = new Sequelize({
    host: process.env.HOST,
    dialect: dialect,
    database: process.env.DB,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    pool: {
        max: 10,
        min: 0,
        acquire: 20000,
        idle: 5000
    },
    models: [UserProfile]
});