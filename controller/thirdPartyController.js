"use strict";
var config = require('../config');
var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var _ = require('lodash');
var redis = require('../common/redisClient');
var i18n = require('../i18n/localeMessage');
var qiniu = require('qiniu');
var util = require('util');
var moment = require('moment');
module.exports = {
    sendSMS: function (req, res, next) {
        var smsConfig = config.sms;
        var code = '11111';//_.random(10000, 99999);
        var content = smsConfig.template.replace(':code', code);
        var option = {mobile: req.params.mobile, text: content, apikey: config.sms.apikey};
        request.postAsync({url: smsConfig.providerUrl, form: option}).then(function (response, body) {
            console.log(response);
        }).then(function () {
            return redis.set(option.mobile, code);
        }).then(function () {
            return redis.expireAsync(option.mobile, smsConfig.expireTime);
        }).then(function (reply) {
            res.send({ret: 0, message: i18n.get('sms.send.success')});
        });
        return next();
    },

    getQiniuToken: function (req, res, next) {
        qiniu.conf.ACCESS_KEY = '2o5fzSm6cGtcODHKrIa7v6sHt4qsyPWD6zbr9l_6';
        qiniu.conf.SECRET_KEY = 'uc7X1HM4pdN0vUsKFy3g8gw91LuFMlDd2A_qp4mP';
        var bucket = 'xiangmulai';
        var putPolicy = new qiniu.rs.PutPolicy(bucket);
        putPolicy.expires = 3600;
        res.send({
            ret: 0,
            data: {token: putPolicy.token()}
        });
        return next();
    }
}