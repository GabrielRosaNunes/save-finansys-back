import {Module} from '@nestjs/common'
import { UserRepo } from './user.repository';
import { PrismaService } from '../config/prisma.service';
import { CategoryRepo } from './category.repository';
import { AccountRepo } from './account.repository';

@Module({
    imports:[],
    providers: [PrismaService,UserRepo,CategoryRepo,AccountRepo],
    exports:[UserRepo,CategoryRepo,AccountRepo]
})
export class RepositoriesModule {}