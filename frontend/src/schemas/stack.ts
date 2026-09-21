import { z } from 'zod'

export const selectedStackSchema = z.array(z.object({ productId: z.string(), planId: z.string() }))
export type SelectedStackItem = z.infer<typeof selectedStackSchema>[number]
