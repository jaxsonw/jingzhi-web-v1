module.exports = {
  apps: [
    {
      name: `jingzhi`,
      script: './server.js',
      autorestart: true,
      watch: true,
      exec_mode: 'cluster',
      max_memory_restart: '4000M',
      instances: 2,
      node_args: '--max-http-header-size=2400',
      PORT: 5002
    }
  ]
}
