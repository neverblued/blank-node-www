var server = require('./server'),
//	passport = require('passport'),
	get = require('./get'),
	act = require('./act'),
	route = require('./route');

//server.get('*', act('security.online'));
//server.post('/login', act('security.login'), route.redirectBack);
//server.get('/logout', act('security.logout'), route.redirectBack);

server.get('/', route.page('index'));

/* Example:
	
	server.get('/thing/:thing', get.thing, route.page('thing'));
	server.post('/thing.record', act('thing.record'), route.ok);
	server.post('/thing.delete', get.thing, act('thing.delete'), route.ok);

 */

server.use(route.undefined);
server.use(route.error);
