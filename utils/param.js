module.exports = function() {
  return function(req, res, next) {

    req.cm = req.cm || {};

    req.cm.param = function(name) {
      return req.swagger.params[name].value;
    };

    next();
  };
};
