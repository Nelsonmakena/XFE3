#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/26f13ab92138fad14eb76fe52c45a31fa0d401982705137e4cdf321f5b5b9098/contract';
import endContract from '../../snapshots/26f13ab92138fad14eb76fe52c45a31fa0d401982705137e4cdf321f5b5b9098/contract.json' with { type: 'json' };
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
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
