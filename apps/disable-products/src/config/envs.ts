import { z } from 'zod';

const envsSchema = z.object({
  API_SECRET: z.string(),
  API_ID: z.string(),
  API_URL: z.string()
});

export default envsSchema.parse({
  API_SECRET: import.meta.env.WXT_CONTABILIUM_API_SECRET,
  API_ID: import.meta.env.WXT_CONTABILIUM_API_ID,
  API_URL: import.meta.env.WXT_CONTABILIUM_API_BASE_URL,
});
