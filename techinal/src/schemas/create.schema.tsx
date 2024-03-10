import { z } from "zod";

export const VacationCreateSchema = z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    location: z.string(),
    participants: z.array(z.string()),
})

export type Vacation = z.infer<typeof VacationCreateSchema> & {
    id: string;
  };