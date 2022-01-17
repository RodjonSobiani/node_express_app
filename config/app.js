module.exports = {
    appPort: process.env.PORT || 5000,
    mongoUriLocal: `mongodb://localhost:27017/myapi`,
    mongoUriAtlas: `mongodb+srv://admin:admin@myapi.lbafg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    jwtSecret: '2pk6L-JKB5N-gVX88-xpDxO-JIRRW-L5IuW',
}