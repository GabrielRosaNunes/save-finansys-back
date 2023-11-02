import { Account } from "../entity/account.entity";

export interface AccountRepository {
    find(id: string): Promise<Account>
    getAllByUser(userId: string): Promise<Account[]>
    insert(account: Account): Promise<void>
    update(id: string,account: Account): Promise<void>
    delete(id: string): Promise<void>
}