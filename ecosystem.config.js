module.exports = {
  apps: [
    {
      name: 'jingzhi',
      script: './server.js',
      autorestart: true,
      watch: true,
      exec_mode: 'cluster',
      max_memory_restart: '4000M',
      instances: 1,
      node_args: '--max-http-header-size=10000',
      env: {
        NODE_ENV: 'production',
        PORT: 5003,
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        PLAY_GROUND_BASE_URL: process.env.PLAY_GROUND_BASE_URL
      }
    }
  ]
}
