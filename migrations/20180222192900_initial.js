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

    builder.schema.createTable('richtext', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
      table.increments('id').notNullable().primary();
      table.text('value', 'text').notNullable();
    });

    builder.schema.createTable('defect', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
      table.increments('id').notNullable().primary();
      table.string('name', 255).notNullable();
      table.enu('status', ['Open','WIP','Closed']).notNullable();
      table.integer('description_id').unsigned().nullable();
      table.foreign('description_id').references('id').inTable('richtext');
    });

    builder.schema.createTable('defect_testcase', table => {
      table.increments('id').notNullable().primary();
      table.integer('defect_id').unsigned().nullable();
      table.integer('testcase_id').unsigned().nullable();
      table.index('defect_id', 'idx_defect_testcase_defect_id');
      table.index('testcase_id', 'idx_defect_testcase_testcase_id');
      table.foreign(['testcase_id']).references('id').inTable('testcase').onDelete('cascade');
      table.foreign(['defect_id']).references('id').inTable('defect').onDelete('cascade');
    });

    builder.schema.createTable('testplan', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
      table.increments('id').notNullable().primary();
      table.string('name', 255).notNullable();
    });

    builder.schema.createTable('testcase', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
      table.increments('id').notNullable().primary();
      table.string('name', 255).notNullable();
      table.enu('status', ['New','Pass','Fail']).notNullable();
      table.integer('description_id').unsigned().nullable();
      table.integer('testplan_id').unsigned().nullable();
      table.foreign('description_id').references('id').inTable('richtext');
      table.foreign('testplan_id').references('id').inTable('testplan');
    });

    builder.schema.createTable('testrun', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
      table.datetime('runDate').nullable();
      table.increments('id').notNullable().primary();
      table.enu('status', ['New','Pass','Fail']).notNullable();
      table.integer('execcycle_id').unsigned().nullable();
      table.integer('testcase_id').unsigned().nullable();
      table.foreign('execcycle_id').references('id').inTable('execcycle');
      table.foreign('testcase_id').references('id').inTable('testcase');
    });

    builder.schema.createTable('comment', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
      table.increments('id').notNullable().primary();
      table.integer('content_id').unsigned().nullable();
      table.integer('testcases_id').unsigned().nullable();
      table.integer('defects_id').unsigned().nullable();
      table.foreign('content_id').references('id').inTable('richtext');
      table.foreign('testcases_id').references('id').inTable('testcase');
      table.foreign('defects_id').references('id').inTable('defect');
    });

    builder.schema.createTable('user', table => {
      table.datetime('created').nullable();
      table.datetime('modified').nullable();
      table.increments('id').notNullable();
      table.string('username', 255).notNullable();
      table.unique(['username'], 'user_username_unique');
    });
  }

  static down(migration) {
    let builder = migration.getBuilder('defaultStore');

    builder.schema.dropTable('comment');

    builder.schema.dropTable('defect');

    builder.schema.dropTable('testrun');

    builder.schema.dropTable('execcycle');

    builder.schema.dropTable('testcase');

    builder.schema.dropTable('richtext');

    builder.schema.dropTable('testplan');

    builder.schema.dropTable('user');

    builder.schema.dropTable('defect_testcase');
  }
}

module.exports.Migration = Migration;
