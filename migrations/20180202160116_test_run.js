class Migration {
  static up(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.alterTable('comment', table => {
      table.integer('testrun_id').unsigned().nullable();
    });

    builder.schema.alterTable('testrun', table => {
      table.integer('testcase_id').unsigned().nullable();
    });

    builder.schema.alterTable('comment', table => {
      table.foreign('testrun_id').references('id').inTable('testrun');
    });

    builder.schema.alterTable('testrun', table => {
      table.foreign('testcase_id').references('id').inTable('testcase');
    });
  }

  static down(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.alterTable('comment', table => {
      table.dropForeign('testrun_id');
      table.dropColumn('testrun_id');
    });

    builder.schema.alterTable('testrun', table => {
      table.dropForeign('testcase_id');
      table.dropColumn('testcase_id');
    });
  }
}

module.exports.Migration = Migration;
