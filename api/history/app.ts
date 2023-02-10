import * as bodyParser from "body-parser";
import * as express from "express";
import { APILogger } from "./logger/api.logger";
import 'dotenv/config'
import { UserHistory } from "./model/userhistory.model";
import { Length } from "sequelize-typescript";
const { Op } = require("sequelize");


class App {

    public express: express.Application;
    public logger: APILogger;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new APILogger();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.post('/api/history/', async (req, res) => {
            try {

                let examId = req.query['id']
                
                let payload;

                if (String(examId) == "") {
                    payload = {
                        ...req.body,
                    }
                } else {
                    payload = {
                        ...req.body,
                        id: examId,
                    }
                }

                await UserHistory.upsert({ ...payload });
                return res
                    .status(200)
                    .json({});
            } catch (e) {
                console.log(e)
                return res.status(500).json({})
            }
        });

        this.express.get('/api/history/:id', async (req, res) => {
            try {
                var history = await UserHistory.findByPk(req.params.id);
                return res
                    .status(200)
                    .json({ ...history.dataValues });
            } catch (e) {
                return res.status(500).json({})
            }
        });

        this.express.get('/api/history', async (req, res) => {
            try {
                let test = req.query['userId']
                
                if (String(test) == "") {
                    return res.status(400).json({})
                }

                const historyExams = await UserHistory.findAll(
                    {
                        where: {userId: {[Op.eq]: test}},
                        raw: true
                    }
                );

                
                const exams = []

                historyExams.every(exam => {
                    exams.push({...exam})
                    return exam
                })

                return res
                    .status(200)
                    .json(exams);
            } catch (e) {
                console.log(e)
                return res.status(500).json({})
            }
        });

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;