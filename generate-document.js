var jsonRefs = require('json-refs');
var fs = require('fs');
var path = require('path');
var _ = require('underscore');

var root = './design/swagger';

jsonRefs
  .resolveRefs(require(root), {
    location: path.dirname(root)
  })
  .then(function(results) {
    var swaggerObject = results.resolved;
    var swaggerString = JSON.stringify(swaggerObject);
    var template = _.template(swaggerString);
    var compiled = JSON.parse(template());

    fs.writeFileSync('./api/swagger.json', JSON.stringify(compiled, null, 2));
  });
