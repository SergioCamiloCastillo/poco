module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'food'),
        username: env('DATABASE_USERNAME', 'sergio'),
        password: env('DATABASE_PASSWORD', 'sergio'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
