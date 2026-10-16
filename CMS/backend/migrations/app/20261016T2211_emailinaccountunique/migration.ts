#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/3b69f8f504662634f925a4a0b9fac99ec2d561f978723e753a68c67e80993eab/contract';
import endContract from '../../snapshots/3b69f8f504662634f925a4a0b9fac99ec2d561f978723e753a68c67e80993eab/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/d76c87339121c309b6d087fc86594e40f010068bbea2a0d3e99072efc132a31b/contract';
import startContract from '../../snapshots/d76c87339121c309b6d087fc86594e40f010068bbea2a0d3e99072efc132a31b/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, placeholder } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'account',
        column: col('email', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.dataTransform(endContract, 'backfill-account-email', {
        check: () => placeholder('backfill-account-email:check'),
        run: () => placeholder('backfill-account-email:run'),
      }),
      this.setNotNull({ schema: 'public', table: 'account', column: 'email' }),
      this.dropNotNull({ schema: 'public', table: 'employee', column: 'first_name' }),
      this.dropNotNull({ schema: 'public', table: 'employee', column: 'last_name' }),
      this.dropNotNull({ schema: 'public', table: 'employee', column: 'middle_name' }),
      this.addUnique({
        schema: 'public',
        table: 'account',
        constraint: 'account_email_key',
        columns: ['email'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
