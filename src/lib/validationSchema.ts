import { z } from 'zod';

const defaultRequireMessage = 'This field is required';

const baseClassSchema = z.object({
  title: z.string().nonempty(defaultRequireMessage),
  studentName: z.string().nonempty(defaultRequireMessage),
  classType: z.enum(["PRIVATE", "GROUP"]),
  startDate: z.date(),
  endDate: z.date(),
  alert: z.string(),
  link: z.string(),
})

type baseClassType = z.infer<typeof baseClassSchema>

export const newClassSchema = baseClassSchema.extend({
  ownerId: z.number()
})

export interface newClassType extends baseClassType {
  ownerId: number;
}

export const editClassSchema = baseClassSchema.extend({
  id: z.number(),
  ownerId: z.number(),
})

export interface editClassType extends baseClassType {
  id: number;
  ownerId: number;
}

export const pageSchema = z.object({
  owner: z.string(),
  title: z.string().nonempty(defaultRequireMessage),
})