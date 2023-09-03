import { newClassType } from '@/lib/validationSchema';

const getDateRoundedToNearestHour = () => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    return now;
};
export const classDefaultValues: newClassType = {
    title: '',
    classType: "GROUP",
    studentName: "",
    startDate: getDateRoundedToNearestHour(),
    endDate: getDateRoundedToNearestHour(),
    alert: '5 minutes',
    link: '',
    ownerId: 0,
};
