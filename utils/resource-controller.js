function resourceControllerFactory(Model, related) {

  return {

    findAll: function(req, res, next) {
      // TODO: filter implements
      var filter = {};
      var appId = req.cm.appId();

      filter.applicationId = appId;

      var includes = _.map(related, function(value, key) {
        return {model: value};
      });

      Model
        .findAll({
          where: filter,
          include: includes
        })
        .then(function(entities) {
          res.json(entities);
        })
        .catch(next);
    },

    create: function(req, res, next) {
      var data = req.getParam('data');
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
      var id = req.getParam('id');
      Model
        .findOne({where: {id: id}})
        .then(function(entity) {
          res.json(entity);
        })
        .catch(next);
    },

    update: function(req, res, next) {
      var id = req.getParam('id');
      var data = req.getParam('data');

      return Model
        .update(data, {where: {id: id}})
        .then(function(result) {
          return Model.findOne({where: {id: id}});
        })
        .then(function(entity) {
          return updateRelated(entity, data, related);
        })
        .then(function() {
          res.json();
        })
        .catch(next);

      function updateRelated(entity, data, related) {
        var taskSet = _.reduce(data, function(memo, value, key) {
          if (value && related[key]) {
            var fnName = 'set' + capitalizeFirstLetter(key);
            memo[key] = entity[fnName](value);
          }
        }, {});
        var taskArray = _.toArray(taskSet);
        return Promise.all(taskArray);
      }

      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    },

    destroy: function(req, res, next) {
      var id = req.getParam('id');
      Model
        .destroy({where: {id: id}})
        .then(function(result) {
          res.json(result);
        })
        .catch(next);
    }

  };

}

module.exports = resourceControllerFactory;
