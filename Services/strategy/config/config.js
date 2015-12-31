var brokerHost = process.env.BROKER_PATH ? process.env.BROKER_PATH : "tcp://127.0.0.1:3008";
var dbConn = process.env.DB_CONN ? process.env.DB_CONN : "mongodb://localhost:27017/sap";


module.exports = {
  dbConn : dbConn,
  brokerHost : brokerHost
}