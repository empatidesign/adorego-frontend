module.exports = {
  apps: [
    {
      name: 'adorego-frontend',
      script: 'npm',
      args: 'run start',
      cwd: '/var/www/adorego/frontend',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/var/www/adorego/logs/frontend-error.log',
      out_file: '/var/www/adorego/logs/frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s'
    }
  ]
};
