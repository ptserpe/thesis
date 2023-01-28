import * as bodyParser from "body-parser";
import * as express from "express";
import { APILogger } from "./logger/api.logger";
import 'dotenv/config'
import { UserProfile } from "./model/userprofile.model";

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

        this.express.post('/api/profile/:id', async (req, res) => {
            try {
                await UserProfile.upsert({ ...req.body });
                return res
                    .status(200)
                    .json({});
            } catch (e) {
                return res.status(500).json({})
            }
        });

        this.express.get('/api/profile/:id', async (req, res) => {
            try {
                var profile = await UserProfile.findByPk(req.params.id);
                
                if (profile == null) {
                    return res.status(404).json({})
                }

                return res
                    .status(200)
                    .json({ ...profile.dataValues });
            } catch (e) {
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