import { AlertType, ClassType } from '@/models/class.model';
import { DeltaType } from '@tremor/react';

export interface IClass {
    id: string;
    owner: string;
    type: ClassType;
    name: string;
    startTime: Date;
    endTime: Date;
    alert: AlertType;
    link: string;
}

export interface Coordinates {
    x: number;
    y: number;
}

export interface Kpi {
    title: string;
    metric: string;
    progress: number;
    target: string;
    delta: string;
    deltaType: DeltaType;
}
