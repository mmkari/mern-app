const dbUser = "user_123";
const dbPassword = "test123";
const dbName = "mern-app-db";

const MONGODB_URI = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.waldk.mongodb.net/${dbName}?retryWrites=true&w=majority`;

module.exports = MONGODB_URI;
