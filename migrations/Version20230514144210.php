<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230514144210 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE validation (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, project_id INT NOT NULL, page_id INT DEFAULT NULL, feature_id INT DEFAULT NULL, connection_id INT DEFAULT NULL, spec_id INT DEFAULT NULL, type VARCHAR(255) NOT NULL, created DATETIME NOT NULL, INDEX IDX_16AC5B6EA76ED395 (user_id), INDEX IDX_16AC5B6E166D1F9C (project_id), INDEX IDX_16AC5B6EC4663E4 (page_id), INDEX IDX_16AC5B6E60E4B879 (feature_id), INDEX IDX_16AC5B6EDD03F01 (connection_id), INDEX IDX_16AC5B6EAA8FA4FB (spec_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE validation ADD CONSTRAINT FK_16AC5B6EA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE validation ADD CONSTRAINT FK_16AC5B6E166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE validation ADD CONSTRAINT FK_16AC5B6EC4663E4 FOREIGN KEY (page_id) REFERENCES page (id)');
        $this->addSql('ALTER TABLE validation ADD CONSTRAINT FK_16AC5B6E60E4B879 FOREIGN KEY (feature_id) REFERENCES feature (id)');
        $this->addSql('ALTER TABLE validation ADD CONSTRAINT FK_16AC5B6EDD03F01 FOREIGN KEY (connection_id) REFERENCES connection (id)');
        $this->addSql('ALTER TABLE validation ADD CONSTRAINT FK_16AC5B6EAA8FA4FB FOREIGN KEY (spec_id) REFERENCES spec (id)');
        $this->addSql('ALTER TABLE project ADD validators INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE validation DROP FOREIGN KEY FK_16AC5B6EA76ED395');
        $this->addSql('ALTER TABLE validation DROP FOREIGN KEY FK_16AC5B6E166D1F9C');
        $this->addSql('ALTER TABLE validation DROP FOREIGN KEY FK_16AC5B6EC4663E4');
        $this->addSql('ALTER TABLE validation DROP FOREIGN KEY FK_16AC5B6E60E4B879');
        $this->addSql('ALTER TABLE validation DROP FOREIGN KEY FK_16AC5B6EDD03F01');
        $this->addSql('ALTER TABLE validation DROP FOREIGN KEY FK_16AC5B6EAA8FA4FB');
        $this->addSql('DROP TABLE validation');
        $this->addSql('ALTER TABLE project DROP validators');
    }
}
