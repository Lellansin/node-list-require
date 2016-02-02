var fs = require('fs');

var data = 'function createDbConnection(n,e){if(!n)return null;e=e||{};var r=new Client;r.connect(n);var o={};return r.on("connect",function(){logger.log("db connected"),o={};for(var n in e)o[n]=r.prepare(e[n])}).on("error",function(e){logger.log("db error: "+e),o={},setTimeout(function(){logger.log("db reconnect"),r.connect(n)},5e3)}).on("close",function(n){o={},logger.log("db closed,hadError:"+n)}),{query:function(){return r.query.apply(r,arguments)},db:r,sql_prepared:o,begin:function(n){return r.query("start transaction").on("error",function(){n&&n({ret:-1})}).on("end",function(){n&&n({ret:0})}),this},commit:function(n){return r.query("commit").on("error",function(){n&&n({ret:-1})}).on("end",function(){n&&n({ret:0})}),this},rollback:function(n){return r.query("rollback").on("error",function(){n&&n({ret:-1})}).on("end",function(){n&&n({ret:0})}),this},end:function(){r.end()}}}function createDBPool(n,e,r,o){function t(n){i.length>r?(c--,n.db.end()):i.push(n)}var i=[],c=0;return{startTransaction:function(r){var a=i.shift();if(!a){if(c>=o){var u=this;return void process.nextTick(function(){u.startTransaction(r)})}a=createDbConnection(n,e)}a.begin();var l=a.db.query,s=a.db,f={query:function(){return a?l.apply(s,arguments):null},sql_prepared:a.sql_prepared,commitTransaction:function(n){return a?(g&&clearTimeout(g)&&(g=null),a.commit(n),t(a),void(a=null)):n&&n({ret:-1})},rollbackTransaction:function(n){a&&(g&&clearTimeout(g)&&(g=null),a.rollback(n),t(a),a=null)}},g=setTimeout(function(){f.rollbackTransaction()},3e4);r&&r(f)}}}function initDatabase(n,e){function r(n,e){logger.log(n,e)}function o(n,o){logger.log(n,o),fs.readFile(e,function(n,e){n||(e=e.toString(),a.query(e).on("end",r).on("error",r))})}function t(n){n&&console.error(n),a.query("use "+c).on("end",o).on("error",o)}console.log("initing database....");var i=copy(n),c=i.db;delete i.db,i.multiStatements=!0;var a=createDbConnection(i,{});a.query("create database if not exists "+c).on("end",t).on("error",t)}function parseToSQLTime(n){function e(n){return 10>n?"0"+n:n}var r=new Date(n);return r.getFullYear()+"-"+e(r.getMonth()+1)+"-"+e(r.getDate())+" "+e(r.getHours())+":"+e(r.getMinutes())+":"+e(r.getSeconds())}var logger=console,Client=require("mariasql"),fs=require("fs"),copy=require("app/util/utils").deepClone;exports.createDbConnection=createDbConnection,exports.createDBPool=createDBPool,exports.initDatabase=initDatabase,exports.parseToSQLTime=parseToSQLTime;';

var requires = data.match(/require\([\'\"][^\'\"]+[\'\"]\)/g);

var list = requires.map(function (value) {
	return value.replace(/require\([\'\"]([^\'\"]+)[\'\"]\)/, function (_, v) {
		return v;
	});
});

console.log('list', list);

console.log(require.main.paths);


exports.get = function (fpath) {
	var results = [];
	var content = fs.readFileSync(fpath);
	var requires = content.match(/require\([\'\"][^\'\"]+[\'\"]\)/g);
};