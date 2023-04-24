<?php

namespace App\Entity;

use App\Repository\ProjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProjectRepository::class)]
class Project
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $uid = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $version = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $previous_version = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $created_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $updated_at = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $finished_at = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $status = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $comment = null;

    #[ORM\Column]
    private ?bool $is_core = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $dev_access = null;

    #[ORM\ManyToOne(inversedBy: 'projects')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Account $account = null;

    #[ORM\OneToMany(mappedBy: 'project', targetEntity: Summary::class, orphanRemoval: true)]
    private Collection $summaries;

    #[ORM\OneToMany(mappedBy: 'project', targetEntity: Page::class, orphanRemoval: true)]
    private Collection $pages;

    #[ORM\OneToMany(mappedBy: 'project', targetEntity: Feature::class, orphanRemoval: true)]
    private Collection $features;

    #[ORM\OneToMany(mappedBy: 'project', targetEntity: EntryPoint::class, orphanRemoval: true)]
    private Collection $entryPoints;

    #[ORM\OneToMany(mappedBy: 'project', targetEntity: Element::class, orphanRemoval: true)]
    private Collection $elements;

    #[ORM\OneToMany(mappedBy: 'project', targetEntity: Feedback::class, orphanRemoval: true)]
    private Collection $feedback;

    #[ORM\OneToMany(mappedBy: 'project', targetEntity: History::class, orphanRemoval: true)]
    private Collection $histories;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'source')]
    private ?self $source = null;

    #[ORM\Column(type: Types::ARRAY, nullable: true)]
    private array $statusChoices = [];

    #[ORM\Column(type: Types::ARRAY, nullable: true)]
    private array $statusColors = [];

    #[ORM\Column(type: Types::ARRAY, nullable: true)]
    private array $sectionChoices = [];

    public function __construct()
    {
        $this->summaries = new ArrayCollection();
        $this->pages = new ArrayCollection();
        $this->features = new ArrayCollection();
        $this->entryPoints = new ArrayCollection();
        $this->elements = new ArrayCollection();
        $this->feedback = new ArrayCollection();
        $this->histories = new ArrayCollection();
        $this->source = null;
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

    public function getVersion(): ?string
    {
        return $this->version;
    }

    public function setVersion(?string $version): self
    {
        $this->version = $version;

        return $this;
    }

    public function getPreviousVersion(): ?string
    {
        return $this->previous_version;
    }

    public function setPreviousVersion(?string $previous_version): self
    {
        $this->previous_version = $previous_version;

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

    public function getFinishedAt(): ?\DateTimeInterface
    {
        return $this->finished_at;
    }

    public function setFinishedAt(?\DateTimeInterface $finished_at): self
    {
        $this->finished_at = $finished_at;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): self
    {
        $this->status = $status;

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

    public function isIsCore(): ?bool
    {
        return $this->is_core;
    }

    public function setIsCore(bool $is_core): self
    {
        $this->is_core = $is_core;

        return $this;
    }

    public function getDevAccess(): ?string
    {
        return $this->dev_access;
    }

    public function setDevAccess(?string $dev_access): self
    {
        $this->dev_access = $dev_access;

        return $this;
    }

    public function getAccount(): ?Account
    {
        return $this->account;
    }

    public function setAccount(?Account $account): self
    {
        $this->account = $account;

        return $this;
    }

    /**
     * @return Collection<int, Summary>
     */
    public function getSummaries(): Collection
    {
        return $this->summaries;
    }

    public function addSummary(Summary $summary): self
    {
        if (!$this->summaries->contains($summary)) {
            $this->summaries->add($summary);
            $summary->setProject($this);
        }

        return $this;
    }

    public function removeSummary(Summary $summary): self
    {
        if ($this->summaries->removeElement($summary)) {
            // set the owning side to null (unless already changed)
            if ($summary->getProject() === $this) {
                $summary->setProject(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Page>
     */
    public function getPages(): Collection
    {
        return $this->pages;
    }

    public function addPage(Page $page): self
    {
        if (!$this->pages->contains($page)) {
            $this->pages->add($page);
            $page->setProject($this);
        }

        return $this;
    }

    public function removePage(Page $page): self
    {
        if ($this->pages->removeElement($page)) {
            // set the owning side to null (unless already changed)
            if ($page->getProject() === $this) {
                $page->setProject(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Feature>
     */
    public function getFeatures(): Collection
    {
        return $this->features;
    }

    public function addFeature(Feature $feature): self
    {
        if (!$this->features->contains($feature)) {
            $this->features->add($feature);
            $feature->setProject($this);
        }

        return $this;
    }

    public function removeFeature(Feature $feature): self
    {
        if ($this->features->removeElement($feature)) {
            // set the owning side to null (unless already changed)
            if ($feature->getProject() === $this) {
                $feature->setProject(null);
            }
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
            $entryPoint->setProject($this);
        }

        return $this;
    }

    public function removeEntryPoint(EntryPoint $entryPoint): self
    {
        if ($this->entryPoints->removeElement($entryPoint)) {
            // set the owning side to null (unless already changed)
            if ($entryPoint->getProject() === $this) {
                $entryPoint->setProject(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Element>
     */
    public function getElements(): Collection
    {
        return $this->elements;
    }

    public function addElement(Element $element): self
    {
        if (!$this->elements->contains($element)) {
            $this->elements->add($element);
            $element->setProject($this);
        }

        return $this;
    }

    public function removeElement(Element $element): self
    {
        if ($this->elements->removeElement($element)) {
            // set the owning side to null (unless already changed)
            if ($element->getProject() === $this) {
                $element->setProject(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Feedback>
     */
    public function getFeedback(): Collection
    {
        return $this->feedback;
    }

    public function addFeedback(Feedback $feedback): self
    {
        if (!$this->feedback->contains($feedback)) {
            $this->feedback->add($feedback);
            $feedback->setProject($this);
        }

        return $this;
    }

    public function removeFeedback(Feedback $feedback): self
    {
        if ($this->feedback->removeElement($feedback)) {
            // set the owning side to null (unless already changed)
            if ($feedback->getProject() === $this) {
                $feedback->setProject(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, History>
     */
    public function getHistories(): Collection
    {
        return $this->histories;
    }

    public function addHistory(History $history): self
    {
        if (!$this->histories->contains($history)) {
            $this->histories->add($history);
            $history->setProject($this);
        }

        return $this;
    }

    public function removeHistory(History $history): self
    {
        if ($this->histories->removeElement($history)) {
            // set the owning side to null (unless already changed)
            if ($history->getProject() === $this) {
                $history->setProject(null);
            }
        }

        return $this;
    }

    public function getSource(): ?self
    {
        return $this->source;
    }

    public function setSource(?self $source): self
    {
        if ($this->source !== null) {
            $this->source->clear();
        }
        
        if ($source !== null) {
            $this->source = new ArrayCollection([$source]);
        } else {
            $this->source = null;
        }
        
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

    public function getStatusChoices(): array
    {
        return $this->statusChoices;
    }

    public function setStatusChoices(?array $statusChoices): self
    {
        $this->statusChoices = $statusChoices;

        return $this;
    }

    public function getStatusColors(): array
    {
        return $this->statusColors;
    }

    public function setStatusColors(?array $statusColors): self
    {
        $this->statusColors = $statusColors;

        return $this;
    }

    public function getSectionChoices(): array
    {
        return $this->sectionChoices;
    }

    public function setSectionChoices(?array $sectionChoices): self
    {
        $this->sectionChoices = $sectionChoices;

        return $this;
    }

}
