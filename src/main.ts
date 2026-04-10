import express, { NextFunction } from "express";
import GlobalPostAPI from "./roots/GlobalPostAPI";
import sequelize from "../config/database";

console.log("MODELS:", sequelize.models);

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log('ada request baru');
    next(); 
})

app.use('/api', GlobalPostAPI);

app.get("/api/test", (req, res) => {
    res.send("API Jalur /api/test sudah nyambung!");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get('/error', (req, res, next) => {
  console.log('request /error');
  throw new Error("Test Error");
  next();
})

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('Ada error', err.message);
    res.status(500).json({
        message: err.message
    })
})

app.use('/', (req, res) => {
  console.log('request selesai');
})

sequelize.authenticate()
    .then(() => console.log("DB Successfully Connected"))
    .catch(err => console.error("DB Error: ", err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is Running")
});