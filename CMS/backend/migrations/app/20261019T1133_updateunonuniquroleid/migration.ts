#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/29ce8359a32c4577d20f739d3b66906b5470219ed6056e114d67f2b6083b54f6/contract';
import endContract from '../../snapshots/29ce8359a32c4577d20f739d3b66906b5470219ed6056e114d67f2b6083b54f6/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/3b69f8f504662634f925a4a0b9fac99ec2d561f978723e753a68c67e80993eab/contract';
import startContract from '../../snapshots/3b69f8f504662634f925a4a0b9fac99ec2d561f978723e753a68c67e80993eab/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropConstraint({
        schema: 'public',
        table: 'account',
        constraint: 'account_account_role_id_key',
      }),
      this.dropIndex({
        schema: 'public',
        table: 'employee',
        index: 'employee_account_id_idx_3b48271c',
      }),
      this.addUnique({
        schema: 'public',
        table: 'employee',
        constraint: 'employee_account_id_key',
        columns: ['account_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'account',
        index: 'account_account_role_id_idx_e5327e38',
        columns: ['account_role_id'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
