var brokerHost = process.env.BROKER_PATH ? process.env.BROKER_PATH : "tcp://127.0.0.1:3008";
var dbConn = process.env.DB_CONN ? process.env.DB_CONN : "mongodb://localhost:27017/sap";

var priorityIdValues={'critical':'1',
 'high':'2',
 'medium':'3',
 'low':'4'
};
var priorityIdValue = ['critical', 'high', 'medium', 'low'];

module.exports = {
  dbConn : dbConn,
  brokerHost : brokerHost,
  priorityIdValues : priorityIdValues,
  priorityIdValue : priorityIdValue
}