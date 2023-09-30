import { DeltaType } from '@tremor/react';

export type ClassType = "GROUP" | "PRIVATE"

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

export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export interface Slot {
    start: number,
    end: number
}
