import { Repository, Like } from "typeorm";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../config/typeorm.config";

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(data: {
    firstName: string;
    lastName: string;
    email: string;
  }): Promise<User> {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async getAllUsers(filter?: {
    query?: string;
    take: number;
    skip: number;
  }): Promise<{ data: User[]; count: number }> {
    let where: any;

    if (filter?.query) {
      where = [
        { firstName: Like(`%${filter.query}%`) },
        { lastName: Like(`%${filter.query}%`) },
        { email: Like(`%${filter.query}%`) },
      ];
    }

    const [result, total] = await this.userRepository.findAndCount({
      where,
      skip: filter?.skip,
      take: filter?.take,
    });

    return {
      data: result,
      count: total,
    };
  }

  async updateUser(
    id: number,
    data: Partial<{ firstName: string; lastName: string; email: string }>
  ): Promise<User | null> {
    await this.userRepository.update(id, data);
    return await this.userRepository.findOneBy({ id });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
