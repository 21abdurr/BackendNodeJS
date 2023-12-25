import express from "express"
import AuthController from "../controllers/AuthController.js";

const router = express.Router();


router.get('/', (req, res) => {
    console.log(req.body.umur);
    console.log(req.query);
    res.json({ title: `Hello ${req.query.nama}, Usia ${req.body.umur}` }
    );

})

router.post('/', (req, res) => {
    console.log(req.body);
    res.json({ title: `Hello ${req.body.nama}, Usia ${req.body.umur}` })
})

router.post('/register', AuthController.register);

export default router;