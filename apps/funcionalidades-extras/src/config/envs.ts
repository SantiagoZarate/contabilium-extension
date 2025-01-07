import { z } from 'zod';

const envsSchema = z.object({
  API_SECRET: z.string(),
});

export default envsSchema.parse({
  API_SECRET: import.meta.env.WXT_API_SECRET,
});
