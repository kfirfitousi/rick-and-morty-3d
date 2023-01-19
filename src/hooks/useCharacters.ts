import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query'
import { useQuery } from '@tanstack/react-query'
import z from 'zod'

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
})

export type Character = z.infer<typeof CharacterSchema>

export const ResponseSchema = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }),
  results: z.array(CharacterSchema),
})

const getCharacters = async (page = 1) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
  const json = await res.json()
  return ResponseSchema.parse(json)
}

type QueryFnType = typeof getCharacters

type UseCharactersOptions = {
  page?: number
  config?: QueryConfig<QueryFnType>
}

export const useCharacters = ({ page, config }: UseCharactersOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['characters', page],
    queryFn: () => getCharacters(page),
    ...config,
  })
}
