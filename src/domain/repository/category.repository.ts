import { Category } from "../entity/category.entity"


export interface CategoryRepository {
    find(id: string): Promise<Category>
    listByUser(userId:string): Promise<Category[]>
    insert(category: Category): Promise<void>
    update(id:string,category: Category): Promise<void>
    delete(id:string): Promise<void>
}