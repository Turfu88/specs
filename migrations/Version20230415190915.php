<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230415190915 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE entry_point_element (entry_point_id INT NOT NULL, element_id INT NOT NULL, INDEX IDX_C6C32829AE6F2EEA (entry_point_id), INDEX IDX_C6C328291F1F2A24 (element_id), PRIMARY KEY(entry_point_id, element_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE spec_element (spec_id INT NOT NULL, element_id INT NOT NULL, INDEX IDX_D429D5E0AA8FA4FB (spec_id), INDEX IDX_D429D5E01F1F2A24 (element_id), PRIMARY KEY(spec_id, element_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE entry_point_element ADD CONSTRAINT FK_C6C32829AE6F2EEA FOREIGN KEY (entry_point_id) REFERENCES entry_point (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE entry_point_element ADD CONSTRAINT FK_C6C328291F1F2A24 FOREIGN KEY (element_id) REFERENCES element (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE spec_element ADD CONSTRAINT FK_D429D5E0AA8FA4FB FOREIGN KEY (spec_id) REFERENCES spec (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE spec_element ADD CONSTRAINT FK_D429D5E01F1F2A24 FOREIGN KEY (element_id) REFERENCES element (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE element DROP FOREIGN KEY FK_41405E39AA8FA4FB');
        $this->addSql('ALTER TABLE element DROP FOREIGN KEY FK_41405E3998868048');
        $this->addSql('DROP INDEX IDX_41405E39AA8FA4FB ON element');
        $this->addSql('DROP INDEX IDX_41405E3998868048 ON element');
        $this->addSql('ALTER TABLE element DROP entrypoint_id, DROP spec_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE entry_point_element DROP FOREIGN KEY FK_C6C32829AE6F2EEA');
        $this->addSql('ALTER TABLE entry_point_element DROP FOREIGN KEY FK_C6C328291F1F2A24');
        $this->addSql('ALTER TABLE spec_element DROP FOREIGN KEY FK_D429D5E0AA8FA4FB');
        $this->addSql('ALTER TABLE spec_element DROP FOREIGN KEY FK_D429D5E01F1F2A24');
        $this->addSql('DROP TABLE entry_point_element');
        $this->addSql('DROP TABLE spec_element');
        $this->addSql('ALTER TABLE element ADD entrypoint_id INT DEFAULT NULL, ADD spec_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE element ADD CONSTRAINT FK_41405E39AA8FA4FB FOREIGN KEY (spec_id) REFERENCES spec (id)');
        $this->addSql('ALTER TABLE element ADD CONSTRAINT FK_41405E3998868048 FOREIGN KEY (entrypoint_id) REFERENCES entry_point (id)');
        $this->addSql('CREATE INDEX IDX_41405E39AA8FA4FB ON element (spec_id)');
        $this->addSql('CREATE INDEX IDX_41405E3998868048 ON element (entrypoint_id)');
    }
}
