/**
 * Curated skill dictionary with whole-term matching, shared by the resume
 * parser and the analysis engine. Plain substring matching produced false
 * positives ("java" in "javascript", "go" in "good", "sql" in "mysql",
 * "css" in "success"), so every skill is matched on term boundaries.
 */

interface SkillDefinition {
  name: string;
  patterns: RegExp[];
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Case-insensitive whole-term pattern; tolerates a trailing plural "s". */
function term(value: string): RegExp {
  return new RegExp(`(?<![a-z0-9+#])${escapeRegExp(value).replace(/ /g, "[\\s-]+")}s?(?![a-z0-9+#])`, "i");
}

function skill(name: string, ...extra: (string | RegExp)[]): SkillDefinition {
  return { name, patterns: [term(name), ...extra.map((e) => (typeof e === "string" ? term(e) : e))] };
}

const SKILLS: SkillDefinition[] = [
  skill("react", "react.js", "reactjs"),
  skill("next.js", "nextjs"),
  skill("angular", "angularjs"),
  skill("vue", "vue.js", "vuejs"),
  skill("typescript"),
  skill("javascript", "ecmascript"),
  skill("node.js", "nodejs"),
  skill("python"),
  skill("java"),
  skill("c++", "cpp"),
  skill("c#"),
  // "Go" is ambiguous in prose — accept "golang" or the capitalised language name only.
  skill("go", /\bgolang\b/i, /(?<![A-Za-z])Go(?![A-Za-z-])(?=\s*(?:,|\/|\)|;|$|\s(?:and|or|lang|programming|developer|language)))/m),
  skill("rust"),
  skill("php"),
  skill("ruby", "ruby on rails"),
  skill("kotlin"),
  skill("swift"),
  skill("flutter"),
  skill("react native"),
  skill("html", "html5"),
  skill("css", "css3"),
  skill("tailwind", "tailwindcss"),
  skill("sql"),
  skill("mysql"),
  skill("postgresql", "postgres"),
  skill("mongodb"),
  skill("redis"),
  skill("elasticsearch"),
  skill("graphql"),
  skill("rest api", /\brest(?:ful)?(?:\s+|-)?apis?\b/i, /\brestful\b/i),
  skill("docker"),
  skill("kubernetes", "k8s"),
  skill("aws", "amazon web services"),
  skill("azure"),
  skill("gcp", "google cloud"),
  skill("ci/cd", /\bci\s*\/\s*cd\b/i),
  skill("jenkins"),
  skill("terraform"),
  skill("linux"),
  skill("git", "github", "gitlab"),
  skill("microservices", "microservice"),
  skill("system design"),
  skill("data structures"),
  skill("algorithms"),
  skill("machine learning"),
  skill("deep learning"),
  skill("nlp", "natural language processing"),
  skill("pandas"),
  skill("numpy"),
  skill("tensorflow"),
  skill("pytorch"),
  skill("tableau"),
  skill("power bi", "powerbi"),
  skill("excel", "ms excel", "microsoft excel"),
  skill("spark", "apache spark", "pyspark"),
  skill("hadoop"),
  skill("etl"),
  skill("data analysis", "data analytics"),
  skill("product management"),
  skill("roadmap"),
  skill("agile"),
  skill("scrum"),
  skill("kanban"),
  skill("jira"),
  skill("figma"),
  skill("ui/ux", /\bui\s*\/\s*ux\b/i, /\bux\s*\/\s*ui\b/i),
  skill("user research"),
  skill("seo"),
  skill("sem"),
  skill("google analytics"),
  skill("content marketing"),
  skill("brand management"),
  skill("crm"),
  skill("salesforce"),
  skill("hubspot"),
  skill("financial modeling", "financial modelling"),
  skill("accounting"),
  skill("risk management"),
  skill("recruitment", "recruiting"),
  skill("onboarding"),
  skill("communication"),
  skill("leadership"),
  skill("stakeholder management"),
  skill("problem solving", "problem-solving"),
  skill("negotiation"),
  skill("project management"),
  skill("testing"),
  skill("selenium"),
  skill("automation"),
  skill("devops"),
  skill("sre", "site reliability"),
  skill("security", "cybersecurity"),
  skill("oauth"),
];

/** Returns the canonical names of dictionary skills found in the text. */
export function detectSkills(text: string): string[] {
  return SKILLS.filter((s) => s.patterns.some((p) => p.test(text))).map((s) => s.name);
}
