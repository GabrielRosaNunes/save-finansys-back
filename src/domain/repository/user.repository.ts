import { User } from "../entity/user.entity";

export interface UserRepository {
    getAll(): Promise<User[]>
    find(userId: string): Promise<User>
}