import { z } from "zod";

export const ParticipantSchema = z.object({
  name: z.string(),
});

export const VacationCreateSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  participants: z.array(ParticipantSchema),
});

export type Participant = z.infer<typeof ParticipantSchema>;
export type Vacation = z.infer<typeof VacationCreateSchema>;
