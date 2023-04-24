<?php

namespace App\Entity;

use App\Repository\ElementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ElementRepository::class)]
class Element
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $uid = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $comment = null;

    #[ORM\Column]
    private ?bool $is_from_core = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $updated_at = null;

    #[ORM\ManyToOne(inversedBy: 'elements')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Project $project = null;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'source')]
    private ?self $source = null;

    #[ORM\ManyToMany(targetEntity: Spec::class, mappedBy: 'element')]
    private Collection $specs;

    #[ORM\ManyToMany(targetEntity: EntryPoint::class, mappedBy: 'elements')]
    private Collection $entryPoints;

    public function __construct()
    {
        $this->source = null;
        $this->specs = new ArrayCollection();
        $this->entryPoints = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUid(): ?string
    {
        return $this->uid;
    }

    public function setUid(string $uid): self
    {
        $this->uid = $uid;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function isIsFromCore(): ?bool
    {
        return $this->is_from_core;
    }

    public function setIsFromCore(bool $is_from_core): self
    {
        $this->is_from_core = $is_from_core;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->created_at;
    }

    public function setCreatedAt(\DateTimeInterface $created_at): self
    {
        $this->created_at = $created_at;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updated_at;
    }

    public function setUpdatedAt(\DateTimeInterface $updated_at): self
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(?Project $project): self
    {
        $this->project = $project;

        return $this;
    }

    public function getSource(): ?self
    {
        return $this->source;
    }

    public function setSource(?self $source): self
    {
        $this->source = $source;

        return $this;
    }

    public function addSource(self $source): self
    {
        if (!$this->source->contains($source)) {
            $this->source->add($source);
            $source->setSource($this);
        }

        return $this;
    }

    public function removeSource(self $source): self
    {
        if ($this->source->removeElement($source)) {
            // set the owning side to null (unless already changed)
            if ($source->getSource() === $this) {
                $source->setSource(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Spec>
     */
    public function getSpecs(): Collection
    {
        return $this->specs;
    }

    public function addSpec(Spec $spec): self
    {
        if (!$this->specs->contains($spec)) {
            $this->specs->add($spec);
            $spec->addElement($this);
        }

        return $this;
    }

    public function removeSpec(Spec $spec): self
    {
        if ($this->specs->removeElement($spec)) {
            $spec->removeElement($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, EntryPoint>
     */
    public function getEntryPoints(): Collection
    {
        return $this->entryPoints;
    }

    public function addEntryPoint(EntryPoint $entryPoint): self
    {
        if (!$this->entryPoints->contains($entryPoint)) {
            $this->entryPoints->add($entryPoint);
            $entryPoint->addElement($this);
        }

        return $this;
    }

    public function removeEntryPoint(EntryPoint $entryPoint): self
    {
        if ($this->entryPoints->removeElement($entryPoint)) {
            $entryPoint->removeElement($this);
        }

        return $this;
    }
}
