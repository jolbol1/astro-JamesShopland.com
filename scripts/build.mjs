import { spawnSync } from "node:child_process"
import process from "node:process"

const args = ["astro", "build"]
const env = { ...process.env }

// Use the remote Astro DB only when the remote URL is configured.
if (env.ASTRO_DB_REMOTE_URL) {
  args.push("--remote")
} else {
  env.ASTRO_DATABASE_FILE ??= ".astro/content.db"
}

const result = spawnSync("pnpm", args, {
  env,
  shell: process.platform === "win32",
  stdio: "inherit",
})

if (result.error) {
  throw result.error
}

process.exit(result.status ?? 1)
