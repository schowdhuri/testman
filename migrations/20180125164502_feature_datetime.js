class Migration {
  static up(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.alterTable('comment', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
    });

    builder.schema.alterTable('defect', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
    });

    builder.schema.alterTable('richtext', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
    });

    builder.schema.alterTable('testcase', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
    });

    builder.schema.alterTable('user', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
    });
  }

  static down(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.alterTable('comment', table => {
      table.dropColumn('created');
      table.dropColumn('modified');
    });

    builder.schema.alterTable('defect', table => {
      table.dropColumn('created');
      table.dropColumn('modified');
    });

    builder.schema.alterTable('richtext', table => {
      table.dropColumn('created');
      table.dropColumn('modified');
    });

    builder.schema.alterTable('testcase', table => {
      table.dropColumn('created');
      table.dropColumn('modified');
    });

    builder.schema.alterTable('user', table => {
      table.dropColumn('created');
      table.dropColumn('modified');
    });
  }
}

module.exports.Migration = Migration;
