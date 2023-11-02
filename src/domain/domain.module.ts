import {Module} from '@nestjs/common'
import { UserService } from './service/user.service';
import { RepositoriesModule } from 'src/infraestructure/repositories/repositories.module';
import { CategoryService } from './service/category.service';
import { AccountService } from './service/account.service';
import { LedgerService } from './service/ledger.service';

@Module({
    imports:[RepositoriesModule],
    providers: [UserService,CategoryService,AccountService,LedgerService],
    exports:[UserService,CategoryService,AccountService,LedgerService]
})
export class DomainModule {

}