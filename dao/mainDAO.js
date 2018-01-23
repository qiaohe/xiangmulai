/**
 * Created by Johnson on 2017-07-13.
 */
"use strict";
var db = require('../common/db');
var sqlMapping = require('./sqlMapping');
var _ = require('lodash');

module.exports = {
    insertProject: function (project) {
        return db.query(sqlMapping.project.insert, project);
    },
    findWeChatUserByOpenId: function (openid) {
        return db.query(sqlMapping.user.findByOpenId, openid);
    },
    findLikersForProjects: function (uid, page) {
        return db.query(sqlMapping.project.findLikersByUid, [uid, +page.from, +page.size]);
    },
    findLikersForProjectsBy: function (idList, page, conditions) {
        var sql = sqlMapping.project.findLikersForProjectsBy;
        if (idList.length > 1) sql += ' pid in (' + idList.join(',') + ')';
        if (idList.length == 1) sql += ' pid = ' + idList;
        if (conditions.length > 0) {
            sql = sql + ' and ' + conditions.join(' and ')
        }
        sql = sql + ' limit ?,?';
        return db.query(sql, [+page.from, +page.size]);
    },

    findUsersByIds: function (idList) {
        var sql = sqlMapping.user.findByIds.replace(/\?/g, idList);
        return db.query(sql);
    },

    findUserById: function (uid) {
        return db.query(sqlMapping.user.findById, uid);
    },
    updateUser: function (user) {
        return db.query(sqlMapping.user.update, [user, user.id]);
    },
    updateUserByName: function (user) {
        return db.query(sqlMapping.user.updateByName, [user, user.name]);
    },

    findUserByUserName: function (userName) {
        return db.query(sqlMapping.user.findByName, userName);
    },
    insertUser: function (user) {
        return db.query(sqlMapping.user.insert, user);
    },
    findProjectCategories: function (page) {
        return db.query(sqlMapping.project.findCategories, [+page.from, +page.size]);
    },
    findTags: function (page) {
        return db.query(sqlMapping.project.findTags, [+page.from, +page.size]);
    },
    findMusicLib: function (keywords) {
        var sql = sqlMapping.project.findMusicLib;
        if (keywords) {
            sql = sql + ' where name like \'%' + keywords + '%\'';
        }
        return db.query(sql);
    },
    insertTeamMember: function (m) {
        return db.query(sqlMapping.project.insertTeamMember, m);
    },
    insertPageSetting: function (setting) {
        return db.query(sqlMapping.project.insertPageSetting, setting);

    },
    updatePageSetting: function (setting) {
        return db.query(sqlMapping.project.updatePageSetting, [setting, setting.id]);
    },
    insertBusinessInfo: function (bi) {
        return db.query(sqlMapping.project.insertBusinessInfo, bi);
    },
    deleteBusinessInfo: function (id) {
        return db.query(sqlMapping.project.deleteBusinessInfo, [id]);
    },
    deleteTeamStrength: function (id) {
        return db.query(sqlMapping.project.deleteTeamStrength, [id]);
    },
    updateTeamStrength: function (ts) {
        return db.query(sqlMapping.project.updateTeamStrength, [ts, ts.id]);
    },
    updateBusinessInfo: function (bi) {
        return db.query(sqlMapping.project.updateBusinessInfo, [bi, bi.id]);
    },
    insertTeamStrength: function (ts) {
        return db.query(sqlMapping.project.insertTeamStrength, [ts]);
    },
    updateTeamMember: function (m) {
        return db.query(sqlMapping.project.updateTeamMember, [m, m.id]);
    },
    deleteTeamMember: function (id) {
        return db.query(sqlMapping.project.deleteTeamMember, id);
    },
    updateProject: function (p) {
        return db.query(sqlMapping.project.update, [p, p.id]);
    },
    updateByDescField: function (tableName, p, updateField, value) {
        return db.query('update ' + tableName + ' set ' + updateField + '=' + updateField + '+' + value + ' where id =' + p.id);
    },

    deleteProject: function (id) {
        return db.query(sqlMapping.project.delete, id);
    },
    findMyProjects: function (creator, page) {
        return db.query(sqlMapping.project.findByCreator, [creator, page.from, page.size]);
    },
    findProjectLikersBy: function (pid, uid) {
        return db.query(sqlMapping.project.findLikersBy, [pid, uid]);
    },
    findProjectNewsLikersBy: function (pid, newsId, uid) {
        return db.query(sqlMapping.project.findNewsLikersBy, [pid, newsId, uid]);
    },

    findTeamStrengths: function (pid) {
        return db.query(sqlMapping.project.findTeamStrengths, pid);
    },

    addProjectLiker: function (liker) {
        return db.query(sqlMapping.project.addLiker, liker);
    },
    deleteProjectLiker: function (pid, uid) {
        return db.query(sqlMapping.project.deleteLiker, [uid, pid]);
    },
    deleteProjectNewsLiker: function (pid, newsId, uid) {
        return db.query(sqlMapping.project.deleteNewsLiker, [uid, pid, newsId]);
    },
    addProjectNewsLiker: function (liker) {
        return db.query(sqlMapping.project.addNewsLiker, liker);
    },
    addComment: function (comment) {
        return db.query(sqlMapping.project.addComment, comment);
    },
    addProjectNewsComment: function (comment) {
        return db.query(sqlMapping.project.addNewsComment, comment);
    },
    findProjects: function (page) {
        return db.query(sqlMapping.project.find, [+page.from, +page.size]);
    },
    findProjectLikers: function (pid) {
        return db.query(sqlMapping.project.findLikers, pid);
    },
    findCommentProjectBy: function (uid) {
        return db.query(sqlMapping.project.findCommentProjectBy, uid);
    },
    findProjectsBy: function (uid) {
        return db.query(sqlMapping.project.findByUid, uid);
    },
    findLikeredProjesctsBy: function (uid) {
        return db.query(sqlMapping.project.findLikeredProjesctsBy, uid);
    },
    findProjectComments: function (pid, page) {
        return db.query(sqlMapping.project.findComments, [pid, +page.from, +page.size]);
    },
    findProject: function (pid) {
        return db.query(sqlMapping.project.findById, pid);
        //select id, `name`, image, position, email,createDate, `desc`,`group`, headPic, sortIndex FROM projectMemberInfo where pid = ? order by sortIndex
    },
    findProjectMemberInfo: function (pid) {
        return db.query(sqlMapping.project.findMemberInfo, pid);
    },
    findProjectBusinessInfo: function (pid) {
        return db.query(sqlMapping.project.findBusinessInfo, pid);
    },
    insertProjectComplaint: function (complaint) {
        return db.query(sqlMapping.project.insertComplaint, complaint);
    },
    insertPrivateMessage: function (m) {
        return db.query(sqlMapping.project.insertPrivateMessage, m);
    },
    updateGroupName: function (projectId, tableName, group, newGroup) {
        var sql = 'update ' + tableName + ' set `group` =\'' + newGroup + '\' where pid=' + projectId + ' and `group` = \'' + group + '\'';
        return db.query(sql);
    },
    deleteGroup: function (projectId, tableName, group) {
        var sql = 'delete from ' + tableName + ' where pid=' + projectId + ' and `group` = \'' + group + '\'';
        return db.query(sql);
    },
    addProjectNews: function (news) {
        return db.query(sqlMapping.project.addNews, news);
    },
    deleteProjectNews: function (id, newsId) {
        return db.query(sqlMapping.project.deleteNews, [id, newsId]);
    },
    deleteProjectComment: function (pid, id) {
        return db.query(sqlMapping.project.deleteComment, [pid, id]);
    },
    deleteProjectNewsComment: function (id, newsId, commentId) {
        return db.query(sqlMapping.project.deleteNewsComment, [id, newsId, commentId]);
    },
    updateProjectNews: function (news) {
        return db.query(sqlMapping.project.updateNews, [news, news.id]);
    },
    findProjectNews: function (pid) {
        return db.query(sqlMapping.project.findNews, pid);
    },
    findProjectNewsComments: function (pid, newsId) {
        return db.query(sqlMapping.project.findNewsComments, [pid, newsId]);
    },
    findProjectNewsLikers: function (pid, newsId) {
        return db.query(sqlMapping.project.findNewsLikers, [pid, newsId]);
    },
    findPageSettingForProject: function (pid) {
        return db.query(sqlMapping.project.findPageSetting, pid);
    }
}
