var _ = require('underscore');
var models = require('../models');
var query = require('./query');

function resourceControllerFactory(Model, related) {

  return {

    findAll: function(req, res, next) {
      Model
        .findAndCountAll({
          where: query.getWhere(req),
          include: query.getInclude(req, Model),
          order: query.getOrder(req),
          offset: query.getOffset(req),
          limit: query.getLimit(req)
        })
        .then(function(result) {
          var count = result.count;
          var entities = result.rows;
          res.set('X-Total-Count', count);
          res.json(entities);
        })
        .catch(next);
    },

    create: function(req, res, next) {
      var data = req.cm.param('data');
      var appId = req.cm.appId();

      data.applicationId = appId;

      Model
        .create(data)
        .then(function(entity) {
          res.json(entity);
        })
        .catch(next);
    },

    findById: function(req, res, next) {
      var id = req.cm.param('id');

      Model
        .findById(id, {
          include: query.getInclude(req, Model)
        })
        .then(function(entity) {
          res.json(entity);
        })
        .catch(next);
    },

    update: function(req, res, next) {
      var id = req.cm.param('id');
      var data = req.cm.param('data');

      return Model
        .update(data, {where: {id: id}})
        .then(function(result) {
          return Model.findOne({where: {id: id}});
        })
        .then(function(entity) {
          // return res.json(entity);
          return updateRelated(entity, data, related)
            .then(function() {
              return res.json(entity);
            });
        })
        .catch(next);
    },

    destroy: function(req, res, next) {
      var id = req.cm.param('id');
      Model
        .destroy({where: {id: id}})
        .then(function(count) {
          res.json({
            message: 'ok',
            detail: {count: count}
          });
        })
        .catch(next);
    }

  };

}

function updateRelated(entity, data, related) {
  var taskArray = _.reduce(data, function(memo, value, key) {
    if (value && related && related[key]) {
      var fnName = 'set' + capitalizeFirstLetter(key);

      console.log('fnName', fnName);
      memo.push(entity[fnName](value));
    }
    return memo;
  }, []);
  return Promise.all(taskArray);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = resourceControllerFactory;
