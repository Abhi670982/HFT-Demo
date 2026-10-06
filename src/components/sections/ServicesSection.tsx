import { services } from "@/lib/data/services";
import ServiceCard from "@/components/cards/ServiceCard";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ServicesSection() {
  return (
    <section id="services" className="shell-pad scroll-mt-28 py-12 sm:py-16">
      <SectionHeader
        eyebrow="What We Do"
        title="End-to-End Career Support"
        description="Everything your job search needs — structured into one seamless, guided system."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
      <div className="mt-9 flex justify-center">
        <Button href="/services" variant="secondary" size="md" arrow>
          View All Services
        </Button>
      </div>
    </section>
  );
}
