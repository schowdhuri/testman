class Migration {
  static up(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.alterTable('comment', table => {
      table.integer('user_id').unsigned().nullable();
    });

    builder.schema.alterTable('defect', table => {
      table.integer('user_id').unsigned().nullable();
      table.integer('assignee_id').unsigned().nullable();
    });

    builder.schema.alterTable('testcase', table => {
      table.integer('user_id').unsigned().nullable();
    });

    builder.schema.alterTable('testrun', table => {
      table.integer('user_id').unsigned().nullable();
    });

    builder.schema.alterTable('comment', table => {
      table.foreign('user_id').references('id').inTable('user');
    });

    builder.schema.alterTable('defect', table => {
      table.foreign('user_id').references('id').inTable('user');
      table.foreign('assignee_id').references('id').inTable('user');
    });

    builder.schema.alterTable('testcase', table => {
      table.foreign('user_id').references('id').inTable('user');
    });

    builder.schema.alterTable('testrun', table => {
      table.foreign('user_id').references('id').inTable('user');
    });
  }

  static down(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.alterTable('comment', table => {
      table.dropForeign('user_id');
      table.dropColumn('user_id');
    });

    builder.schema.alterTable('defect', table => {
      table.dropForeign('user_id');
      table.dropForeign('assignee_id');
      table.dropColumn('user_id');
      table.dropColumn('assignee_id');
    });

    builder.schema.alterTable('testcase', table => {
      table.dropForeign('user_id');
      table.dropColumn('user_id');
    });

    builder.schema.alterTable('testrun', table => {
      table.dropForeign('user_id');
      table.dropColumn('user_id');
    });
  }
}

module.exports.Migration = Migration;
