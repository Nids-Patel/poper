module.exports = app => {
    try {
    
        app.get('/', (req, res) => {
            res.send("Welcome to " + process.env.PROJECT_NAME)
        });

        // Require Users routes
        app.use("/" + process.env.API_VERSION_v1 + "/users", require('./users'));

        // Require Roles routes
        app.use("/" + process.env.API_VERSION_v1 + "/roles", require('./roles'));

        // Require User Address routes
        app.use("/" + process.env.API_VERSION_v1 + "/useradd", require('./useradd'));

        // Require User Detail routes
        app.use("/" + process.env.API_VERSION_v1 + "/userdetail", require('./userdetail'));

    } catch (error) {
        console.log('error: ',error);
    }
}