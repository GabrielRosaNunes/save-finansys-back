import {Module} from '@nestjs/common'
import { UserRepo } from './user.repository';
import { PrismaService } from '../config/prisma.service';
import { CategoryRepo } from './category.repository';

@Module({
    imports:[],
    providers: [PrismaService,UserRepo,CategoryRepo],
    exports:[UserRepo,CategoryRepo]
})
export class RepositoriesModule {}