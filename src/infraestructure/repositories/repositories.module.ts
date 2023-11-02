import {Module} from '@nestjs/common'
import { UserRepo } from './user.repository';
import { PrismaService } from '../config/prisma.service';
import { CategoryRepo } from './category.repository';
import { AccountRepo } from './account.repository';
import { LedgerRepo } from './ledger.repository';

@Module({
    imports:[],
    providers: [PrismaService,UserRepo,CategoryRepo,AccountRepo,LedgerRepo],
    exports:[UserRepo,CategoryRepo,AccountRepo,LedgerRepo]
})
export class RepositoriesModule {}