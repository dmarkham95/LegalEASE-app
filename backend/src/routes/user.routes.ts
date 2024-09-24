import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post('/', userController.createUser.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.get('/', userController.getAllUsers.bind(userController));
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));

export default router;
