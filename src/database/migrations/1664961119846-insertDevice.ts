import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertDevice1664961119846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public.device (id_device, name, description, unit_size, max, min, unit_id) VALUES ('SW-01', 'Debit', 'Take debit data per second', 'm3/s', '60', '20', '1'), ('SW-02', 'TSS', 'Take TSS data per liter', 'mg/L', '120', '80', '1'), ('SW-03', 'pH', 'Take the pH data', '', '9', '4', '1'), ('SW-04', 'NO3N', 'Take NO3N data per liter', 'mg/L', '110', '90', '1'), ('SW-05', 'PO4', 'Take PO4 data per liter', 'mg/L', '180', '120', '1'), ('SW-06', 'NH3N', 'Take NH3N data per liter', 'mg/L', '150', '90', '1'), ('SW-07', 'TDS', 'Take TDS data per liter', 'mg/L', '170', '60', '1'), ('SW-08', 'BOD 5', 'Take BOD5 data per liter', 'mg/L', '140', '110', '1'), ('SW-09', 'COD', 'Take COD data per liter', 'mg/lL', '80', '20', '1'), ('SW-10', 'Fe', 'Take Fe data per liter', 'mg/L', '24', '8', '1'), ('SW-11', 'Cu', 'Take Cu data per liter', 'mg/L', '12', '6', '1'), ('SW-12', 'Cr', 'Take Cr data per second', 'mg/L', '20', '8', '1')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * from public.device`);
  }
}
