import { z } from 'zod';

const defaultRequireMessage = 'This field is required';
export const newClassSchema = z.object({
    owner: z.string(),
    name: z.string().nonempty(defaultRequireMessage),
    type: z.string().nonempty(defaultRequireMessage),
    startTime: z.date(),
    endTime: z.date(),
    alert: z.string(),
    link: z.string(),
});

export const editClassSchema = z.object({
    owner: z.string(),
    id: z.string(),
    name: z.string().nonempty(defaultRequireMessage),
    type: z.string().nonempty(defaultRequireMessage),
    startTime: z.date(),
    endTime: z.date(),
    alert: z.string(),
    link: z.string(),
});

export const pageSchema = z.object({
    owner: z.string(),
    title: z.string().nonempty(defaultRequireMessage),
})

export type ClassType = z.infer<typeof newClassSchema>;
