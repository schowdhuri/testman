class Migration {
  static up(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.createTable('execcycle', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
      table.increments('id').notNullable().primary();
      table.string('name', 255).notNullable();
      table.datetime('startDate').nullable();
      table.datetime('endDate').nullable();
      table.enu('status', ['New','In Progress','Completed']).notNullable();
    });

    builder.schema.createTable('testrun', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
      table.datetime('runDate').nullable();
      table.increments('id').notNullable().primary();
      table.enu('status', ['New','Pass','Fail']).notNullable();
      table.integer('execcycle_id').unsigned().nullable();
      table.foreign('execcycle_id').references('id').inTable('execcycle');
    });
  }

  static down(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.dropTable('testrun');

    builder.schema.dropTable('execcycle');
  }
}

module.exports.Migration = Migration;
