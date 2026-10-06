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
    role: "Software Engineer",
    quote:
      "The moment they saw my resume, they said: 'This is exactly what we needed!' I went from 1.5 months of job search and rejections to landing 9 interviews in a single day.",
    outcome: "40% salary hike",
    results: [
      "9 Interviews in a Single Day",
      "Dream Role Project Head",
      "40% Salary hike",
      "2X Career growth",
    ],
  },
  {
    id: "priya-s",
    name: "Priya S.",
    role: "Software Engineer",
    quote:
      "Mukul's guidance transformed my job search. I went from endless applications to landing my dream role with a 35% salary increase.",
    outcome: "35% salary increase",
  },
  {
    id: "rahul-m",
    name: "Rahul M.",
    role: "Product Manager",
    quote:
      "The 1-on-1 session gave me clarity I'd been missing for months. Got 3 offers within 4 weeks of implementing the plan!",
    outcome: "3 offers within 4 weeks",
  },
  {
    id: "anita-k",
    name: "Anita K.",
    role: "Data Analyst",
    quote:
      "I was applying to 500+ jobs with zero results. After my consultation, I focused on quality applications and got 5 interviews.",
    outcome: "5 interviews",
  },
  {
    id: "vikram-t",
    name: "Vikram T.",
    role: "Marketing Lead",
    quote:
      "From 6 months of rejections to multiple competing offers. The personalized action plan was exactly what I needed!",
    outcome: "Multiple competing offers",
  },
];

export const featuredTestimonial = testimonials[0];
export const supportingTestimonials = testimonials.slice(1);
