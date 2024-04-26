import {MigrationInterface, QueryRunner} from "typeorm";

export class hkInitial1714152261720 implements MigrationInterface {
    name = 'hkInitial1714152261720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`announcements\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`name\` varchar(100) NULL, \`address\` varchar(255) NULL, \`project_type\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`employer_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`login\` varchar(255) NULL, \`email\` varchar(255) NULL, \`first_name\` varchar(100) NULL, \`last_name\` varchar(100) NULL, \`crypted_password\` varchar(100) NULL, \`is_marketing\` tinyint NULL DEFAULT 0, \`userId\` int NULL, \`created_at\` datetime NULL, \`updated_at\` datetime NULL, \`phoneNo\` varchar(255) NULL, \`verificationToken\` varchar(255) NULL, \`verified\` tinyint NOT NULL DEFAULT 0, \`isActivated\` tinyint NOT NULL DEFAULT 1, \`ownerAccount\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
        await queryRunner.query(`DROP TABLE \`announcements\``);
    }

}
