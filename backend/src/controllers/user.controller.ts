import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { BaseFilter } from '../interfaces/baseFilter.interface copy';

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(Number(id));
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user' });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    const { query, pageNum, pageSize } = req.query as unknown as BaseFilter;
    try {
      const limit = pageSize || 10;
      const offset = ((pageNum || 1) - 1) * limit;

      const users = await userService.getAllUsers({
        query,
        take: limit,
        skip: offset
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const updatedUser = await userService.updateUser(Number(id), req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await userService.deleteUser(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user' });
    }
  }
}

