interface ITime {
    display: string;
    hours: number;
    minutes: number;
}

const TIMELIST: string[] = [
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '15:00',
];

export const TIMES: ITime[] = TIMELIST.map((time) => ({
    display: time,
    hours: parseInt(time.split(':')[0]),
    minutes: parseInt(time.split(':')[1]),
}));
