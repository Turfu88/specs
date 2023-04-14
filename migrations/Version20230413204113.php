<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230413204113 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE feature ADD page_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE feature ADD CONSTRAINT FK_1FD77566C4663E4 FOREIGN KEY (page_id) REFERENCES page (id)');
        $this->addSql('CREATE INDEX IDX_1FD77566C4663E4 ON feature (page_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE feature DROP FOREIGN KEY FK_1FD77566C4663E4');
        $this->addSql('DROP INDEX IDX_1FD77566C4663E4 ON feature');
        $this->addSql('ALTER TABLE feature DROP page_id');
    }
}
