import { ClassType } from '@/lib/validationSchema';

export const classDefaultValues: ClassType = {
    name: '',
    type: 'Group',
    startTime: new Date(),
    alert: '5 minutes',
    link: '',
    owner: '',
};
