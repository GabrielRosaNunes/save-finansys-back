import { Ledger } from "../entity/ledger.entity";

export interface LedgerRepository {
    find(ledgerId: string) :Promise<Ledger>
    getAllByAccount(accountId: string): Promise<Ledger[]>
    insert(ledger: Ledger): Promise<void>
    update(ledgerId:string,ledger: Ledger): Promise<void>
    delete(ledgerId:string): Promise<void>
}