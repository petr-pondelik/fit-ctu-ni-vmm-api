import express, {Router} from "express";

let router: Router = express.Router();

/** GET home-page */
router.get('/', (req, res, next) => {
    res.send({"res": "success"})
});

export default router;