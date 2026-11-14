"""
Praful Chalakh Portfolio Backend & Routing Service
Forward Deploy Engineer Portfolio with FastAPI & Jinja2 Templates
"""

from fastapi import FastAPI, Request, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
import os

app = FastAPI(
    title="Praful Chalakh Portfolio",
    description="Forward Deploy Engineer & Cloud DevSecOps Portfolio",
    version="2.0.0"
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Mount static files and templates
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "static")), name="static")
if os.path.exists(os.path.join(BASE_DIR, "assets")):
    app.mount("/assets", StaticFiles(directory=os.path.join(BASE_DIR, "assets")), name="assets")

templates = Jinja2Templates(directory=os.path.join(BASE_DIR, "templates"))

# Centralized data model
PORTFOLIO_DATA = {
    "profile": {
        "name": "Praful Chalakh",
        "title": "Forward Deploy · Cloud & DevSecOps · SRE",
        "primary_roles": [
            "Forward Deploy Engineer",
            "Cloud Engineer",
            "DevSecOps Engineer",
            "Site Reliability Engineer (SRE)",
            "Platform / DevOps Engineer",
            "Backend Systems Engineer"
        ],
        "tagline": "Software Engineer — Golang, Docker & CI/CD | Cloud, DevSecOps & SRE",
        "mindset": "Hands-on builder who architects systems from scratch, taking products from 0-to-1 with rock-solid security and reliability.",
        "location": "Hyderabad, Telangana, India",
        "phone": "+91-8767754506",
        "email": "prafulchalakh224@gmail.com",
        "status": "Actively interviewing for FDE, Cloud, DevSecOps & SRE roles",
        "linkedin": "https://linkedin.com/in/prafulchalakh",
        "github": "https://github.com/Praful224",
        "instagram_personal": "https://instagram.com/mee.praf",
        "instagram_creative": "https://instagram.com/etcpraful",
        "leetcode": "https://leetcode.com/u/Prafulchalakh224",
        "photo": "/static/img/praful.jpg",
        "resume_url": "/resume",
        "stats": {
            "years_experience": "2+",
            "products_shipped": "7",
            "cost_reduction": "−50%+",
            "certifications": "4"
        }
    },
    "experiences": [
        {
            "id": "ascent",
            "slug": "ascent-business-solutions",
            "company": "Ascent Business Solutions",
            "role": "Cloud & DevSecOps Engineer — Product Engineering",
            "period": "Aug 2026 – Present",
            "location": "Hyderabad, Telangana",
            "summary": "Taking US healthcare products from zero to one with 7 products in the pipeline. Owning cloud infrastructure, DevSecOps, and automated delivery pipelines with AI-assisted engineering.",
            "metrics": [
                {"label": "Pipeline", "value": "7 Products"},
                {"label": "Industry", "value": "US Healthcare"},
                {"label": "Methodology", "value": "Zero-to-One"}
            ],
            "highlights": [
                "Part of the Product Engineering team taking products from zero to one for the US healthcare industry, with 7 products in the pipeline; own the cloud infrastructure and DevSecOps.",
                "Work directly with application teams to modernize company applications with a security-first approach, covering containerization, deployment standards, and secure delivery.",
                "Build automated CI/CD pipelines that remove manual build, test, and deployment steps, cutting human effort and speeding up delivery across products.",
                "Use Claude and Cursor in day-to-day development, debugging, and automation work to accelerate delivery while reviewing all generated code and infrastructure changes.",
                "Audit company-wide cloud infrastructure to identify cost waste and right-sizing opportunities, putting complete cost visibility in place across environments."
            ],
            "skills": ["Go", "Docker", "Kubernetes", "AWS", "Azure", "Terraform", "Claude", "Cursor", "FinOps", "CI/CD"]
        },
        {
            "id": "tcs",
            "slug": "tata-consultancy-services",
            "company": "Tata Consultancy Services (TCS)",
            "role": "Software Engineer — DevOps & Cloud Operations",
            "period": "Nov 2024 – Aug 2026",
            "location": "Hyderabad, Telangana",
            "summary": "Enterprise cloud operations, CI/CD with SonarQube & Trivy gating, PostgreSQL automated schema migrations for 1M+ records, and 50%+ cloud cost optimization.",
            "metrics": [
                {"label": "MTTR Reduced", "value": "−30%"},
                {"label": "Cost Savings", "value": "50%+"},
                {"label": "Records Automated", "value": "1M+"}
            ],
            "highlights": [
                "Built and maintained reusable pipelines in Jenkins, GitHub Actions, and Azure DevOps automating build, testing, security checks, and multi-environment deployments, with SonarQube SAST gates, Trivy scanning, and OWASP Dependency-Check.",
                "Managed Dockerized microservices on Amazon EKS and Azure AKS, handling manifests, networking, resource requests/limits, quotas, and deployments, debugging failing workloads end to end.",
                "Managed Incident, Event, and Change Management within an ITIL framework, reducing MTTR by 30% through root-cause troubleshooting and structured post-incident reviews.",
                "Automated zero-downtime schema updates and chunked backfills for over 1 million records using Python (psycopg2) against PostgreSQL.",
                "Designed and deployed highly available 3-tier AWS infrastructure using Terraform across dev, staging, and prod, isolating app and RDS PostgreSQL tiers in private subnets behind an ALB and CloudFront.",
                "Eliminated public SSH across the EC2 fleet by migrating to AWS SSM Session Manager and enforcing least-privilege IAM roles.",
                "Reduced monthly cloud infrastructure costs by over 50% through VPC Gateway Endpoints, right-sizing, and CloudWatch budget alerting.",
                "Built observability dashboards using Prometheus, Grafana, Dynatrace, and Azure Monitor to surface infrastructure and application issues before customer impact."
            ],
            "skills": ["AWS", "Azure", "EKS", "AKS", "Docker", "Jenkins", "GitHub Actions", "Terraform", "PostgreSQL", "Python", "Prometheus", "Grafana", "Dynatrace"]
        }
    ],
    "projects": [
        {
            "id": "doktriai",
            "slug": "doktriai",
            "title": "DoktriAI: Autonomous Container Control Plane & AI Agent Gateway",
            "category": "Autonomous Systems & AI Infrastructure",
            "summary": "Autonomous container control plane with an integrated Model Context Protocol (MCP) server in Go, featuring dry-run validators and Plan-Then-Execute (PTE) approval gates.",
            "tech": ["Go (Golang)", "Docker", "Model Context Protocol (MCP)", "HMAC-SHA256", "JSON-RPC", "SSE", "RBAC"],
            "metrics": [
                {"label": "Language", "value": "Go"},
                {"label": "Protocol", "value": "MCP + JSON-RPC"},
                {"label": "Security", "value": "HMAC + RBAC"}
            ],
            "highlights": [
                "Engineered an autonomous container control plane with an integrated MCP server in Go, enabling secure, declarative deployment, log streaming, and scaling via AI operational agents.",
                "Built dry-run manifest validators, Unicode sanitizers, and HMAC-SHA256 API token verification to enforce RBAC and sanitize agent-generated infrastructure plans.",
                "Implemented a Plan-Then-Execute (PTE) approval gate and workload-level circuit breakers to quarantine high-risk cluster actions and prevent cascading restart storms."
            ],
            "github": "https://github.com/Praful224"
        },
        {
            "id": "devsecops",
            "slug": "devsecops-compliance-platform",
            "title": "Automated DevSecOps Compliance & Security Orchestration Platform",
            "category": "CI/CD & Security Orchestration",
            "summary": "Multi-stage automated delivery platform enforcing Trivy container scanning, SonarQube SAST quality gates, and OWASP dependency checks.",
            "tech": ["Jenkins", "Docker", "Trivy", "SonarQube", "OWASP Dependency-Check", "Linux", "Bash"],
            "metrics": [
                {"label": "Security Gates", "value": "SAST + Trivy"},
                {"label": "Vulnerabilities", "value": "0 Shipped"},
                {"label": "Build Speed", "value": "Multi-stage"}
            ],
            "highlights": [
                "Built automated CI pipelines for artifact compilation and container image builds using isolated build agents.",
                "Integrated Trivy container scans and SonarQube SAST gates into delivery pipelines to enforce security compliance before release.",
                "Optimized build performance with multi-stage Docker builds, reducing image size and attack surface."
            ],
            "github": "https://github.com/Praful224"
        },
        {
            "id": "gitops",
            "slug": "gitops-cloud-native-deployment",
            "title": "GitOps-Driven Cloud-Native Deployment Architecture",
            "category": "Cloud-Native Infrastructure",
            "summary": "Continuous delivery with ArgoCD and Helm reconciling microservice states across Amazon EKS and Azure AKS clusters with Git as the single source of truth.",
            "tech": ["ArgoCD", "Kubernetes", "EKS", "AKS", "Helm", "Prometheus", "Grafana", "GitOps"],
            "metrics": [
                {"label": "Environments", "value": "Dev/Stg/Prod"},
                {"label": "Configuration", "value": "Zero Drift"},
                {"label": "Engine", "value": "ArgoCD + Helm"}
            ],
            "highlights": [
                "Implemented GitOps continuous delivery using ArgoCD and Helm to reconcile microservice state on Kubernetes clusters with Git as the single source of truth.",
                "Standardized deployment parameterization across Dev/Staging/Production using modular Helm charts, eliminating environment configuration drift.",
                "Configured cluster health monitoring with Prometheus and Grafana for automated alerts on drift or deployment degradation."
            ],
            "github": "https://github.com/Praful224"
        }
    ],
    "skills": {
        "Programming": {"highlight": ["Go (Golang)"], "others": ["Python", "Bash", "SQL"]},
        "Containers & VCS": {"highlight": ["Docker", "Kubernetes (EKS, AKS)"], "others": ["Git", "Helm", "ArgoCD (GitOps)", "Docker Compose"]},
        "CI/CD & Automation": {"highlight": ["GitHub Actions", "Jenkins"], "others": ["Azure DevOps", "Ansible", "Pipeline Automation"]},
        "Code Quality & Testing": {"highlight": ["SonarQube (SAST)", "Trivy"], "others": ["OWASP Dependency-Check", "Dry-run validators"]},
        "AI-Assisted Engineering": {"highlight": ["Claude", "Cursor"], "others": ["Model Context Protocol (MCP)", "AI-assisted debugging"]},
        "Cloud & IaC": {"highlight": ["AWS (EC2, EKS, RDS, ALB, S3, IAM)", "Azure", "Terraform"], "others": ["ARM Templates", "FinOps"]},
        "Debugging & Reliability": {"highlight": ["Root-Cause Analysis", "Prometheus", "Grafana"], "others": ["Dynatrace", "CloudWatch", "Alertmanager", "ITIL"]},
        "Systems & Databases": {"highlight": ["Linux (RHEL, Ubuntu)"], "others": ["PostgreSQL", "MySQL", "Nginx", "Windows Server"]}
    },
    "certifications": [
        {
            "name": "AWS Certified Solutions Architect – Associate",
            "issuer": "Amazon Web Services",
            "badge": "AWS",
            "verify_url": "https://www.credly.com/badges/8b5d5d14-b1cf-4159-a32c-a283b12ffd96/public_url",
            "verify_label": "Verify on Credly"
        },
        {
            "name": "AWS Certified SysOps Administrator – Associate (CloudOps)",
            "issuer": "Amazon Web Services",
            "badge": "AWS",
            "verify_url": "https://cp.certmetrics.com/amazon/en/public/verify/credential/49d801d063ed4b92bc11d5b229d82f12",
            "verify_label": "Verify on CertMetrics"
        },
        {
            "name": "AWS Certified Developer – Associate",
            "issuer": "Amazon Web Services",
            "badge": "AWS",
            "verify_url": "https://www.credly.com/badges/34561d2e-2f93-40cb-87cd-2c98a49f0a93/linked_in_profile",
            "verify_label": "Verify on Credly"
        },
        {
            "name": "Microsoft Certified: Azure Security Engineer Associate (AZ-500)",
            "issuer": "Microsoft Corporation",
            "badge": "AZ",
            "verify_url": "https://learn.microsoft.com/api/credentials/share/en-us/PrafulChalakh-8078/2412980B734A439?sharingId=33EA7E2B95495467",
            "verify_label": "Verify on Microsoft Learn"
        }
    ]
}

