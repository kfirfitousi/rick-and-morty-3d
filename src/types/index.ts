import z from 'zod';

const CharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  status: z.string(),
  species: z.string(),
  gender: z.string(),
  origin: z.object({
    name: z.string(),
  }),
});

export type Character = z.infer<typeof CharacterSchema>;

export const ResponseSchema = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }),
  results: z.array(CharacterSchema),
});
