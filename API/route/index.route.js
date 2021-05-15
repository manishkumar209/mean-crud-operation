import express from 'express';

import * as userController from '../controller/user.controller';

const router = express.Router();

router.route('/user').post(userController.addUser);
router.route('/user').get(userController.getUsers);
router.route('/user/:id').get(userController.getUser);
router.route('/user/:id').put(userController.updateUser);
router.route('/user-delete/:id').get(userController.deleteUser);

router.route('/user/image/:id').get(userController.getImage);

export default router;

