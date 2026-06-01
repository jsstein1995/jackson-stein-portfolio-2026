import { CaseStudyMetricPlaceholder } from "@/components/case-study-placeholders";
import { CaseStudyCroppedVideo } from "@/components/case-study-cropped-video";
import { CaseStudyResearchImage } from "@/components/case-study-labeled-media";
import { FigJamEmbed } from "@/components/figjam-embed";
import { FadeIn, Stagger, StaggerItem } from "@/components/fade-in";
import { platformSubsections, sldProjectMedia } from "@/lib/sld-project-media";
import { SldEditorTimeline } from "@/components/sld-editor/timeline";
import {
  SldBlueprintSection,
  SldBodyCopy,
  SldBulletList,
  SldCallout,
  SldCenteredQuestion,
  SldContextCard,
  SldPrincipleCard,
  SldQuote,
  SldSectionHeader,
  SldSubheading,
} from "@/components/sld-editor/primitives";

const feasibilityQuestions = [
  "Could users safely edit diagrams without breaking electrical logic?",
  "Which objects needed to exist in both the CAD design and the SLD?",
  "Which objects should appear only in the SLD?",
  "How could we support smart wiring without creating invalid diagrams?",
  "How could the system scale to new symbols and market requirements?",
];

const oldModelItems = [
  "Mostly fixed output",
  "Limited customization",
  "North America-oriented assumptions",
  "Harder to adapt for new markets",
];

const newModelItems = [
  "Editable diagram canvas",
  "Configurable components",
  "Flexible symbol framework",
  "Smarter wiring interactions",
  "Better foundation for EU workflows",
];

const principles = [
  {
    title: "Flexible by default",
    description:
      "Users should be able to adjust diagrams to match real-world electrical configurations.",
  },
  {
    title: "Structured, not freeform",
    description:
      "The editor should provide flexibility without becoming a generic drawing tool that allows invalid diagrams.",
  },
  {
    title: "Market-specific without fragmentation",
    description:
      "Support EU requirements without creating separate one-off products for each country.",
  },
  {
    title: "Scalable over time",
    description:
      "New symbols, equipment, and workflows should be easier to add as Aurora expands.",
  },
];

const interactionPatterns = [
  "Object states: default, hover, selected, placement",
  "Wire states: default, hover, selected",
  "Port behavior and connection rules",
  "Wire tapping interactions",
  "Text insertion and editing",
  "Component placement from toolbar",
  "CAD-to-SLD object visibility logic",
  "Preview mode behavior",
];

const impactBullets = [
  "Unblocked international sales conversations where SLD editing was a key requirement",
  "Reduced dependency on manual workarounds",
  "Improved customer confidence in Aurora’s ability to support European workflows",
  "Created a more extensible foundation for future electrical design capabilities",
];

const figJamDiscoveryBoard = {
  embedSrc:
    "https://embed.figma.com/board/ordnP7RwfV79hZyQE5Dbb2/Single-Line-Diagram-MVP---DACH---Euro--1-?node-id=0-1&embed-host=share",
  boardHref:
    "https://www.figma.com/board/ordnP7RwfV79hZyQE5Dbb2/Single-Line-Diagram-MVP---DACH---Euro--1-",
  label: "Discovery and research of customer tooling and workflows",
} as const;

