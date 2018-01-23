'use strict';

module.exports = {
    server: {
        name: 'Xiang Mu Lai Server restful api',
        version: '0.0.1',
        host: '0.0.0.0',
        domain: 'www.xiangmulai.com',
        port: 3003
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
    wechat: {
        token: 'xianglulaitoken',
        appid: 'wx30f7e12d7d31f35b',
        expire_seconds_qrCode:315360000,
        appsecret: '51d58a80a361cfcba755c9eeeed9906e',
        getSignatureUrl: "jsapi_ticket=JSAPI_TICKET&noncestr=xiangmulai2018&timestamp=TIMESTAMP&url=http://www.xiangmulai.com/",
        accessTokenUrl: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET',
        createMenu: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN',
        getJsApiToken: "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi",
        getUserInfo: 'https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN',
        createQrCode: 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=TOKEN',
        ticketUrl: 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=TOKEN&type=jsapi',
        bindPhoneNumberPage: 'http://angelguider.hisforce.cn/pages/bindPhoneNumber/bindPhoneNumber.html',
        authorizeUrlTemplate: "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx30f7e12d7d31f35b&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect",
        accessTokenUrlTemplateByPage: "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx30f7e12d7d31f35b&secret=51d58a80a361cfcba755c9eeeed9906e&code=CODE&grant_type=authorization_code",
        noncestr: 'xiangmulai2018',
        downloadUrl: "http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=ACCESS_TOKEN&media_id=MEDIA_ID",
        getRefreshTokenUrl: "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=wx30f7e12d7d31f35b&grant_type=refresh_token&refresh_token=REFRESH_TOKEN",
        getAccessTokenUrl: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx30f7e12d7d31f35b&secret=51d58a80a361cfcba755c9eeeed9906e",
    },
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
};

