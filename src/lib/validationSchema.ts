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

export type ClassType = z.infer<typeof newClassSchema>;
