
/** load port , broker_host , broadcast_host , auth_url from the system env **/
var port = process.env.API_PORT ? process.env.API_PORT : 3000;
var brokerHost = process.env.BROKER_PATH ? process.env.BROKER_PATH : "tcp://127.0.0.1:3008";
var broadcastHost = process.env.BROADCAST_PATH ? process.env.BROADCAST_PATH : "tcp://*:3008";
var authUrl = process.env.AUTH_PATH ? process.env.AUTH_PATH : "http://localhost:5000";

module.exports = {
  port: port,
  brokerHost : brokerHost,
  broadcastHost : broadcastHost,
  authUrl : authUrl,
  authority : 'https://login.microsoftonline.com/perkinswillinc.onmicrosoft.com',
  audience : '89cc2010-f9d1-44e0-9c84-14931e666173'
}