export function SldEditorContent() {
  return (
    <>
      <SldBlueprintSection>
        <FadeIn>
          <SldSectionHeader title="Overview" />
        </FadeIn>
        <FadeIn className="mt-12">
          <SldBodyCopy>
            <p>
              After a solar user creates and sells a 3D solar design, they often
              need to generate a detailed electrical diagram called a
              Single-Line Diagram, or SLD. These diagrams are required for
              permitting, interconnection, utility review, and installation.
            </p>
            <p>
              Aurora’s existing SLD workflow was built primarily around North
              American requirements. As Aurora expanded into Europe, the team
              needed a more flexible system that could support regional
              electrical conventions, customer-specific configurations, and
              evolving market requirements.
            </p>
            <p>
              This project started as a technical spike, evolved into a product
              strategy effort for the European market, and ultimately became a
              foundational editor experience for creating more configurable
              electrical diagrams.
            </p>
          </SldBodyCopy>
        </FadeIn>
        <FadeIn className="mt-12">
          <SldCallout>
            The challenge was not simply “make SLDs editable.” The deeper
            challenge was designing a scalable platform that could support a
            fragmented international market.
          </SldCallout>
        </FadeIn>
      </SldBlueprintSection>

      <SldBlueprintSection>
        <FadeIn>
          <SldSectionHeader title="Why this mattered" />
        </FadeIn>
        <FadeIn className="mt-12">
          <SldBodyCopy>
            <p>
              Aurora was navigating a period of major organizational
              restructuring while also working to maintain and grow its presence
              in Europe. Supporting the right electrical workflows became
              critical for retaining key customers and proving that Aurora could
              serve the EU market long term.
            </p>
            <p>
              European solar workflows introduced requirements that were not
              fully covered by Aurora’s existing SLD system. Different regions
              required different symbols, equipment types, design conventions,
              and documentation expectations.
            </p>
            <p>This created a strategic product question:</p>
          </SldBodyCopy>
        </FadeIn>
        <FadeIn className="mt-10">
          <SldCenteredQuestion>
            How might we create an SLD platform flexible enough for Europe
            without fragmenting the product by market?
          </SldCenteredQuestion>
        </FadeIn>
        <Stagger className="mt-16 grid gap-6 md:grid-cols-3">
          <StaggerItem>
            <SldContextCard
              title="Customer retention"
              description="Key European customers needed confidence that Aurora could support their workflows after restructuring."
            />
          </StaggerItem>
          <StaggerItem>
            <SldContextCard
              title="Market expansion"
              description="SLD editing was a key capability for maintaining a foothold in Europe and supporting future growth."
            />
          </StaggerItem>
          <StaggerItem>
            <SldContextCard
              title="Platform scalability"
              description="The system needed to support new components, symbols, and workflows without one-off custom builds."
            />
          </StaggerItem>
        </Stagger>
      </SldBlueprintSection>

      <SldBlueprintSection>
        <FadeIn>
          <SldSectionHeader title="Project timeline" />
        </FadeIn>
        <FadeIn className="mt-12">
          <SldBodyCopy>
            <p>
              Delivery unfolded iteratively: first the editable SLD editor as an
              MVP, then templates to scale expert configurations across teams,
              followed by ongoing polish to deepen quality and expand capability.
            </p>
          </SldBodyCopy>
        </FadeIn>
        <FadeIn className="mt-12">
          <CaseStudyResearchImage
            src={sldProjectMedia.iterativeRoadmap.src}
            alt={sldProjectMedia.iterativeRoadmap.alt}
            label={sldProjectMedia.iterativeRoadmap.label}
            width={sldProjectMedia.iterativeRoadmap.width}
            height={sldProjectMedia.iterativeRoadmap.height}
          />
        </FadeIn>
        <FadeIn className="mt-16">
          <SldSubheading>Cross-functional phases</SldSubheading>
        </FadeIn>
        <div className="mt-10">
          <SldEditorTimeline />
        </div>
      </SldBlueprintSection>

      <SldBlueprintSection>
        <FadeIn>
          <SldSectionHeader title="Phase 1: Technical feasibility and user validation" />
        </FadeIn>
        <FadeIn className="mt-12">
          <SldBodyCopy>
            <p>
              The project began with a technical spike. Before defining the final
              experience, we needed to understand what the existing architecture
              could support and where it would break down.
            </p>
            <p>
              I partnered closely with engineering and product to explore what it
              would mean to move from a mostly fixed generated diagram to a more
              editable, component-based system.
            </p>
          </SldBodyCopy>
        </FadeIn>
        <FadeIn className="mt-12">
          <SldSubheading>Key questions</SldSubheading>
          <div className="mt-6">
            <SldBulletList items={feasibilityQuestions} />
          </div>
        </FadeIn>
        <FadeIn className="mt-12">
          <SldSubheading>Design contribution</SldSubheading>
          <div className="mt-6">
            <SldBodyCopy>
              <p>
                My role was to make the technical ambiguity tangible. I created
                early interaction models, object state diagrams, wiring
                explorations, and component behavior specs that helped
                engineering evaluate feasibility and product clarify scope.
              </p>
              <p>
                The FigJam board below captures two months of research and
                discovery: learning from customers about their existing tooling
                and workflows, running qualitative interviews to evaluate our
                solution ideas, and prioritizing MVP feature requirements
                together with customers.
              </p>
            </SldBodyCopy>
            <FigJamEmbed
              className="mt-8"
              embedSrc={figJamDiscoveryBoard.embedSrc}
              boardHref={figJamDiscoveryBoard.boardHref}
              label={figJamDiscoveryBoard.label}
            />
          </div>
        </FadeIn>
      </SldBlueprintSection>

      <SldBlueprintSection>
        <FadeIn>
          <SldSectionHeader title="Phase 2: Product strategy for Europe" />
        </FadeIn>
        <FadeIn className="mt-12">
          <SldBodyCopy>
            <p>
              Once feasibility was established, the core challenge shifted from
              “Can we build this?” to “What should this become?”
            </p>
            <p>
              Europe was not a single uniform market. Customer requirements
              varied across countries, installers, utilities, and permitting
              expectations. A rigid SLD system would not scale.
            </p>
          </SldBodyCopy>
        </FadeIn>
        <FadeIn className="mt-12">
          <SldSubheading>Strategic insight</SldSubheading>
          <div className="mt-6">
            <SldQuote>
              Customers were not asking for a better drawing tool. They needed a
              system that reflected how their business actually designed and
              documented electrical systems.
            </SldQuote>
          </div>
        </FadeIn>
        <FadeIn className="mt-12">
          <SldBodyCopy>
            <p>
              This reframed the product from an editor feature into a platform
              capability. The system needed to support regional variation while
              preserving a consistent editing experience.
            </p>
          </SldBodyCopy>
        </FadeIn>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <FadeIn>
            <div className="rounded-sm border border-border bg-surface/60 p-6 md:p-8">
              <h3 className="text-sm tracking-widest text-muted uppercase">
                Old model
              </h3>
              <ul className="mt-6 space-y-3 text-lg text-muted">
                {oldModelItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-muted/50" aria-hidden>
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="rounded-sm border border-border bg-surface/60 p-6 md:p-8">
              <h3 className="text-sm tracking-widest text-muted uppercase">
                New model
              </h3>
              <ul className="mt-6 space-y-3 text-lg text-muted">
                {newModelItems.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-muted/50" aria-hidden>
                      +
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </SldBlueprintSection>

      <SldBlueprintSection>
        <FadeIn>
          <SldSectionHeader title="Design principles" />
        </FadeIn>
        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2">
          {principles.map((item) => (
            <StaggerItem key={item.title}>
              <SldPrincipleCard
                title={item.title}
                description={item.description}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </SldBlueprintSection>

      <SldBlueprintSection>
        <FadeIn>
          <SldSectionHeader title="Designing the editor as a platform" />
        </FadeIn>
        <FadeIn className="mt-12">
          <SldBodyCopy>
            <p>
              The final experience centered around a configurable SLD editor.
              Users could add, edit, connect, and arrange diagram components
              while preserving enough structure to reduce errors and support
              downstream documentation.
            </p>
          </SldBodyCopy>
        </FadeIn>
        <div className="mt-20 space-y-16">
          <FadeIn>
            <SldSubheading>{platformSubsections[0].title}</SldSubheading>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
              {platformSubsections[0].body}
            </p>
            <div className="mt-8">
              <div className="flex flex-wrap items-start gap-x-8 gap-y-6">
                {platformSubsections[0].images.slice(0, 3).map((image) => (
                  <div key={image.src} className="w-[100px] shrink-0">
                    <CaseStudyResearchImage
                      src={image.src}
                      alt={image.alt}
                      label={image.alt}
                      width={image.width}
                      height={image.height}
                      imageClassName="h-auto w-[100px] max-w-full"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                {platformSubsections[0].images.slice(3).map((image) => (
                  <div key={image.src} className="w-[400px] max-w-full">
                    <CaseStudyResearchImage
                      src={image.src}
                      alt={image.alt}
                      label={image.alt}
                      width={image.width}
                      height={image.height}
                      imageClassName="h-auto w-[400px] max-w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {platformSubsections.slice(1).map((section, index) => (
              <FadeIn key={section.title} delay={index * 0.05}>
                <SldSubheading>{section.title}</SldSubheading>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  {section.body}
                </p>
                <div className="mt-8 space-y-4">
                  {section.images.map((image) => (
                    <CaseStudyResearchImage
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      label={image.alt}
                      width={image.width}
                      height={image.height}
                      imageClassName="h-auto w-full"
                    />
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </SldBlueprintSection>

      <SldBlueprintSection>
        <FadeIn>
          <SldSectionHeader title="Making complexity feel manageable" />
        </FadeIn>
        <FadeIn className="mt-12">
          <SldBodyCopy>
            <p>
              Electrical diagramming can become overwhelming quickly. The design
              challenge was to expose enough control for expert users while
              keeping the experience approachable for users who only needed to
              make targeted edits.
            </p>
          </SldBodyCopy>
        </FadeIn>
        <FadeIn className="mt-12">
          <SldSubheading>Interaction patterns I defined</SldSubheading>
          <div className="mt-6">
            <SldBulletList items={interactionPatterns} />
          </div>
        </FadeIn>
        <FadeIn className="mt-12">
          <SldCallout>
            The interface needed to feel simple, but the underlying interaction
            model had to account for hundreds of valid electrical
            configurations.
          </SldCallout>
        </FadeIn>
      </SldBlueprintSection>

      <SldBlueprintSection>
        <FadeIn>
          <SldSectionHeader title="Post MVP value add: Templates" />
        </FadeIn>
        <FadeIn className="mt-12">
          <SldBodyCopy>
            <p>
              Adoption of the MVP was slow, as we expected based on our initial
              research. Even so, the progress we shipped proved our commitment to
              EU customers and became pivotal to retaining them during Aurora’s
              restructuring.
            </p>
            <p>
              After building the MVP framework, we were able to address our
              customers’ largest request: templates. This let electrical experts
              pre-define reusable component configurations in our database that
              the majority of designers could apply in the SLD editor—drastically
              reducing the effort to produce an SLD while preserving quality
              control.
            </p>
          </SldBodyCopy>
        </FadeIn>
        <FadeIn className="mt-12">
          <CaseStudyCroppedVideo
            className="w-[75%]"
            src={sldProjectMedia.templatesVideo.src}
            type={sldProjectMedia.templatesVideo.type}
            label={sldProjectMedia.templatesVideo.label}
            cropScale={1.15}
          />
        </FadeIn>
      </SldBlueprintSection>

      <SldBlueprintSection>
        <FadeIn>
          <SldSectionHeader title="Impact" />
        </FadeIn>
        <FadeIn className="mt-12">
          <SldBodyCopy>
            <p>
              This project became an important platform investment for Aurora’s
              European strategy. It helped strengthen customer confidence during
              a period of company restructuring and supported Aurora’s ability
              to maintain and expand its foothold in the EU market.
            </p>
          </SldBodyCopy>
        </FadeIn>
        <Stagger className="mt-16 grid gap-6 md:grid-cols-3">
          <StaggerItem>
            <div className="space-y-4">
              <SldContextCard
                title="Customer retention"
                description="Helped retain key customers who required more flexible SLD editing capabilities after Aurora’s restructuring."
              />
              <CaseStudyMetricPlaceholder label="Add retention metric or customer names if allowed" />
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="space-y-4">
              <SldContextCard
                title="European market foothold"
                description="Enabled Aurora to better support EU-specific electrical workflows and continue expanding in a strategically important region."
              />
              <CaseStudyMetricPlaceholder label="Add EU adoption / expansion metric" />
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="space-y-4">
              <SldContextCard
                title="Platform foundation"
                description="Created a scalable framework for future SLD components, symbols, and market-specific requirements."
              />
              <CaseStudyMetricPlaceholder label="Add number of supported symbols, components, or workflows" />
            </div>
          </StaggerItem>
        </Stagger>
        <FadeIn className="mt-12">
          <SldBulletList items={impactBullets} />
        </FadeIn>
      </SldBlueprintSection>

      <SldBlueprintSection>
        <FadeIn>
          <SldSectionHeader title="Reflection" />
        </FadeIn>
        <FadeIn className="mt-12">
          <SldBodyCopy>
            <p>
              This project was a reminder that senior product design often
              happens before the interface is fully defined.
            </p>
            <p>
              The hardest parts of the work were strategic and systemic:
              understanding a new market, translating technical constraints into
              product direction, aligning stakeholders around a flexible platform
              approach, and designing interaction patterns that could scale.
            </p>
            <p>
              The final editor mattered, but the larger contribution was helping
              Aurora move from a rigid SLD workflow toward a more adaptable
              electrical design platform that could support future market
              expansion.
            </p>
          </SldBodyCopy>
        </FadeIn>
      </SldBlueprintSection>
    </>
  );
}
