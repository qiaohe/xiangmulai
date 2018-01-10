/**
 * Created by Johnson on 2017-12-19.
 */
const Promise = require('bluebird');
var db = require('./db');
var redisClient = require('./redisClient');
var md5 = require('md5');
module.exports = {
    createIndex: function (tableName, fields) {
        db.query('select ' + fields.join(',') + ' ,id from ' + tableName).then(function (rows) {
            rows.forEach(function (row) {
                fields.forEach(function (f) {
                    for (var i = 0; i < row[f].length; i++) {
                        console.log(tableName + ':' + f + ':' + row[f][i]);
                        redisClient.sadd([md5(tableName + ':' + f + ':' + row[f][i]), row.id.toString()]);
                    }
                });
            })
        });
    },

    search: function (tableName, field, keywords, callback) {
        var p = [];
        for (var i = 0; i < keywords.length; i++) {
            p.push(md5(tableName + ':' + field + ':' + keywords[i]));
        }
        return redisClient.sinterAsync(p.length < 2 ? p[0] : p).then(function (reply) {
            return db.query('select * from ' + tableName + ' where id in(' + reply.join(',') + ')');
        })
    }
}