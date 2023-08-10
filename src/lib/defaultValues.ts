import { ClassType } from '@/lib/validationSchema';

const getDateRoundedToNearestHour = () => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    return now;
};
export const classDefaultValues: ClassType = {
    name: '',
    type: 'Group',
    startTime: getDateRoundedToNearestHour(),
    endTime: getDateRoundedToNearestHour(),
    alert: '5 minutes',
    link: '',
    owner: '',
};
