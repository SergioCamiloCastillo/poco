module.exports = {
  jwtSecret: process.env.JWT_SECRET || '22d6e0ba-9328-46d5-ac79-8f019b85967b',
  jwt: {
    expiresIn: "1d",
  }
};