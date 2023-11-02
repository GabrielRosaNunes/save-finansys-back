import {Module} from '@nestjs/common'
import { UserService } from './service/user.service';
import { RepositoriesModule } from 'src/infraestructure/repositories/repositories.module';
import { CategoryService } from './service/category.service';
import { AccountService } from './service/account.service';

@Module({
    imports:[RepositoriesModule],
    providers: [UserService,CategoryService,AccountService],
    exports:[UserService,CategoryService,AccountService]
})
export class DomainModule {

}