# ----------------- ROUTES -----------------

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    """Home / Overview page"""
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={"data": PORTFOLIO_DATA, "active_page": "home"}
    )

@app.get("/experience", response_class=HTMLResponse)
async def experience_page(request: Request):
    """Dedicated Experience Overview Route"""
    return templates.TemplateResponse(
        request=request,
        name="experience.html",
        context={"data": PORTFOLIO_DATA, "active_page": "experience"}
    )

@app.get("/experience/{exp_slug}", response_class=HTMLResponse)
async def experience_detail(request: Request, exp_slug: str):
    """Dedicated Detail Page for each Job Position"""
    exp = next((e for e in PORTFOLIO_DATA["experiences"] if e["slug"] == exp_slug or e["id"] == exp_slug), None)
    if not exp:
        raise HTTPException(status_code=404, detail="Experience not found")
    return templates.TemplateResponse(
        request=request,
        name="experience_detail.html",
        context={"data": PORTFOLIO_DATA, "exp": exp, "active_page": "experience"}
    )

@app.get("/projects", response_class=HTMLResponse)
async def projects_page(request: Request):
    """Dedicated Projects Overview Route"""
    return templates.TemplateResponse(
        request=request,
        name="projects.html",
        context={"data": PORTFOLIO_DATA, "active_page": "projects"}
    )

