"use strict";
var md5 = require('md5');
var redis = require('../common/redisClient');
var config = require('../config');
var crypto = require('crypto');
var mainDAO = require('../dao/mainDAO');
var i18n = require('../i18n/localeMessage');
var _ = require('lodash');
var jwt = require("jsonwebtoken");
var moment = require('moment');
var uuid = require('node-uuid');
module.exports = {
    register: function (req, res, next) {
        var user = req.body;
        redis.getAsync(user.mobile).then(function (reply) {
            if (!(reply && reply == user.certCode)) {
                throw new Error(i18n.get('sms.code.invalid'));
            }
            delete user.certCode;
            user.createDate = new Date();
            user.password = md5(req.body.password);
            user.nickName = user.nickName ? user.nickName : '手机' + user.mobile.substring(user.mobile.length - 4, user.mobile.length);
            user.bindingMobile = user.mobile;
            user.name = user.mobile;
            delete user.mobile;
        }).then(function () {
            return mainDAO.findUserByUserName(user.name);
        }).then(function (result) {
            if (result.length) throw new Error(i18n.get('user.mobile.exists'));
            return mainDAO.insertUser(user);
        }).then(function (result) {
            user.id = result.insertId;
            var token = jwt.sign(user, config.app.tokenSecret, {expiresInMinutes: config.app.tokenExpire});
            user.token = token;
            redis.set(token, JSON.stringify(user));
            res.send({ret: 0, data: user});
        }).catch(function (err) {
            res.send({ret: 0, message: err.message});
        });
        return next();
    },

    login: function (req, res, next) {
        var userName = (req.body && req.body.username) || (req.query && req.query.username);
        var password = (req.body && req.body.password) || (req.query && req.query.password);
        var user = {};
        var loginUsingCertCode = req.body.certCode;
        if (loginUsingCertCode) {
            redis.getAsync(req.body.username).then(function (reply) {
                if (!(reply && reply == req.body.certCode)) {
                    throw new Error(i18n.get('sms.code.invalid'));
                }
                return mainDAO.findUserByUserName(userName);
            }).then(function (users) {
                if (users.length < 1) {
                    user.createDate = new Date();
                    user.nickName = '手机' + req.body.username.substring(req.body.username.length - 4, req.body.username.length);
                    user.bindingMobile = req.body.username;
                    user.name = req.body.username;
                    mainDAO.insertUser(user).then(function (result) {
                        user.id = result.insertId;
                        var token = jwt.sign(user, config.app.tokenSecret, {expiresInMinutes: config.app.tokenExpire});
                        user.token = token;
                        redis.set(token, JSON.stringify(user));
                        return res.send({ret: 0, data: user});
                    })
                } else {
                    user = users[0];
                    var token = uuid.v4();
                    redis.set(token, JSON.stringify(user));
                    redis.expire(token, config.app.tokenExpire);
                    user.token = token;
                    delete user.password;
                    redis.getAsync(user.id + ':token').then(function (reply) {
                        redis.del(reply);
                        redis.set(user.id + ':token', token);
                    });
                    return res.send({ret: 0, data: user});
                }
            }).catch(function (err) {
                res.send({ret: 1, message: err.message});
            });
        } else {
            mainDAO.findUserByUserName(userName).then(function (users) {
                if (!users || !users.length) throw new Error(i18n.get('member.not.exists'));
                user = users[0];
                if (user.password != md5(password)) throw new Error(i18n.get('member.password.error'));
                var token = uuid.v4();
                redis.set(token, JSON.stringify(user));
                redis.expire(token, config.app.tokenExpire);
                user.token = token;
                delete user.password;
                redis.getAsync(user.id + ':token').then(function (reply) {
                    redis.del(reply);
                    redis.set(user.id + ':token', token);
                });
                res.send({ret: 0, data: user});
            }).catch(function (err) {
                res.send({ret: 1, message: err.message});
            });
        }
        return next();
    },

    logout: function (req, res, next) {
        var token = req.headers['token'];
        if (!token) return res.send(401, i18n.get('token.not.provided'));
        redis.delAsync(token).then(function () {
            redis.del(req.user.id + ':token');
            res.send({ret: 0, message: i18n.get('logout.success')});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    checkSignature: function (req, res, next) {
        res.end(req.query.echostr);
        return next();
    },
    wechatCallback: function (req, res, next) {
        return next();
    }


}
