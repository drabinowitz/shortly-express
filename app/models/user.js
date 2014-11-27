var db = require('../config');
var Link = require('./link');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  links: function() {
    return this.hasMany(Link);
  },

  initialize: function() {
    this.on('saving',function(model,attrs,options){
      var password = model.get('password');
/*      return bcrypt.genSaltAsync(10)
        .then(function(salt){
          bcrypt.hashAsync(password, salt, null);
        })
        .then(function(hash){
          model.set('password',hash);
        });*/
      var salt = bcrypt.genSaltSync();
      // console.log(password);
      var hash = bcrypt.hashSync(password);
      model.set('password',hash);
    });
  }

},{

  login: Promise.method(function(username,password){
    if (!username || !password) throw new Error ('username and password are required');
    return new this({username: username}).fetch({require: true}).tap(function(user){
      return bcrypt.compareAsync(password, user.get('password'));
    });
  })

});

module.exports = User;
