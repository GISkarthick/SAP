/** load port , broker_host , broadcast_host , auth_url from the system env **/
var authPort = process.env.AUTH_PORT ? process.env.AUTH_PORT : 5000;
var brokerHost = process.env.BROKER_PATH ? process.env.BROKER_PATH : "tcp://127.0.0.1:3008";
var dbConn = process.env.DB_CONN ? process.env.DB_CONN : "mongodb://localhost:27017/sap";


module.exports = {
  authPort: authPort,
  brokerHost : brokerHost,
  dbConn : dbConn
}