class Migration {
  static up(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.alterTable('testcase', table => {
      table.integer('testplan_id').unsigned().nullable();
    });

    builder.schema.createTable('testplan', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
      table.increments('id').notNullable().primary();
      table.string('name', 255).notNullable();
    });

    builder.schema.alterTable('testcase', table => {
      table.foreign('testplan_id').references('id').inTable('testplan');
    });
  }

  static down(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.alterTable('testcase', table => {
      table.dropForeign('testplan_id');
      table.dropColumn('testplan_id');
    });

    builder.schema.dropTable('testplan');
  }
}

module.exports.Migration = Migration;
