'use strict';

module.exports = {
    server: {
        name: 'Xiang Mu Lai Server restful api',
        version: '0.0.1',
        host: '0.0.0.0',
        port: 3000
    },
    db: {
        host: '106.14.4.47',
        port: '3306',
        user: 'root',
        password: 'Heqiao75518?',
        debug: false,
        multipleStatements: true,
        dateStrings: true,
        database: 'xiangmulaiDB',
        charset: 'UTF8MB4_GENERAL_CI'
    },
    app: {
        locale: 'zh_CN',
        tokenSecret: '1~a',
        tokenExpire: 86400000,
        dateStrings: 'true'
    },
    sms: {
        providerUrl: 'https://sms.yunpian.com/v1/sms/send.json',
        template: '【项目来】您的短信验证码是:code,在30分钟内输入有效。如非本人操作，请忽略此短信。',
        expireTime: 1800000,
        apikey: '4bcdc43e035f37eb7d9b6b831f57ad99'
    },
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
};

