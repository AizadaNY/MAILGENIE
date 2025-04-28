import { z } from 'zod';

export const AddDomainSchema = z.object({
    domain: z.string().min(3,{ message: "Domain must be at least 3 characters long" }),
    description: z.string().optional(),
    icon: z.any().optional(),
  });

  export type AddDomainType = z.infer<typeof AddDomainSchema>;

  