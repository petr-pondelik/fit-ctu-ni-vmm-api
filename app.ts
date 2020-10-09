import express from "express";
import createHttpError from "http-errors";
import Path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import indexRouter from "./router/index";
import photosRouter from "./router/photos";
import EditDistance from "./src/Similiarity/EditDistance";

// Create a new express app instance
export const app: express.Application = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(Path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/photos', photosRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createHttpError(404));
});

let editDistance = new EditDistance();
editDistance.evaluate('aho', 'hol');