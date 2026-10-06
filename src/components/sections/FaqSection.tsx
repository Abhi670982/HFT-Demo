import { faqs } from "@/lib/data/faqs";
import Accordion from "@/components/ui/Accordion";
import SectionHeader from "@/components/ui/SectionHeader";

export default function FaqSection() {
  return (
    <section id="faq" className="shell-pad scroll-mt-28 py-12 sm:py-16">
      <SectionHeader
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Everything you need to know about how HuntForTomorrow works."
      />
      <Accordion items={faqs} className="mx-auto mt-10 max-w-3xl" />
    </section>
  );
}
