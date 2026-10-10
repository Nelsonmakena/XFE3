#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/e1af423d373e8c23d9ea50cb53f0b7029746df72c54b560660c495d2382d9dfd/contract';
import endContract from '../../snapshots/e1af423d373e8c23d9ea50cb53f0b7029746df72c54b560660c495d2382d9dfd/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'account',
        columns: [
          col('account_id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('account_role_id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('password_hash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['account_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'account_role',
        columns: [
          col('account_role_id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('role_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['account_role_id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'account',
        index: 'account_account_role_id_idx_e5327e38',
        columns: ['account_role_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'account',
        foreignKey: {
          name: 'account_account_role_id_fkey',
          columns: ['account_role_id'],
          references: { schema: 'public', table: 'account_role', columns: ['account_role_id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
