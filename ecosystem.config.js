module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'ssr-portal-prod',
      script: './build/main.js',
      exec_mode: 'cluster',
      source_map_support: true,
      env: {
        NODE_ENV: 'development',
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'ydmap',
      host: '120.24.233.178',
      ref: 'origin/master',
      repo: 'git@git.vipwindows.com:ydmap/ydmap-ssr-portal-pages.git',
      // ssh_options:'',
      // "pre-setup" : "apt-get install git",
      // "post-setup": "ls -la",
      // "pre-deploy-local" : "echo 'This is a local executed command'"
      path: '/var/www/production',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
      // "env"  : {
      // }
    // },
    // dev: {
    //   user: 'node',
    //   host: '212.83.163.1',
    //   ref: 'origin/master',
    //   repo: 'git@github.com:repo.git',
    //   path: '/var/www/development',
    //   'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env dev',
    //   env: {
    //     NODE_ENV: 'development'
    //   }
    }
  }
}
