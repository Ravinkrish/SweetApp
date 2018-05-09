var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    chalk = require('chalk'),
    env = process.env.NODE_ENV || 'development';
dbHost=process.env.DB_HOST_NAME,
    dbPort=process.env.DB_PORT

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'SWEETPROJECT'
        },
        port: 5160,
        db: 'mongodb://localhost/sweetproject'
    }
};

module.exports = config['development'];
logConfiguration();

function logConfiguration(){

    console.log(chalk.styles.green.open+chalk.styles.green.close );
    console.log("\n\n ---------------------Configuration in Use --------------------------")
//    console.log(chalk.styles.blue.open);
    console.log(config['development'])


}

