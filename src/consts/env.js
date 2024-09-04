const env = process.env.NODE_ENV
export const BASE_URL = env === 'development' ? `https://jzapi.ctoee.com` : 'http://47.93.21.166:8000/mapi'
// export const BASE_URL = 'http://47.93.21.166:8000/mapi'