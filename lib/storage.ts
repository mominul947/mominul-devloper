import path from 'path'
import fs from 'fs'

const isVercel = !!process.env.VERCEL

/**
 * Returns a writable file path compatible with both local development and Vercel serverless.
 * On Vercel, files in /tmp are writable, seeded from the repository's data/ folder.
 */
export function getStorageFilePath(filename: string): string {
  if (isVercel) {
    const tmpDir = '/tmp'
    const tmpPath = path.join(tmpDir, filename)
    const seedPath = path.join(process.cwd(), 'data', filename)

    try {
      if (!fs.existsSync(tmpPath)) {
        if (fs.existsSync(seedPath)) {
          fs.copyFileSync(seedPath, tmpPath)
        } else {
          // create empty file in /tmp
          fs.writeFileSync(tmpPath, filename.endsWith('.json') ? '{}' : '', 'utf-8')
        }
      }
    } catch (e) {
      // In case copy fails, fallback to seedPath or tmpPath
      return tmpPath
    }

    return tmpPath
  }

  // Local development / VPS
  const localDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(localDir)) {
    try {
      fs.mkdirSync(localDir, { recursive: true })
    } catch (e) {}
  }
  return path.join(localDir, filename)
}

/**
 * Safe JSON reader that never crashes on corrupt or missing files.
 */
export function readJsonFileSafe<T>(filename: string, defaultValue: T): T {
  try {
    const filePath = getStorageFilePath(filename)
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')
      if (content && content.trim()) {
        return JSON.parse(content) as T
      }
    }
  } catch (err) {
    console.error(`Error reading ${filename}:`, err)
  }
  return defaultValue
}

/**
 * Safe JSON writer that never crashes the server.
 */
export function writeJsonFileSafe<T>(filename: string, data: T): boolean {
  try {
    const filePath = getStorageFilePath(filename)
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (err) {
    console.error(`Error writing ${filename}:`, err)
    return false
  }
}

