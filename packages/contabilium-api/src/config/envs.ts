import { z } from 'zod'
import { config } from 'dotenv'
config()

const envsSchema = z.object({
  CONTABILIUM_API_ID: z.string().email(),
  CONTABILIUM_API_SECRET: z.string(),
  CONTABILIUM_API_BASE_URL: z.string().url()
})

export default envsSchema.parse({
  CONTABILIUM_API_ID: process.env.CONTABILIUM_API_ID,
  CONTABILIUM_API_SECRET: process.env.CONTABILIUM_API_SECRET,
  CONTABILIUM_API_BASE_URL: process.env.CONTABILIUM_API_BASE_URL,
})