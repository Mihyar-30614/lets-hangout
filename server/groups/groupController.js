var Group = require('./groupModel.js');
var User = require('../users/userModel.js');

var repsonseHandler = function(error, req, res, body, next) {
	if (error) {
		next(error, req, res);
	} else {
		res.status(body.status).send(body.returnObj);
	}
};


module.exports = {
	createNewGroup: function (req,res,next){
      var groupName = req.body.groupName;
	    var userid = req.body.userid;
	    var newGroup = new Group({groupName:groupName,groupAdmin:userid});
	      newGroup.save(function (err,group){
	      	 repsonseHandler(err, req, res, {status: 201, returnObj:group}, next);
	      });
  },

  getInfo: function (req,res,next){
	    var id=req.params.id;
	    Group.findOne({_id:id},function (err,group){
	    	repsonseHandler(err, req, res, {status: 201, returnObj:group}, next);
	    })
  },

  addFriendsToGroup: function (req,res,next){
      var userid = req.body.userid;
      var groupid = req.params.id; 
    	Group.findOne({_id:groupid},function (err,group){
    		group.users.push(userid);
        group.save();
        repsonseHandler(err, req, res, {status: 201, returnObj:group}, next)
    		
    	})
  },
  removeFriendFromGroup: function(req,res,next){
      var userid = req.body.userid;
      var groupid = req.params.id; 
        Group.findOneAndUpdate({_id:groupid},{$pull: {users:userid}},{new: true},function (err,group){
            repsonseHandler(err, req, res, {status: 201, returnObj:group}, next);
      })

  },

  deleteGroup: function(req,res,next){
    	var groupid = req.params.id; 
    	Group.findOneAndRemove({_id:groupid},function (err,group){
    		repsonseHandler(err, req, res, {status: 201, returnObj:group}, next);
    	});
  },
  getAll: function (req,res,next){
      Group.find({})
      .exec(function (err,groups){
        repsonseHandler(err, req, res, {status: 201, returnObj:groups}, next);
      })
  }
}