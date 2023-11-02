import {Module} from '@nestjs/common'
import { UserService } from './service/user.service';
import { RepositoriesModule } from 'src/infraestructure/repositories/repositories.module';
import { CategoryService } from './service/category.service';

@Module({
    imports:[RepositoriesModule],
    providers: [UserService,CategoryService],
    exports:[UserService,CategoryService]
})
export class DomainModule {

}