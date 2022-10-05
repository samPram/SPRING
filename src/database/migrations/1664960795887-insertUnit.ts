import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertUnit1664960795887 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public.unit (name, description) VALUES ('Unit A', 'Pabprik tekstik Surabaya')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM public.unit`);
  }
}
