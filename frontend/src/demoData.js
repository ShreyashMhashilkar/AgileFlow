export const demoProjects = [
  { id: 1, name: "Website Redesign" },
  { id: 2, name: "Mobile Banking App" },
  { id: 3, name: "Cloud Migration" },
  { id: 4, name: "AI Analytics Platform" },
];

export const demoSprints = [
  { id: 1, name: "Sprint Alpha", project: 1 },
  { id: 2, name: "Sprint Beta", project: 1 },
  { id: 3, name: "Release Sprint", project: 2 },
  { id: 4, name: "Infra Sprint", project: 3 },
];

export const demoTasks = [
  {
    id: 1,
    title: "Design Login UX",
    status: "todo",
    sprint: 1,
    assignee: "Carlos",
    points: 3,
    tag: "Frontend",
  },
  {
    id: 2,
    title: "JWT Authentication",
    status: "progress",
    sprint: 1,
    assignee: "Celeste",
    points: 5,
    tag: "Backend",
  },
  {
    id: 3,
    title: "CI/CD Pipeline Setup",
    status: "done",
    sprint: 1,
    assignee: "Kat",
    points: 8,
    tag: "DevOps",
  },
  {
    id: 4,
    title: "API Rate Limiting",
    status: "progress",
    sprint: 2,
    assignee: "Carlos",
    points: 5,
    tag: "Security",
  },
  {
    id: 5,
    title: "Mobile UI Polish",
    status: "todo",
    sprint: 3,
    assignee: "Celeste",
    points: 3,
    tag: "UI",
  },
  {
    id: 6,
    title: "Dockerize Backend",
    status: "progress",
    sprint: 4,
    assignee: "Kat",
    points: 8,
    tag: "Infra",
  },
  {
    id: 7,
    title: "Kubernetes Deploy",
    status: "todo",
    sprint: 4,
    assignee: "Carlos",
    points: 13,
    tag: "Cloud",
  },
  {
    id: 8,
    title: "Audit Logging",
    status: "done",
    sprint: 2,
    assignee: "Celeste",
    points: 3,
    tag: "Backend",
  },
];

export const demoPipelines = [
  {
    id: 1,
    name: "Frontend Build",
    status: "SUCCESS",
    branch: "main",
    triggeredBy: "Carlos",
    logs: `
npm install
npm run build
Artifact published
Deployment Success
`,
  },
  {
    id: 2,
    name: "Backend Deploy",
    status: "SUCCESS",
    branch: "main",
    triggeredBy: "Kat",
    logs: `
pip install -r requirements.txt
python manage.py migrate
Restart services
Deployment Success
`,
  },
  {
    id: 3,
    name: "Cloud Infra",
    status: "RUNNING",
    branch: "infra",
    triggeredBy: "Celeste",
    logs: `
Terraform init
Terraform plan
Provisioning AKS
Still running...
`,
  },
];
