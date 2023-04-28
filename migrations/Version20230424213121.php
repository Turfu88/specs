<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230424213121 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE area (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, uid VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE area_user (area_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_4FD6F956BD0F409C (area_id), INDEX IDX_4FD6F956A76ED395 (user_id), PRIMARY KEY(area_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE area_project (area_id INT NOT NULL, project_id INT NOT NULL, INDEX IDX_2C63B913BD0F409C (area_id), INDEX IDX_2C63B913166D1F9C (project_id), PRIMARY KEY(area_id, project_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE connection (id INT AUTO_INCREMENT NOT NULL, feature_id INT DEFAULT NULL, project_id INT NOT NULL, source_id INT DEFAULT NULL, uid VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, code VARCHAR(255) DEFAULT NULL, status VARCHAR(255) DEFAULT NULL, description LONGTEXT DEFAULT NULL, is_from_core TINYINT(1) NOT NULL, url VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX IDX_29F7736660E4B879 (feature_id), INDEX IDX_29F77366166D1F9C (project_id), INDEX IDX_29F77366953C1C61 (source_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE connection_element (connection_id INT NOT NULL, element_id INT NOT NULL, INDEX IDX_3A4AB81ADD03F01 (connection_id), INDEX IDX_3A4AB81A1F1F2A24 (element_id), PRIMARY KEY(connection_id, element_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE element (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, source_id INT DEFAULT NULL, uid VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, comment LONGTEXT DEFAULT NULL, is_from_core TINYINT(1) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX IDX_41405E39166D1F9C (project_id), INDEX IDX_41405E39953C1C61 (source_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE feature (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, source_id INT DEFAULT NULL, page_id INT DEFAULT NULL, uid VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, status VARCHAR(255) DEFAULT NULL, description LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, finished_at DATETIME DEFAULT NULL, is_from_core TINYINT(1) NOT NULL, section VARCHAR(255) DEFAULT NULL, INDEX IDX_1FD77566166D1F9C (project_id), INDEX IDX_1FD77566953C1C61 (source_id), INDEX IDX_1FD77566C4663E4 (page_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE feedback (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, project_id INT NOT NULL, summary_id INT DEFAULT NULL, page_id INT DEFAULT NULL, feature_id INT DEFAULT NULL, spec_id INT DEFAULT NULL, connection_id INT DEFAULT NULL, uid VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, content LONGTEXT NOT NULL, status VARCHAR(255) DEFAULT NULL, to_treat TINYINT(1) NOT NULL, INDEX IDX_D2294458A76ED395 (user_id), INDEX IDX_D2294458166D1F9C (project_id), INDEX IDX_D22944582AC2D45C (summary_id), INDEX IDX_D2294458C4663E4 (page_id), INDEX IDX_D229445860E4B879 (feature_id), INDEX IDX_D2294458AA8FA4FB (spec_id), INDEX IDX_D2294458DD03F01 (connection_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE history (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, summary_id INT DEFAULT NULL, page_id INT DEFAULT NULL, feature_id INT DEFAULT NULL, spec_id INT DEFAULT NULL, connection_id INT DEFAULT NULL, uid VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, content VARCHAR(255) NOT NULL, INDEX IDX_27BA704B166D1F9C (project_id), INDEX IDX_27BA704B2AC2D45C (summary_id), INDEX IDX_27BA704BC4663E4 (page_id), INDEX IDX_27BA704B60E4B879 (feature_id), INDEX IDX_27BA704BAA8FA4FB (spec_id), INDEX IDX_27BA704BDD03F01 (connection_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE page (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, source_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, uid VARCHAR(255) NOT NULL, status VARCHAR(255) DEFAULT NULL, comment LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, finished_at DATETIME DEFAULT NULL, category VARCHAR(255) DEFAULT NULL, model_url VARCHAR(255) DEFAULT NULL, is_model_ok TINYINT(1) NOT NULL, is_from_core TINYINT(1) NOT NULL, is_private TINYINT(1) NOT NULL, INDEX IDX_140AB620166D1F9C (project_id), INDEX IDX_140AB620953C1C61 (source_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project (id INT AUTO_INCREMENT NOT NULL, source_id INT DEFAULT NULL, uid VARCHAR(255) NOT NULL, version VARCHAR(255) DEFAULT NULL, previous_version VARCHAR(255) DEFAULT NULL, name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, finished_at DATETIME DEFAULT NULL, status VARCHAR(255) DEFAULT NULL, comment LONGTEXT DEFAULT NULL, is_core TINYINT(1) NOT NULL, dev_access LONGTEXT DEFAULT NULL, status_choices LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', status_colors LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', section_choices LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', INDEX IDX_2FB3D0EE953C1C61 (source_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE spec (id INT AUTO_INCREMENT NOT NULL, feature_id INT NOT NULL, source_id INT DEFAULT NULL, uid VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, status VARCHAR(255) DEFAULT NULL, is_from_core TINYINT(1) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, finished_at DATETIME DEFAULT NULL, INDEX IDX_C00E173E60E4B879 (feature_id), INDEX IDX_C00E173E953C1C61 (source_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE spec_element (spec_id INT NOT NULL, element_id INT NOT NULL, INDEX IDX_D429D5E0AA8FA4FB (spec_id), INDEX IDX_D429D5E01F1F2A24 (element_id), PRIMARY KEY(spec_id, element_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE summary (id INT AUTO_INCREMENT NOT NULL, project_id INT NOT NULL, uid VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, version VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, content LONGTEXT DEFAULT NULL, status VARCHAR(255) NOT NULL, INDEX IDX_CE286663166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(180) NOT NULL, firstname VARCHAR(180) NOT NULL, lastname VARCHAR(180) NOT NULL, company VARCHAR(180) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE area_user ADD CONSTRAINT FK_4FD6F956BD0F409C FOREIGN KEY (area_id) REFERENCES area (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE area_user ADD CONSTRAINT FK_4FD6F956A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE area_project ADD CONSTRAINT FK_2C63B913BD0F409C FOREIGN KEY (area_id) REFERENCES area (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE area_project ADD CONSTRAINT FK_2C63B913166D1F9C FOREIGN KEY (project_id) REFERENCES project (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE connection ADD CONSTRAINT FK_29F7736660E4B879 FOREIGN KEY (feature_id) REFERENCES feature (id)');
        $this->addSql('ALTER TABLE connection ADD CONSTRAINT FK_29F77366166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE connection ADD CONSTRAINT FK_29F77366953C1C61 FOREIGN KEY (source_id) REFERENCES connection (id)');
        $this->addSql('ALTER TABLE connection_element ADD CONSTRAINT FK_3A4AB81ADD03F01 FOREIGN KEY (connection_id) REFERENCES connection (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE connection_element ADD CONSTRAINT FK_3A4AB81A1F1F2A24 FOREIGN KEY (element_id) REFERENCES element (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE element ADD CONSTRAINT FK_41405E39166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE element ADD CONSTRAINT FK_41405E39953C1C61 FOREIGN KEY (source_id) REFERENCES element (id)');
        $this->addSql('ALTER TABLE feature ADD CONSTRAINT FK_1FD77566166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE feature ADD CONSTRAINT FK_1FD77566953C1C61 FOREIGN KEY (source_id) REFERENCES feature (id)');
        $this->addSql('ALTER TABLE feature ADD CONSTRAINT FK_1FD77566C4663E4 FOREIGN KEY (page_id) REFERENCES page (id)');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D2294458A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D2294458166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D22944582AC2D45C FOREIGN KEY (summary_id) REFERENCES summary (id)');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D2294458C4663E4 FOREIGN KEY (page_id) REFERENCES page (id)');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D229445860E4B879 FOREIGN KEY (feature_id) REFERENCES feature (id)');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D2294458AA8FA4FB FOREIGN KEY (spec_id) REFERENCES spec (id)');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D2294458DD03F01 FOREIGN KEY (connection_id) REFERENCES connection (id)');
        $this->addSql('ALTER TABLE history ADD CONSTRAINT FK_27BA704B166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE history ADD CONSTRAINT FK_27BA704B2AC2D45C FOREIGN KEY (summary_id) REFERENCES summary (id)');
        $this->addSql('ALTER TABLE history ADD CONSTRAINT FK_27BA704BC4663E4 FOREIGN KEY (page_id) REFERENCES page (id)');
        $this->addSql('ALTER TABLE history ADD CONSTRAINT FK_27BA704B60E4B879 FOREIGN KEY (feature_id) REFERENCES feature (id)');
        $this->addSql('ALTER TABLE history ADD CONSTRAINT FK_27BA704BAA8FA4FB FOREIGN KEY (spec_id) REFERENCES spec (id)');
        $this->addSql('ALTER TABLE history ADD CONSTRAINT FK_27BA704BDD03F01 FOREIGN KEY (connection_id) REFERENCES connection (id)');
        $this->addSql('ALTER TABLE page ADD CONSTRAINT FK_140AB620166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE page ADD CONSTRAINT FK_140AB620953C1C61 FOREIGN KEY (source_id) REFERENCES page (id)');
        $this->addSql('ALTER TABLE project ADD CONSTRAINT FK_2FB3D0EE953C1C61 FOREIGN KEY (source_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE spec ADD CONSTRAINT FK_C00E173E60E4B879 FOREIGN KEY (feature_id) REFERENCES feature (id)');
        $this->addSql('ALTER TABLE spec ADD CONSTRAINT FK_C00E173E953C1C61 FOREIGN KEY (source_id) REFERENCES spec (id)');
        $this->addSql('ALTER TABLE spec_element ADD CONSTRAINT FK_D429D5E0AA8FA4FB FOREIGN KEY (spec_id) REFERENCES spec (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE spec_element ADD CONSTRAINT FK_D429D5E01F1F2A24 FOREIGN KEY (element_id) REFERENCES element (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE summary ADD CONSTRAINT FK_CE286663166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE area_user DROP FOREIGN KEY FK_4FD6F956BD0F409C');
        $this->addSql('ALTER TABLE area_user DROP FOREIGN KEY FK_4FD6F956A76ED395');
        $this->addSql('ALTER TABLE area_project DROP FOREIGN KEY FK_2C63B913BD0F409C');
        $this->addSql('ALTER TABLE area_project DROP FOREIGN KEY FK_2C63B913166D1F9C');
        $this->addSql('ALTER TABLE connection DROP FOREIGN KEY FK_29F7736660E4B879');
        $this->addSql('ALTER TABLE connection DROP FOREIGN KEY FK_29F77366166D1F9C');
        $this->addSql('ALTER TABLE connection DROP FOREIGN KEY FK_29F77366953C1C61');
        $this->addSql('ALTER TABLE connection_element DROP FOREIGN KEY FK_3A4AB81ADD03F01');
        $this->addSql('ALTER TABLE connection_element DROP FOREIGN KEY FK_3A4AB81A1F1F2A24');
        $this->addSql('ALTER TABLE element DROP FOREIGN KEY FK_41405E39166D1F9C');
        $this->addSql('ALTER TABLE element DROP FOREIGN KEY FK_41405E39953C1C61');
        $this->addSql('ALTER TABLE feature DROP FOREIGN KEY FK_1FD77566166D1F9C');
        $this->addSql('ALTER TABLE feature DROP FOREIGN KEY FK_1FD77566953C1C61');
        $this->addSql('ALTER TABLE feature DROP FOREIGN KEY FK_1FD77566C4663E4');
        $this->addSql('ALTER TABLE feedback DROP FOREIGN KEY FK_D2294458A76ED395');
        $this->addSql('ALTER TABLE feedback DROP FOREIGN KEY FK_D2294458166D1F9C');
        $this->addSql('ALTER TABLE feedback DROP FOREIGN KEY FK_D22944582AC2D45C');
        $this->addSql('ALTER TABLE feedback DROP FOREIGN KEY FK_D2294458C4663E4');
        $this->addSql('ALTER TABLE feedback DROP FOREIGN KEY FK_D229445860E4B879');
        $this->addSql('ALTER TABLE feedback DROP FOREIGN KEY FK_D2294458AA8FA4FB');
        $this->addSql('ALTER TABLE feedback DROP FOREIGN KEY FK_D2294458DD03F01');
        $this->addSql('ALTER TABLE history DROP FOREIGN KEY FK_27BA704B166D1F9C');
        $this->addSql('ALTER TABLE history DROP FOREIGN KEY FK_27BA704B2AC2D45C');
        $this->addSql('ALTER TABLE history DROP FOREIGN KEY FK_27BA704BC4663E4');
        $this->addSql('ALTER TABLE history DROP FOREIGN KEY FK_27BA704B60E4B879');
        $this->addSql('ALTER TABLE history DROP FOREIGN KEY FK_27BA704BAA8FA4FB');
        $this->addSql('ALTER TABLE history DROP FOREIGN KEY FK_27BA704BDD03F01');
        $this->addSql('ALTER TABLE page DROP FOREIGN KEY FK_140AB620166D1F9C');
        $this->addSql('ALTER TABLE page DROP FOREIGN KEY FK_140AB620953C1C61');
        $this->addSql('ALTER TABLE project DROP FOREIGN KEY FK_2FB3D0EE953C1C61');
        $this->addSql('ALTER TABLE spec DROP FOREIGN KEY FK_C00E173E60E4B879');
        $this->addSql('ALTER TABLE spec DROP FOREIGN KEY FK_C00E173E953C1C61');
        $this->addSql('ALTER TABLE spec_element DROP FOREIGN KEY FK_D429D5E0AA8FA4FB');
        $this->addSql('ALTER TABLE spec_element DROP FOREIGN KEY FK_D429D5E01F1F2A24');
        $this->addSql('ALTER TABLE summary DROP FOREIGN KEY FK_CE286663166D1F9C');
        $this->addSql('DROP TABLE area');
        $this->addSql('DROP TABLE area_user');
        $this->addSql('DROP TABLE area_project');
        $this->addSql('DROP TABLE connection');
        $this->addSql('DROP TABLE connection_element');
        $this->addSql('DROP TABLE element');
        $this->addSql('DROP TABLE feature');
        $this->addSql('DROP TABLE feedback');
        $this->addSql('DROP TABLE history');
        $this->addSql('DROP TABLE page');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE spec');
        $this->addSql('DROP TABLE spec_element');
        $this->addSql('DROP TABLE summary');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
