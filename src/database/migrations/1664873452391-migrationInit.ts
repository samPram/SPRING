import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrationInit1664873452391 implements MigrationInterface {
  name = 'migrationInit1664873452391';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "unit" ("id_unit" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(144) NOT NULL, CONSTRAINT "PK_0d5982864a375c7f432ff8ee95b" PRIMARY KEY ("id_unit"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "device" ("id_device" character varying NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(144) NOT NULL, "unit_size" character varying(12) NOT NULL, "max" integer NOT NULL, "min" integer NOT NULL, "unit_id" integer, CONSTRAINT "PK_94a40133d61e35487e3d231d88a" PRIMARY KEY ("id_device"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "monitoring" ("id_monitoring" SERIAL NOT NULL, "value" integer NOT NULL DEFAULT '0', "datetime" TIMESTAMP NOT NULL, "status" "public"."monitoring_status_enum" NOT NULL DEFAULT 'success', "device_id" character varying, CONSTRAINT "PK_e76a9cb114ff0055a82f2223c63" PRIMARY KEY ("id_monitoring"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id_user" SERIAL NOT NULL, "fullname" character varying(50) NOT NULL, "username" character varying(12) NOT NULL, "password" character varying(144) NOT NULL, "image" character varying(144) NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'admin', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_9664961c0264d34a3cf82b11700" PRIMARY KEY ("id_user"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `,
    );
    await queryRunner.query(
      `ALTER TABLE "device" ADD CONSTRAINT "FK_ca51ac452be669f5f5b50f34fd7" FOREIGN KEY ("unit_id") REFERENCES "unit"("id_unit") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "monitoring" ADD CONSTRAINT "FK_5b882532ef0761175af6d88c663" FOREIGN KEY ("device_id") REFERENCES "device"("id_device") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "monitoring" DROP CONSTRAINT "FK_5b882532ef0761175af6d88c663"`,
    );
    await queryRunner.query(
      `ALTER TABLE "device" DROP CONSTRAINT "FK_ca51ac452be669f5f5b50f34fd7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "monitoring"`);
    await queryRunner.query(`DROP TABLE "device"`);
    await queryRunner.query(`DROP TABLE "unit"`);
  }
}
