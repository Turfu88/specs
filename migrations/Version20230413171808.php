<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230413171808 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE feature DROP FOREIGN KEY FK_1FD77566D823E37A');
        $this->addSql('ALTER TABLE feedback DROP FOREIGN KEY FK_D2294458D823E37A');
        $this->addSql('ALTER TABLE history DROP FOREIGN KEY FK_27BA704BD823E37A');
        $this->addSql('ALTER TABLE link DROP FOREIGN KEY FK_36AC99F1D823E37A');
        $this->addSql('ALTER TABLE section DROP FOREIGN KEY FK_2D737AEF953C1C61');
        $this->addSql('ALTER TABLE section DROP FOREIGN KEY FK_2D737AEFC4663E4');
        $this->addSql('DROP TABLE section');
        $this->addSql('DROP INDEX IDX_1FD77566D823E37A ON feature');
        $this->addSql('ALTER TABLE feature ADD section VARCHAR(255) DEFAULT NULL, DROP section_id');
        $this->addSql('DROP INDEX IDX_D2294458D823E37A ON feedback');
        $this->addSql('ALTER TABLE feedback DROP section_id');
        $this->addSql('DROP INDEX IDX_27BA704BD823E37A ON history');
        $this->addSql('ALTER TABLE history DROP section_id');
        $this->addSql('DROP INDEX IDX_36AC99F1D823E37A ON link');
        $this->addSql('ALTER TABLE link DROP section_id');
        $this->addSql('ALTER TABLE project ADD section LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', ADD status_choices LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\'');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE section (id INT AUTO_INCREMENT NOT NULL, page_id INT NOT NULL, source_id INT DEFAULT NULL, uid VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, status VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, comment LONGTEXT CHARACTER SET utf8mb4 DEFAULT NULL COLLATE `utf8mb4_unicode_ci`, finished_at DATETIME DEFAULT NULL, is_from_core TINYINT(1) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX IDX_2D737AEF953C1C61 (source_id), INDEX IDX_2D737AEFC4663E4 (page_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE section ADD CONSTRAINT FK_2D737AEF953C1C61 FOREIGN KEY (source_id) REFERENCES section (id)');
        $this->addSql('ALTER TABLE section ADD CONSTRAINT FK_2D737AEFC4663E4 FOREIGN KEY (page_id) REFERENCES page (id)');
        $this->addSql('ALTER TABLE feature ADD section_id INT DEFAULT NULL, DROP section');
        $this->addSql('ALTER TABLE feature ADD CONSTRAINT FK_1FD77566D823E37A FOREIGN KEY (section_id) REFERENCES section (id)');
        $this->addSql('CREATE INDEX IDX_1FD77566D823E37A ON feature (section_id)');
        $this->addSql('ALTER TABLE feedback ADD section_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D2294458D823E37A FOREIGN KEY (section_id) REFERENCES section (id)');
        $this->addSql('CREATE INDEX IDX_D2294458D823E37A ON feedback (section_id)');
        $this->addSql('ALTER TABLE history ADD section_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE history ADD CONSTRAINT FK_27BA704BD823E37A FOREIGN KEY (section_id) REFERENCES section (id)');
        $this->addSql('CREATE INDEX IDX_27BA704BD823E37A ON history (section_id)');
        $this->addSql('ALTER TABLE link ADD section_id INT NOT NULL');
        $this->addSql('ALTER TABLE link ADD CONSTRAINT FK_36AC99F1D823E37A FOREIGN KEY (section_id) REFERENCES section (id)');
        $this->addSql('CREATE INDEX IDX_36AC99F1D823E37A ON link (section_id)');
        $this->addSql('ALTER TABLE project DROP section, DROP status_choices');
    }
}
