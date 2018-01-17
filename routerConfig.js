var authController = require('./controller/authController');
var mainController = require('./controller/mainController');
var thirdPartyController = require('./controller/thirdPartyController');
module.exports = [
    {
        method: "get",
        path: "/api/sms/:mobile",
        handler: thirdPartyController.sendSMS
    },
    {
        method: "post",
        path: "/api/register",
        handler: authController.register
    },
    {
        method: "post",
        path: "/api/login",
        handler: authController.login
    },
    {
        method: "post",
        path: "/api/logout",
        handler: authController.logout,
        secured: 'user'
    },
    {
        method: 'get',
        path: '/api/qiniu/token',
        handler: thirdPartyController.getQiniuToken
    },
    {
        method: "get",
        path: "/api/projectCategories",
        handler: mainController.getProjectCategories,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/tags",
        handler: mainController.getTags,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/musicLib",
        handler: mainController.getMusicLib,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/projects",
        handler: mainController.addProject,
        secured: 'user'
    },
    {
        method: "del",
        path: "/api/projects/:id",
        handler: mainController.removeProject,
        secured: 'user'
    },
    {
        method: "put",
        path: "/api/projects",
        handler: mainController.updateProject,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/projects/:id/users",
        handler: mainController.addTeamMemberForProject,
        secured: 'user'
    },
    {
        method: "del",
        path: "/api/projects/:id/users/:uid",
        handler: mainController.removeTeamMemberForProject,
        secured: 'user'
    },
    {
        method: "put",
        path: "/api/projects/:id/users",
        handler: mainController.updateTeamMemberForProject,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/projects/:id/businessInfo",
        handler: mainController.addBusinessForProject,
        secured: 'user'
    },
    {
        method: "put",
        path: "/api/projects/:id/businessInfo",
        handler: mainController.updateBusinessForProject,
        secured: 'user'
    },
    {
        method: "del",
        path: "/api/projects/:id/businessInfo/:businessInfoId",
        handler: mainController.removeBusinessForProject,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/projects/:id/teamStrength",
        handler: mainController.addTeamStrengthForProject,
        secured: 'user'
    },
    {
        method: "put",
        path: "/api/projects/:id/teamStrength",
        handler: mainController.updateTeamStrengthForProject,
        secured: 'user'
    },
    {
        method: "del",
        path: "/api/projects/:id/teamStrength/:id",
        handler: mainController.removeTeamStrengthForProject,
        secured: 'user'
    },

    {
        method: "post",
        path: "/api/changePwd",
        handler: mainController.changePwd,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/resetPwd",
        handler: mainController.resetPwd
    },
    {
        method: "post",
        path: "/api/projects/:id/pageSetting",
        handler: mainController.addPageSettingForProject,
        secured: 'user'
    },
    {
        method: "put",
        path: "/api/projects/:id/pageSetting",
        handler: mainController.updatePageSettingForProject,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/me/projects",
        handler: mainController.getMyProjects,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/projects/:id/likers",
        handler: mainController.likeProject,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/projects/:id/comments",
        handler: mainController.commentProject,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/projects/:id/pv",
        handler: mainController.addPvOfProject,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/projects/:id/pv",
        handler: mainController.addPvOfProject,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/discovery",
        handler: mainController.getDiscoveryItems,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/discovery",
        handler: mainController.getDiscoveryItems,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/following/:id",
        handler: mainController.followingFriend,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/users/:id",
        handler: mainController.getUserInfo,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/projects/:id/comments",
        handler: mainController.getProjectComments,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/projects/:id",
        handler: mainController.getProjectInfo,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/projects/:id/:type/groups",
        handler: mainController.changeGroupName,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/privateMessages",
        handler: mainController.sendPrivateMessage,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/complaints",
        handler: mainController.postProjectComplaint,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/me",
        handler: mainController.getMyProfile,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/me/projectsLikers",
        handler: mainController.getMyLikersForProjects,
        secured: 'user'
    },
    {
        method: "put",
        path: "/api/me",
        handler: mainController.updateMyProfile,
        secured: 'user'
    },

    {
        method: "get",
        path: "/api/wechat",
        handler: authController.checkSignature
    },
    {
        method: "post",
        path: "/api/wechat",
        handler: authController.wechatCallback
    },
    {
        method: "get",
        path: "/api/followings",
        handler: mainController.getFollowings,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/followers",
        handler: mainController.getFollowers,
        secured: 'user'
    },
    {
        method: "del",
        path: "/api/projects/:id/:type/groups/:name",
        handler: mainController.removeGroup,
        secured: 'user'
    }
];
