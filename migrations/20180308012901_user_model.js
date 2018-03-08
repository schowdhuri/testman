class Migration {
  static up(migration) {
    let builder = migration.getBuilder('defaultStore');
    builder.schema.createTable('user', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
      table.increments('id').notNullable().primary();
      table.string('username', 255).notNullable();
      table.string('authid', 255).notNullable();
      table.string('email', 255).notNullable();
      table.string('name', 255).notNullable();
      table.unique(['username'], 'user_username_unique');
    });
  }

  static down(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.dropTable('user');
  }
}

module.exports.Migration = Migration;
