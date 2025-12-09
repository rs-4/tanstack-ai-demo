import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

// Deployment target: 'cloudflare' or 'bun' (default)
const isCloudflare = process.env.DEPLOY_TARGET === 'cloudflare'

// Nitro preset based on deployment target
const nitroPreset = isCloudflare ? 'cloudflare-pages' : 'bun'

const config = defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    viteReact(),
  ],
  optimizeDeps: {
    exclude: ['postgres', 'drizzle-orm'],
  },
})

export default config
