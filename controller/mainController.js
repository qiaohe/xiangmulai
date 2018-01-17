"use strict";
const config = require('../config');
const _ = require('lodash');
const redis = require('../common/redisClient');
const mainDAO = require('../dao/mainDAO');
const moment = require('moment');
const Promise = require('bluebird');
const i18n = require('../i18n/localeMessage');
const md5 = require('md5');
function translateDate(array) {
    var data = _.groupBy(array, 'group');
    var result = [];
    for (var key in data) {
        result.push({
            group: key,
            type: data[key][0].hasOwnProperty('type') ? data[key][0].type : null,
            data: _.map(data[key], function (item) {
                delete item.group;
                return item;
            })
        })
    }
    return result;
}
function createTree(node, categories) {
    var items = _.filter(categories, function (item) {
        return item.pid == (node == null ? -1 : node.id);
    });
    if (items.length < 1) return;
    items && items.length && items.forEach(function (e) {
        delete e.pid;
        return createTree(e, categories);
    });
    if (node) node.children = items;
    return items;
}
module.exports = {
    getProjectCategories: function (req, res, next) {
        mainDAO.findProjectCategories({
            from: req.query.from,
            size: req.query.size
        }).then(function (categories) {
            res.send({ret: 0, data: createTree(null, categories)});
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    getTags: function (req, res, next) {
        mainDAO.findTags({
            from: req.query.from,
            size: req.query.size
        }).then(function (tags) {
            res.send({ret: 0, data: tags});
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    getMusicLib: function (req, res, next) {
        mainDAO.findMusicLib(req.query.keywords).then(function (songs) {
            var data = _.chain(songs).groupBy('category').map(function (value, key) {
                return {'category:': {name: key, count: value.length}, data: value};
            }).value();
            res.send({ret: 0, data: data});
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },

    addProject: function (req, res, next) {
        var p = _.assign(req.body, {
            createDate: new Date(),
            creator: req.user.id,
            creatorNickName: req.user.nickName,
            creatorHeadPic: req.user.headPic
        });
        if (p.tags && _.isArray(p.tags)) p.tags = p.tags.join(',');
        mainDAO.insertProject(p).then(function (result) {
            p.id = result.insertId;
            if (p.tags) p.tags = p.tags.split(',');
            res.send({ret: 0, data: p})
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },

    updateProject: function (req, res, next) {
        var p = req.body;
        if (p.tags && _.isArray(p.tags)) p.tags = p.tags.join(',');
        mainDAO.updateProject(p).then(function (result) {
            res.send({ret: 0, message: '修改项目信息成功。'})
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    removeProject: function (req, res, next) {
        mainDAO.deleteProject(+req.params.id).then(function (result) {
            res.send({ret: 0, message: '删除项目信息成功。'})
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    addTeamMemberForProject: function (req, res, next) {
        var pid = req.params.id;
        var m = _.assign(req.body, {createDate: new Date(), pid: pid, creator: req.user.id});
        mainDAO.insertTeamMember(m).then(function (result) {
            m.id = result.insertId;
            res.send({ret: 0, data: m});
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },

    updateTeamMemberForProject: function (req, res, next) {
        mainDAO.updateTeamMember(req.body).then(function (result) {
            res.send({ret: 0, message: '修改团队成员成功。'})
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    removeTeamMemberForProject: function (req, res, next) {
        mainDAO.deleteTeamMember(+req.params.uid).then(function (result) {
            res.send({ret: 0, message: '删除团队成员成功。'})
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    addPageSettingForProject: function (req, res, next) {
        var pid = req.query.id;
        var pageSetting = _.assign(req.body, {createDate: new Date(), pid: pid, creator: req.user.id});
        mainDAO.insertPageSetting(pageSetting).then(function (result) {
            pageSetting.id = result.insertId;
            res.send({ret: 0, data: pageSetting})
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },

    updatePageSettingForProject: function (req, res, next) {
        mainDAO.updatePageSetting(req.body).then(function (result) {
            res.send({ret: 0, message: '修改项目页面设置成功。'})
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },

    addBusinessForProject: function (req, res, next) {
        var pid = req.params.id;
        var businessInfo = _.assign(req.body, {createDate: new Date(), pid: pid, creator: req.user.id});
        mainDAO.insertBusinessInfo(businessInfo).then(function (result) {
            businessInfo.id = result.insertId;
            res.send({ret: 0, data: businessInfo});
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    removeBusinessForProject: function (req, res, next) {
        mainDAO.deleteBusinessInfo(+req.params.businessInfoId).then(function (result) {
            res.send({ret: 0, message: '删除商业信息成功。'})
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    updateBusinessForProject: function (req, res, next) {
        req.body.updateDate = new Date();
        mainDAO.updateBusinessInfo(req.body).then(function (result) {
            res.send({ret: 0, message: '修改商业信息成功。'})
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    addTeamStrengthForProject: function (req, res, next) {
        var pid = req.params.id;
        var teamStrength = _.assign(req.body, {createDate: new Date(), pid: pid, creator: req.user.id});
        mainDAO.insertTeamStrength(teamStrength).then(function (result) {
            teamStrength.id = result.insertId;
            res.send({ret: 0, data: teamStrength});
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    updateTeamStrengthForProject: function (req, res, next) {
        req.body.updateDate = new Date();
        mainDAO.updateTeamStrength(req.body).then(function (result) {
            res.send({ret: 0, message: '修改团队优势成功。'})
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    removeTeamStrengthForProject: function (req, res, next) {
        mainDAO.deleteTeamStrength(+req.params.id).then(function (result) {
            res.send({ret: 0, message: '删除团队优势成功。'})
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    getMyProjects: function (req, res, next) {
        mainDAO.findMyProjects(req.user.id, {
            from: +req.query.from,
            size: +req.query.size
        }).then(function (projects) {
            res.send({ret: 0, data: projects});
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    likeProject: function (req, res, next) {
        var liked;
        mainDAO.findProjectLikersBy(+req.params.id, +req.user.id).then(function (likers) {
            liked = likers && likers.length > 0;
            if (liked) return mainDAO.deleteProjectLiker(+req.params.id, +req.user.id);
            mainDAO.findProject(+req.params.id).then(function (projects) {
                return mainDAO.addProjectLiker({
                    pid: +req.params.id,
                    uid: req.user.id,
                    createDate: new Date(),
                    nickName: req.user.nickName,
                    headPic: req.user.headPic,
                    pName: projects[0].name
                });
            });
        }).then(function (result) {
            return mainDAO.updateByDescField({id: +req.params.id}, 'likerCount', liked ? -1 : 1);
        }).then(function (result) {
            res.send({ret: 0, data: {pid: +req.params.id, liked: !liked}})
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    getMyLikersForProjects: function (req, res, next) {
        mainDAO.findLikersForProjects(+req.user.id, {
            from: req.query.from,
            size: req.query.size
        }).then(function (likers) {
            if (likers && likers.length < 1) return res.send({ret: 0, data: []});
            res.send({ret: 0, data: likers});
        })
        return next();
    },
    commentProject: function (req, res, next) {
        var comment = _.assign(req.body, {
            pid: +req.params.id,
            uid: req.user.id,
            nickName: req.user.nickName,
            headPic: req.user.headPic,
            createDate: new Date(),
            removed: false
        });
        mainDAO.addComment(comment).then(function (result) {
            comment.id = result.insertId;
            return mainDAO.updateByDescField({id: +req.params.id}, 'commentCount', 1);
        }).then(function (result) {
            res.send({ret: 0, data: comment});
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    addPvOfProject: function (req, res, next) {
        redis.incrAsync('p:' + req.params.id + ':pv').then(function (result) {
            res.send({ret: 0, message: "pv增加1."});
        });
    },
    getDiscoveryItems: function (req, res, next) {
        mainDAO.findProjects({
            from: req.query.from,
            size: req.query.size
        }).then(function (projects) {
            Promise.map(projects, function (project) {
                return redis.getAsync('p:' + project.id + ':pv').then(function (pv) {
                    project.pv = pv ? pv : 0;
                    if (project.tags) project.tags = project.tags.split(',');
                    return mainDAO.findProjectLikers(+project.id);
                }).then(function (likers) {
                    project.hasLiked = (_.findIndex(likers, function (liker) {
                        return +liker.uid == req.user.id;
                    }) > -1);
                    project.likers = likers;
                });
            }).then(function (result) {
                res.send({ret: 0, data: projects});
            });
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    followingFriend: function (req, res, next) {
        var uid = req.user.id;
        redis.zrankAsync(['uid:' + uid + ':following', req.params.id]).then(function (rank) {
            var d = new Date().getTime();
            if (rank == null) {
                redis.zadd(['uid:' + uid + ':following', d, req.params.id]);
                redis.zadd(['uid:' + req.params.id + ':follower', d, uid]);
            } else {
                redis.zrem('uid:' + uid + ':following', req.params.id);
                redis.zrem('uid:' + req.params.id + ':follower', uid);
            }
            res.send({ret: 0, message: rank == null ? '关注成功' : '取消关注成功'});
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },

    getUserInfo: function (req, res, next) {
        var user = req.user;
        mainDAO.findUserById(+req.params.id).then(function (users) {
            if (users && users.length < 1) throw new Error('当前登录用户不存在。');
            user = users[0];
            return redis.zcardAsync('uid:' + req.params.id + ':following')
        }).then(function (followingCount) {
            user.followingCount = followingCount ? followingCount : 0;
            return redis.zcardAsync('uid:' + req.params.id + ':follower');
        }).then(function (followerCount) {
            user.followCount = followerCount ? followerCount : 0;
            return redis.zrankAsync(['uid:' + req.params.id + ':following', user.id])
        }).then(function (hasFollowing) {
            user.hasFollowing = (hasFollowing === null);
            return mainDAO.findCommentProjectBy(+req.params.id);
        }).then(function (commentedProjects) {
            user.commentedProject = commentedProjects;
            return Promise.map(commentedProjects, function (project) {
                return redis.getAsync('p:' + project.id + ':pv').then(function (pv) {
                    project.pv = pv ? pv : 0;
                    if (project.tags) project.tags = project.tags.split(',');
                    return project;
                })
            }).then(function (result) {
                return mainDAO.findProjectsBy(+req.params.id);
            })
        }).then(function (userProjects) {
            user.myProjcts = userProjects;
            return Promise.map(userProjects, function (project) {
                return redis.getAsync('p:' + project.id + ':pv').then(function (pv) {
                    project.pv = pv ? pv : 0;
                    return project;
                })
            }).then(function (result) {
                return mainDAO.findLikeredProjesctsBy(+req.user.id);
            });
        }).then(function (likeredProjects) {
            user.likeredProjects = likeredProjects;
            return Promise.map(likeredProjects, function (project) {
                return redis.getAsync('p:' + project.id + ':pv').then(function (pv) {
                    project.pv = pv ? pv : 0;
                    if (project.tags) project.tags = project.tags.split(',');
                    return project;
                })
            }).then(function (result) {
                return mainDAO.findLikeredProjesctsBy(+req.user.id);
            }).then(function (result) {
                res.send({ret: 0, data: user});
            });
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    getProjectComments: function (req, res, next) {
        mainDAO.findProjectComments(+req.params.id, {
            from: req.query.from,
            size: req.query.size
        }).then(function (comments) {
            res.send({ret: 0, data: comments});
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    getProjectInfo: function (req, res, next) {
        var p = {};
        mainDAO.findProject(+req.params.id).then(function (projects) {
            if (projects.length < 1) throw  new Error('项目不存在。');
            p = projects[0];
            if (p.tags) p.tags = p.tags.split(',');
            return mainDAO.findProjectMemberInfo(p.id);
        }).then(function (memberInfo) {
            p.memberInfo = memberInfo.length > 0 ? translateDate(memberInfo) : [];
            return mainDAO.findProjectBusinessInfo(p.id);
        }).then(function (businessInfo) {
            p.businessInfo = businessInfo.length > 0 ? translateDate(businessInfo) : [];
            return mainDAO.findTeamStrengths(p.id);
        }).then(function (teamStrengths) {
            p.teamStrengths = teamStrengths.length > 0 ? translateDate(teamStrengths) : [];
            return mainDAO.findProjectComments(p.id, {from: 0, size: 6});
        }).then(function (comments) {
            p.comments = comments;
            res.send({ret: 0, data: p});
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    sendPrivateMessage: function (req, res, next) {
        var m = _.assign(req.body, {
            createDate: new Date(),
            headPic: req.user.headPic,
            nickName: req.user.nickName,
            uid: req.user.id
        });
        mainDAO.insertPrivateMessage(m).then(function (result) {
            m.id = result.insertId;
            res.send({ret: 0, data: m});
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    postProjectComplaint: function (req, res, next) {
        var c = _.assign(req.body, {
            createDate: new Date(),
            headPic: req.user.headPic,
            nickName: req.user.nickName,
            uid: req.user.id
        });
        mainDAO.insertProjectComplaint(c).then(function (result) {
            c.id = result.insertId;
            res.send({ret: 0, data: c});
        }).catch(function (err) {
            res.send({ret: 1, data: err.message});
        });
        return next();
    },
    changePwd: function (req, res, next) {
        if (req.body.password != req.body.confirmedPwd) return res.send({ret: 1, message: '新密码和确认密码不一致。'});
        mainDAO.findUserById(+req.user.id).then(function (users) {
            if (users[0].password != md5(req.body.oldPwd)) throw new Error('原密码输入错误。');
            return mainDAO.updateUser({id: +req.user.id, password: md5(req.body.password)});
        }).then(function (result) {
            res.send({ret: 0, data: '修改密码成功。'});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    resetPwd: function (req, res, next) {
        redis.getAsync(req.body.mobile).then(function (reply) {
            if (!(reply && reply == req.body.certCode)) {
                throw new Error(i18n.get('sms.code.invalid'));
            }
            return mainDAO.updateUserByName({name: req.body.mobile, password: md5(req.body.password)});
        }).then(function (result) {
            res.send({ret: 0, data: '修改密码成功。'});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    getMyProfile: function (req, res, next) {
        var uid = req.user.id;
        mainDAO.findUserById(req.user.id).then(function (users) {
            res.send({ret: 0, data: users.length > 0 ? users[0] : {}});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    updateMyProfile: function (req, res, next) {
        var user = _.assign(req.body, {id: req.user.id});
        mainDAO.updateUser(user).then(function (result) {
            res.send({ret: 0, message: '更新成功。'});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    changeGroupName: function (req, res, next) {
        mainDAO.updateGroupName(req.params.id, 'project' + _.capitalize(req.params.type), req.body.group, req.body.newGroup).then(function (result) {
            res.send({ret: 0, message: '更新成功。'});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    getFollowings: function (req, res, next) {
        var uid = +req.user.id;
        var from = +req.query.from;
        var to = +req.query.from + (+req.query.size) - 1;
        redis.zrangeAsync(['uid:' + uid + ':following', from, to]).then(function (userIdList) {
            if (userIdList && userIdList.length < 1) return res.send({ret: 0, data: []});
            return mainDAO.findUsersByIds(userIdList.join(','));
        }).then(function (users) {
            Promise.map(users, function (user) {
                return redis.zrankAsync(['uid:' + user.id + ':following', uid]).then(function (result) {
                    user.ifFollowingEachOther = (result != null);
                })
            }).then(function (result) {
                res.send({ret: 0, data: users});
            })
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    getFollowers: function (req, res, next) {
        var uid = +req.user.id;
        var from = +req.query.from;
        var to = +req.query.from + (+req.query.size) - 1;
        redis.zrangeAsync(['uid:' + uid + ':follower', from, to]).then(function (userIdList) {
            if (userIdList && userIdList.length < 1) return res.send({ret: 0, data: []});
            return mainDAO.findUsersByIds(userIdList.join(','));
        }).then(function (users) {
            Promise.map(users, function (user) {
                return redis.zrankAsync(['uid:' + uid + ':following', user.id]).then(function (result) {
                    user.hasFollowing = (result != null);
                })
            });
            res.send({ret: 0, data: users});
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    },
    removeGroup: function (req, res, next) {
        mainDAO.deleteGroup(+req.params.id, 'project' + _.capitalize(req.params.type), req.params.name).then(function (result) {
            res.send({ret: 0, message: '删除组信息成功。'})
        }).catch(function (err) {
            res.send({ret: 1, message: err.message});
        });
        return next();
    }

}