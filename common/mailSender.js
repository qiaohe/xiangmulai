/**
 * Created by Johnson on 2017-08-13.
 */
const config = require('../config');
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const transport = nodemailer.createTransport(smtpTransport(config.email.smtpConfig));

module.exports = {
    send: function (to, content) {
        transport.sendMail({
            from: config.email.templateOfCreateTeam.from,
            to: to,
            subject: config.email.templateOfCreateTeam.subject,
            html: content,
        }, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Message sent: " + response.message);
            }
            transport.close();
        });
    }
}
