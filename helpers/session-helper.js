var sessionHelper = {
  checkUser : function(req,res,next,destination){
    destination = destination || '/login';
    console.log(req.session.cookie);
    if (req.session.cookie){
      next();
    } else {
      // console.log(req.session);
      // req.session.error = 'Access denied';
      res.redirect(destination);
    }
  },

  generate : function(req,res,username,destination){
    destination = destination || '/';
    req.session.regenerate(function(){
      req.session.user = username;
      res.redirect(destination);
    });
  },

  destroy: function(req,res,destination){
    destination = destination || '/login';
    if (req.session.cookie){
      req.session.destroy(function(err){
        res.redirect(destination);
      });
    } else {
      res.redirect(destination);
    }
  }
};

module.exports = sessionHelper;
