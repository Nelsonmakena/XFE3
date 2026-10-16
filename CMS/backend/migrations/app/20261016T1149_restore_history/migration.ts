#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/d76c87339121c309b6d087fc86594e40f010068bbea2a0d3e99072efc132a31b/contract';
import endContract from '../../snapshots/d76c87339121c309b6d087fc86594e40f010068bbea2a0d3e99072efc132a31b/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/e1af423d373e8c23d9ea50cb53f0b7029746df72c54b560660c495d2382d9dfd/contract';
import startContract from '../../snapshots/e1af423d373e8c23d9ea50cb53f0b7029746df72c54b560660c495d2382d9dfd/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropIndex({
        schema: 'public',
        table: 'account',
        index: 'account_account_role_id_idx_e5327e38',
      }),
      this.createTable({
        schema: 'public',
        table: 'category',
        columns: [
          col('category_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('category_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['category_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'clinical_assessment',
        columns: [
          col('assessed_by', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('assessment', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('assessment_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('encounter_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['assessment_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'differential_diagnosis',
        columns: [
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('differential_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('encounter_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('notes', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['differential_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'dispensing',
        columns: [
          col('dispensed_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('dispensed_by', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('dispensing_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('medicine_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('prescription_item_id', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
          col('quantity_dispensed', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['dispensing_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'employee',
        columns: [
          col('account_id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('added_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('employee_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('first_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('last_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('middle_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['employee_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'encounter',
        columns: [
          col('check_in_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('complaints', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('created_by', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('encounter_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('encounter_type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('patient_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['encounter_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'final_diagnosis',
        columns: [
          col('diagnosis', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('encounter_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('final_diagnosis_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('notes', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['final_diagnosis_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'inventory',
        columns: [
          col('category_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('inventory_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['inventory_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'lab_request',
        columns: [
          col('encounter_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('lab_request_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('laboratory_note', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('time_requested', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
        ],
        constraints: [primaryKey(['lab_request_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'lab_test',
        columns: [
          col('lab_request_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('lab_test_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('test_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['lab_test_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'lab_test_results',
        columns: [
          col('lab_test_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('lab_test_results', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('performed_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('performed_by', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('results', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['lab_test_results'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'medicine',
        columns: [
          col('base_unit', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('category_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('form', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('medicine_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('medicine_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['medicine_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'patient',
        columns: [
          col('added_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('address', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('date_of_birth', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('first_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('last_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('middle_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('patient_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['patient_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'prescription',
        columns: [
          col('final_diagnosis_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('prescription_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['prescription_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'prescription_item',
        columns: [
          col('dosage', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('duration', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('frequency', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('instructions', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('medicine_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('prescription_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('prescription_item_id', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
        ],
        constraints: [primaryKey(['prescription_item_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'receiving_stock',
        columns: [
          col('boxes_received', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('inventory_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('received_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('received_by', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('receiving_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('supplier_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('units_per_box', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['receiving_id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'underlying_condition',
        columns: [
          col('condition_name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('date_added', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('diagnosed_at', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('notes', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('patient_id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('underlying_condition', 'uuid', {
            notNull: true,
            codecRef: { codecId: 'pg/uuid@1' },
          }),
        ],
        constraints: [primaryKey(['underlying_condition'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'account',
        constraint: 'account_account_role_id_key',
        columns: ['account_role_id'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'account_role',
        constraint: 'account_role_role_name_key',
        columns: ['role_name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'final_diagnosis',
        constraint: 'final_diagnosis_encounter_id_key',
        columns: ['encounter_id'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'inventory',
        constraint: 'inventory_category_id_key',
        columns: ['category_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'clinical_assessment',
        index: 'clinical_assessment_assessed_by_idx_dddbe837',
        columns: ['assessed_by'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'clinical_assessment',
        index: 'clinical_assessment_encounter_id_idx_3c340cf5',
        columns: ['encounter_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'differential_diagnosis',
        index: 'differential_diagnosis_encounter_id_idx_3c340cf5',
        columns: ['encounter_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'dispensing',
        index: 'dispensing_dispensed_by_idx_1f96d953',
        columns: ['dispensed_by'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'dispensing',
        index: 'dispensing_medicine_id_idx_8f174ab8',
        columns: ['medicine_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'employee',
        index: 'employee_account_id_idx_3b48271c',
        columns: ['account_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'encounter',
        index: 'encounter_created_by_idx_e13bb8bf',
        columns: ['created_by'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'encounter',
        index: 'encounter_patient_id_idx_2f641dda',
        columns: ['patient_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'lab_request',
        index: 'lab_request_encounter_id_idx_3c340cf5',
        columns: ['encounter_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'lab_test',
        index: 'lab_test_lab_request_id_idx_aca1b976',
        columns: ['lab_request_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'lab_test_results',
        index: 'lab_test_results_lab_test_id_idx_59478788',
        columns: ['lab_test_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'medicine',
        index: 'medicine_category_id_idx_da7213d4',
        columns: ['category_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'prescription',
        index: 'prescription_final_diagnosis_id_idx_c1394b3c',
        columns: ['final_diagnosis_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'prescription_item',
        index: 'prescription_item_prescription_id_idx_de1745f5',
        columns: ['prescription_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'receiving_stock',
        index: 'receiving_stock_inventory_id_idx_d5937af2',
        columns: ['inventory_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'underlying_condition',
        index: 'underlying_condition_patient_id_idx_2f641dda',
        columns: ['patient_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'category',
        foreignKey: {
          name: 'category_category_id_fkey',
          columns: ['category_id'],
          references: { schema: 'public', table: 'inventory', columns: ['category_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'clinical_assessment',
        foreignKey: {
          name: 'clinical_assessment_encounter_id_fkey',
          columns: ['encounter_id'],
          references: { schema: 'public', table: 'encounter', columns: ['encounter_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'clinical_assessment',
        foreignKey: {
          name: 'clinical_assessment_assessed_by_fkey',
          columns: ['assessed_by'],
          references: { schema: 'public', table: 'employee', columns: ['employee_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'differential_diagnosis',
        foreignKey: {
          name: 'differential_diagnosis_encounter_id_fkey',
          columns: ['encounter_id'],
          references: { schema: 'public', table: 'encounter', columns: ['encounter_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'dispensing',
        foreignKey: {
          name: 'dispensing_medicine_id_fkey',
          columns: ['medicine_id'],
          references: { schema: 'public', table: 'medicine', columns: ['medicine_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'dispensing',
        foreignKey: {
          name: 'dispensing_dispensed_by_fkey',
          columns: ['dispensed_by'],
          references: { schema: 'public', table: 'employee', columns: ['employee_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'employee',
        foreignKey: {
          name: 'employee_account_id_fkey',
          columns: ['account_id'],
          references: { schema: 'public', table: 'account', columns: ['account_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'encounter',
        foreignKey: {
          name: 'encounter_patient_id_fkey',
          columns: ['patient_id'],
          references: { schema: 'public', table: 'patient', columns: ['patient_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'encounter',
        foreignKey: {
          name: 'encounter_created_by_fkey',
          columns: ['created_by'],
          references: { schema: 'public', table: 'employee', columns: ['employee_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'final_diagnosis',
        foreignKey: {
          name: 'final_diagnosis_encounter_id_fkey',
          columns: ['encounter_id'],
          references: { schema: 'public', table: 'encounter', columns: ['encounter_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'inventory',
        foreignKey: {
          name: 'inventory_category_id_fkey',
          columns: ['category_id'],
          references: { schema: 'public', table: 'category', columns: ['category_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'lab_request',
        foreignKey: {
          name: 'lab_request_encounter_id_fkey',
          columns: ['encounter_id'],
          references: { schema: 'public', table: 'encounter', columns: ['encounter_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'lab_test',
        foreignKey: {
          name: 'lab_test_lab_request_id_fkey',
          columns: ['lab_request_id'],
          references: { schema: 'public', table: 'lab_request', columns: ['lab_request_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'lab_test_results',
        foreignKey: {
          name: 'lab_test_results_lab_test_id_fkey',
          columns: ['lab_test_id'],
          references: { schema: 'public', table: 'lab_test', columns: ['lab_test_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'medicine',
        foreignKey: {
          name: 'medicine_category_id_fkey',
          columns: ['category_id'],
          references: { schema: 'public', table: 'category', columns: ['category_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'prescription',
        foreignKey: {
          name: 'prescription_final_diagnosis_id_fkey',
          columns: ['final_diagnosis_id'],
          references: {
            schema: 'public',
            table: 'final_diagnosis',
            columns: ['final_diagnosis_id'],
          },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'prescription_item',
        foreignKey: {
          name: 'prescription_item_prescription_id_fkey',
          columns: ['prescription_id'],
          references: { schema: 'public', table: 'prescription', columns: ['prescription_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'receiving_stock',
        foreignKey: {
          name: 'receiving_stock_inventory_id_fkey',
          columns: ['inventory_id'],
          references: { schema: 'public', table: 'inventory', columns: ['inventory_id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'underlying_condition',
        foreignKey: {
          name: 'underlying_condition_patient_id_fkey',
          columns: ['patient_id'],
          references: { schema: 'public', table: 'patient', columns: ['patient_id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