@app.get("/projects/{project_slug}", response_class=HTMLResponse)
async def project_detail(request: Request, project_slug: str):
    """Dedicated Detail Page for each Project"""
    proj = next((p for p in PORTFOLIO_DATA["projects"] if p["slug"] == project_slug or p["id"] == project_slug), None)
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
    return templates.TemplateResponse(
        request=request,
        name="project_detail.html",
        context={"data": PORTFOLIO_DATA, "project": proj, "active_page": "projects"}
    )

@app.get("/resume")
@app.get("/assets/Praful_Chalakh_Resume.pdf")
async def get_resume():
    """Serves the exact resume PDF"""
    resume_path = os.path.join(BASE_DIR, "prafulchalakhRes.pdf")
    if not os.path.exists(resume_path):
        resume_path = os.path.join(BASE_DIR, "assets", "Praful_Chalakh_Resume.pdf")
    if os.path.exists(resume_path):
        return FileResponse(
            path=resume_path,
            filename="Praful_Chalakh_Resume.pdf",
            media_type="application/pdf"
        )
    raise HTTPException(status_code=404, detail="Resume PDF not found")

@app.get("/api/data")
async def get_portfolio_json():
    """REST API endpoint returning complete portfolio data for headless consumers"""
    return JSONResponse(content=PORTFOLIO_DATA)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=True)
