var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './remote.sqlite'
  }
});

knex
  .select('id', 'meta')
  .from('permissions')
  .then((permissions) => {
    return Promise.all(permissions.map((permission) => {
      try {
        return knex('permissions').update({
          description: JSON.parse(permission.meta).remark
        }).where({id: permission.id})
      } catch(err) {
        console.error(err);
      }
    }));
  })
  .then(function() {
    console.log('ok');
  });
