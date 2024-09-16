// export const BASE_URL = typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_API_BASE_URL : undefined

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export const PLAY_GROUND_URL = process.env.PLAY_GROUND_BASE_URL

console.log('BASE_URL', BASE_URL)
console.log('PLAY_GROUND', PLAY_GROUND_URL)