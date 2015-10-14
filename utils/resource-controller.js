var _ = require('underscore');
var models = require('../models');

var defaultPageSize = 30;
var defaultSortDir = 'DESC';

function resourceControllerFactory(Model, related) {

  return {

    findAll: function(req, res, next) {
      var appId = req.cm.appId();
      var include = req.cm.param('_include') || [];
      var filters = req.cm.param('_filters') || '{}';
      var sortField = req.cm.param('_sortField');
      var sortDir = req.cm.param('_sortDir') || defaultSortDir;
      var page = req.cm.param('_page') || 1;
      var perPage = req.cm.param('_perPage') || defaultPageSize;

      // pagination
      var limit = perPage;
      var offset = (page - 1) * limit;

      // filter
      var where = JSON.parse(filters);
      where.applicationId = appId;

      // ording
      var order;
      if (sortField) {
        order = [
          [sortField, sortDir]
        ];
      }

      // association
      include = include.map(function(name) {
        return {
          association: Model.associations[name]
        };
      });

      Model
        .findAll({
          where: where,
          include: include,
          order: order,
          offset: offset,
          limit: limit
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
      var include = req.cm.param('_include') || [];

      // association
      include = include.map(function(name) {
        return {
          association: Model.associations[name]
        };
      });

      Model
        .findOne({
          where: {id: id},
          include: include
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
