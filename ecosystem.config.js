// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'avitron-backend',
      cwd: './backend',
      script: 'server.cjs',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 8080
      }
    },
    {
      name: 'avitron-frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'run preview -- --host --port 3000',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};