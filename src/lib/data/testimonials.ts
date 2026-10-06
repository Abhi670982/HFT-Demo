export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  outcome: string;
  /** Only the featured testimonial carries headline results. */
  results?: string[];
}

export const testimonials: Testimonial[] = [
  {
    id: "dhairya-singh",
    name: "Dhairya Singh",
    role: "Software Engineer — Oracle",
    quote:
      "The moment they saw my resume, they said: 'This is exactly what we needed!' I went from 1.5 months of job search and rejections to landing 9 interviews in a single day.",
    outcome: "40% salary hike",
    results: [
      "9 interviews in a single day",
      "Project Head dream role",
      "40% salary hike",
      "2X career growth",
    ],
  },
  {
    id: "priya-s",
    name: "Priya S.",
    role: "Software Engineer",
    quote:
      "The resume and LinkedIn overhaul completely changed how recruiters responded to me. I stopped applying into the void and started interviewing for roles that actually matched my goals.",
    outcome: "35% salary increase",
  },
  {
    id: "rahul-m",
    name: "Rahul M.",
    role: "Product Manager",
    quote:
      "A clear strategy, targeted outreach and honest feedback at every step. I stopped spraying applications and started having real conversations with the right companies.",
    outcome: "3 offers within 4 weeks",
  },
  {
    id: "anita-k",
    name: "Anita K.",
    role: "Data Analyst",
    quote:
      "I came in unsure how to position myself. The consultation alone gave me the clarity and confidence I needed — and the interviews followed quickly after.",
    outcome: "5 interviews after consultation",
  },
  {
    id: "vikram-t",
    name: "Vikram T.",
    role: "Marketing Lead",
    quote:
      "The team helped me run a structured, focused search while still employed. I ended up with multiple competing offers and the confidence to negotiate well.",
    outcome: "Multiple competing offers",
  },
];

export const featuredTestimonial = testimonials[0];
export const supportingTestimonials = testimonials.slice(1);
