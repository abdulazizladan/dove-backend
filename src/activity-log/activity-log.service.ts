import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity-log.entity';

@Injectable()
export class ActivityLogService {
    constructor(
        @InjectRepository(ActivityLog)
        private repo: Repository<ActivityLog>,
    ) { }

    log(userId: string, actionType: string, details?: string) {
        return this.repo.save(this.repo.create({ user_id: userId, action_type: actionType, details }));
    }

    findAll() {
        return this.repo.find({ order: { timestamp: 'DESC' } });
    }
}
