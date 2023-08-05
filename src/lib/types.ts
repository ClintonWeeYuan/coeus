import { AlertType, ClassType } from '@/models/class.model';

export interface IClass {
    id: string;
    owner: string;
    type: ClassType;
    name: string;
    startTime: Date;
    alert: AlertType;
    link: string;
}
