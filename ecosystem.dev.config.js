module.exports = {
    apps: [
      {
        name: 'avitron-backend-dev',
        cwd: './backend',
        script: 'npm',
        args: 'run dev',
        watch: ['server.js', 'server/**/*.js'],
        ignore_watch: ['node_modules', 'logs'],
        env: {
          NODE_ENV: 'development',
          PORT: 8080
        },
        autorestart: true,
        max_memory_restart: '500M',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
      },
      {
        name: 'avitron-frontend-dev',
        cwd: './frontend',
        script: 'npm',
        args: 'run dev -- --port 3000 --host',
        watch: false, // Vite já tem hot reload
        env: {
          NODE_ENV: 'development'
        },
        autorestart: true,
        max_memory_restart: '500M',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
      }
    ]
  };