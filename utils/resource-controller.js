var _ = require('underscore');
var models = require('../models');

function resourceControllerFactory(Model, related) {

  return {

    findAll: function(req, res, next) {
      // TODO: filter implements
      var filter = {};
      var appId = req.cm.appId();
      var includes = req.cm.param('include') || [];
      var filters = req.cm.param('_filters') || '{}';

      var where = JSON.parse(filters);
      where.applicationId = appId;

      includes = includes.map(function(name) {
        return {
          association: Model.associations[name]
        };
      });

      Model
        .findAll({
          where: where,
          include: includes
        })
        .then(function(entities) {
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

    findOne: function(req, res, next) {
      var id = req.cm.param('id');
      Model
        .findOne({where: {id: id}})
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
  var taskSet = _.reduce(data, function(memo, value, key) {
    if (value && related && related[key]) {
      var fnName = 'set' + capitalizeFirstLetter(key);
      console.log('fnName', fnName);
      memo[key] = entity[fnName](value);
    }
  }, {});
  var taskArray = _.toArray(taskSet);
  return Promise.all(taskArray);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = resourceControllerFactory;
