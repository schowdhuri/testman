class Migration {
  static up(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.createTable('file', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
      table.increments('id').notNullable().primary();
      table.string('name', 255).notNullable();
      table.string('description', 255).nullable();
      table.string('path', 255).notNullable();
      table.integer('user_id').unsigned().nullable();
      table.integer('richtext_id').unsigned().nullable();
      table.foreign('user_id').references('id').inTable('user');
      table.foreign('richtext_id').references('id').inTable('comment');
    });
  }

  static down(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.dropTable('file');
  }
}

module.exports.Migration = Migration;
