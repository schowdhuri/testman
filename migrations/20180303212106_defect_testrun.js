class Migration {
  static up(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.createTable('testrun_defect', table => {
      table.increments('id').notNullable().primary();
      table.integer('testrun_id').unsigned().nullable();
      table.integer('defect_id').unsigned().nullable();
      table.index('testrun_id', 'idx_testrun_defect_testrun_id');
      table.index('defect_id', 'idx_testrun_defect_defect_id');
      table.foreign(['defect_id']).references('id').inTable('defect').onDelete('cascade');
      table.foreign(['testrun_id']).references('id').inTable('testrun').onDelete('cascade');
    });
  }

  static down(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.dropTable('testrun_defect');
  }
}

module.exports.Migration = Migration;
