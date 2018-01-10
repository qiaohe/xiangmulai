module.exports = {
    user: {
        findByName: 'select * from user where name = ?',
        insert: 'insert user set ?',
        findById: 'select * from user where id = ?',
        update: 'update user set ? where id = ?',
        updateByName: 'update user set ? where name = ?'
    },
    project: {
        findCategories: 'select id, name, pid from projectCategory limit ? ,?',
        findBusinessInfo: 'select * FROM projectBusinessInfo where pid = ?',
        findTeamStrengths: 'select * FROM projectTeamStrength where pid = ?',
        findById: 'select * from project where id = ?',
        findMemberInfo: 'select * FROM projectMemberInfo where pid = ?',
        findLikers: 'select id,uid,nickName, createDate from projectLiker where pid = ?',
        findTags: 'select id, name from tag limit ?, ?',
        findByCreator: 'select * from project where creator = ? limit ?, ?',
        findMusicLib: 'select * from musicLib ',
        findLikersBy: 'select * from projectLiker where pid=? and uid=?',
        findLikeredProjesctsBy: 'select p.id,p.`name`,p.logo, p.shortDesc from projectLiker l left JOIN project p on l.pid = p.id where l.uid=?',
        insert: 'insert project set ?',
        insertComplaint: 'insert projectComplaint set ?',
        insertPrivateMessage: 'insert projectPrivateMessage set ?',
        find: 'select * from project limit ?,?',
        update: 'update project set ? where id = ?',
        delete: 'delete from project where id = ?',
        findByUid: 'select * from project where creator = ?',
        addLiker: 'insert projectLiker set ?',
        addComment: 'insert projectComment set ?',
        deleteLiker: 'delete from projectLiker where uid=? and pid = ?',
        insertTeamMember: 'insert projectMemberInfo set ?',
        deleteTeamMember: 'delete from projectMemberInfo where id = ?',
        updateTeamMember: 'update projectMemberInfo set ? where id = ?',
        insertPageSetting: 'insert projectPageSetting set ?',
        updatePageSetting: 'update projectPageSetting set ? where id = ? ',
        insertBusinessInfo: 'insert projectBusinessInfo set ?',
        updateBusinessInfo: 'update projectBusinessInfo set ? where id = ?',
        deleteBusinessInfo: 'delete from projectBusinessInfo where id = ?',
        insertTeamStrength: 'insert projectTeamStrength set ?',
        updateTeamStrength: 'update projectTeamStrength set ? where id = ?',
        deleteTeamStrength: 'delete from projectTeamStrength where id = ?',
        findComments: 'select id, nickName, headPic, content, createDate from projectComment where pid=? order by createDate desc limit ?, ?',
        findCommentProjectBy: 'select c.id, c.content,c.createDate, p.`name`, p.creator, p.creatorName, p.shortDesc, p.`desc`, p.logo from projectComment c left JOIN project p on p.id = c.pid where c.uid = ? '
    }
}
