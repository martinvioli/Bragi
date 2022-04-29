module.exports = {
    secret: process.env.AUTH_SECRET || "bragi2022",
    expires: process.env.AUTH_EXPIRES || "24h",
    rounds: process.env.AUTH_ROUNDS || 10
}