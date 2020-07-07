import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();
const userController = new UserController();

export default function route(app){
    app.use('/', router);

    router.get('/api/user/get', userController.get);
}
