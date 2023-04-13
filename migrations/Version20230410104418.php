<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230410104418 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE entry_point ADD source_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE entry_point ADD CONSTRAINT FK_33BF9082953C1C61 FOREIGN KEY (source_id) REFERENCES entry_point (id)');
        $this->addSql('CREATE INDEX IDX_33BF9082953C1C61 ON entry_point (source_id)');
        $this->addSql('ALTER TABLE feature ADD source_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE feature ADD CONSTRAINT FK_1FD77566953C1C61 FOREIGN KEY (source_id) REFERENCES feature (id)');
        $this->addSql('CREATE INDEX IDX_1FD77566953C1C61 ON feature (source_id)');
        $this->addSql('ALTER TABLE page ADD source_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE page ADD CONSTRAINT FK_140AB620953C1C61 FOREIGN KEY (source_id) REFERENCES page (id)');
        $this->addSql('CREATE INDEX IDX_140AB620953C1C61 ON page (source_id)');
        $this->addSql('ALTER TABLE project ADD source_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE project ADD CONSTRAINT FK_2FB3D0EE953C1C61 FOREIGN KEY (source_id) REFERENCES project (id)');
        $this->addSql('CREATE INDEX IDX_2FB3D0EE953C1C61 ON project (source_id)');
        $this->addSql('ALTER TABLE section ADD source_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE section ADD CONSTRAINT FK_2D737AEF953C1C61 FOREIGN KEY (source_id) REFERENCES section (id)');
        $this->addSql('CREATE INDEX IDX_2D737AEF953C1C61 ON section (source_id)');
        $this->addSql('ALTER TABLE spec ADD source_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE spec ADD CONSTRAINT FK_C00E173E953C1C61 FOREIGN KEY (source_id) REFERENCES spec (id)');
        $this->addSql('CREATE INDEX IDX_C00E173E953C1C61 ON spec (source_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE entry_point DROP FOREIGN KEY FK_33BF9082953C1C61');
        $this->addSql('DROP INDEX IDX_33BF9082953C1C61 ON entry_point');
        $this->addSql('ALTER TABLE entry_point DROP source_id');
        $this->addSql('ALTER TABLE feature DROP FOREIGN KEY FK_1FD77566953C1C61');
        $this->addSql('DROP INDEX IDX_1FD77566953C1C61 ON feature');
        $this->addSql('ALTER TABLE feature DROP source_id');
        $this->addSql('ALTER TABLE page DROP FOREIGN KEY FK_140AB620953C1C61');
        $this->addSql('DROP INDEX IDX_140AB620953C1C61 ON page');
        $this->addSql('ALTER TABLE page DROP source_id');
        $this->addSql('ALTER TABLE project DROP FOREIGN KEY FK_2FB3D0EE953C1C61');
        $this->addSql('DROP INDEX IDX_2FB3D0EE953C1C61 ON project');
        $this->addSql('ALTER TABLE project DROP source_id');
        $this->addSql('ALTER TABLE section DROP FOREIGN KEY FK_2D737AEF953C1C61');
        $this->addSql('DROP INDEX IDX_2D737AEF953C1C61 ON section');
        $this->addSql('ALTER TABLE section DROP source_id');
        $this->addSql('ALTER TABLE spec DROP FOREIGN KEY FK_C00E173E953C1C61');
        $this->addSql('DROP INDEX IDX_C00E173E953C1C61 ON spec');
        $this->addSql('ALTER TABLE spec DROP source_id');
    }
}
