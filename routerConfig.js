var authController = require('./controller/authController');
var mainController = require('./controller/mainController');
var thirdPartyController = require('./controller/thirdPartyController');
var projectController = require('./controller/projectController');
var wechatController = require('./controller/wechatController');
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
        method: "get",
        path: "/api/wechat/login",
        handler: wechatController.login
    },
    {
        method: "get",
        path: "/api/wechat/signature",
        handler: wechatController.getWeChatSignature
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
        handler: mainController.getProjectCategories
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
        method: "get",
        path: "/api/projects/:id/pageSetting",
        handler: projectController.getPageSettingForProject,
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
        path: "/api/projects/:id/news/:newsId/likers",
        handler: projectController.likeProjectNews,
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
        path: "/api/projects/:id/comments/:commentId/likers",
        handler: projectController.likeProjectComment,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/projects/:id/news/:newsId/comments/:commentId/likers",
        handler: projectController.likeProjectNewsComment,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/projects/:id/pv",
        handler: mainController.addPvOfProject
    },
    {
        method: "post",
        path: "/api/projects/:id/news/:newsId/pv",
        handler: projectController.addPvOfProjectNews,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/discovery",
        handler: mainController.getDiscoveryItems
    },
    {
        method: "post",
        path: "/api/projects/:id/news/:newsId/comments",
        handler: projectController.commentProjectNews,
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
        handler: mainController.getUserInfo
    },
    {
        method: "get",
        path: "/api/projects/:id/comments",
        handler: mainController.getProjectComments,
        secured: 'user'
    },
    {
        method: "del",
        path: "/api/projects/:id/comments/:commentId",
        handler: projectController.removeProjectComment,
        secured: 'user'
    },
    {
        method: "del",
        path: "/api/projects/:id/news/:newsId/comments/:commentId",
        handler: projectController.removeProjectNewsComment,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/projects/:id",
        handler: mainController.getProjectInfo
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
    },
    {
        method: "get",
        path: "/api/visitSummary",
        handler: mainController.getVisitSummary,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/projectFollowers",
        handler: mainController.getProjectFollowers,
        secured: 'user'
    },
    {
        method: "post",
        path: "/api/projects/:id/news",
        handler: projectController.addProjectNews,
        secured: 'user'
    },
    {
        method: "put",
        path: "/api/projects/:id/news",
        handler: projectController.updateProjectNews,
        secured: 'user'
    },
    {
        method: "del",
        path: "/api/projects/:id/news/:newsId",
        handler: projectController.removeProjectNews,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/projects/:id/news",
        handler: projectController.getProjectNews,
        secured: 'user'
    },
    {
        method: "get",
        path: "/api/projects/:id/news/:newsId",
        handler: projectController.getProjectNewsBy,
        secured: 'user'
    }

];
