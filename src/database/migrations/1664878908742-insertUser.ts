import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertUser1664878908742 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO public.user (fullname, username, password, image, role) VALUES ('Aldinsyah Dzikri Pramadafi', 'aldinsyah', '$2a$10$dlqsw0f8vWAD3vX84wqPT.b0uqHZt2XCcKbYYgA8W7iQrup/o5k3q', 'https://ucarecdn.com/dc5c457f-decb-4488-a6c9-fe9a783d5821/', 'admin')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM user`);
  }
}
