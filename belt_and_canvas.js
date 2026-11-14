/* =============================================================
   belt_and_canvas.js
   Conveyor Belt Engine + Real-Time Canvas Particle Dissolve
   ============================================================= */

(function() {
  const PALETTE = ['#FF4A12', '#FF5A1F', '#FF6B2C', '#FF8A3D', '#FFB06A', '#FFD9B5', '#FFF3E6'];

  function hash(a, b, c) {
    let h = ((a * 374761393 + b * 668265263 + c * 2147483647) | 0);
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }

  const EXP_CARDS = [
    {
      id: 'ascent',
      bg: '#0A2A43',
      textColor: '#ffffff',
      tags: ['all'],
      badge: { num: '7', pct: 'Products' },
      details: {
        category: 'Work Experience · Product Engineering',
        title: 'Ascent Business Solutions',
        subtitle: 'Cloud & DevSecOps Engineer · Aug 2026 – Present · Hyderabad, India',
        bullets: [
          'Part of the Product Engineering team taking products from zero to one for the US healthcare industry, with 7 products in the pipeline; own the cloud infrastructure and DevSecOps for these products.',
          'Work directly with application teams to modernize company applications with a security-first approach, covering containerization, deployment standards, and secure delivery practices.',
          'Build automated CI/CD pipelines that remove manual build, test, and deployment steps, cutting human effort and speeding up delivery across products.',
          'Use Claude and Cursor in day-to-day development, debugging, and automation work to accelerate delivery while reviewing all generated code and infrastructure changes.',
          'Audit company-wide cloud infrastructure to identify cost waste and right-sizing opportunities, putting complete cost visibility in place across environments.'
        ],
        tech: ['Go (Golang)', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Terraform', 'Claude', 'Cursor', 'FinOps'],
        link: 'https://linkedin.com/in/prafulchalakh',
        linkText: 'View on LinkedIn ↗'
      },
      visual: `
        <div class="k-nav">
          <span class="k-logo">ASCENT</span>
          <div class="k-menu">
            <span>PRODUCTS</span><span>DEVOPS</span><span class="k-active">CLOUD</span>
          </div>
        </div>
        <div class="k-body">
          <div class="k-company">Ascent Business Solutions</div>
          <div class="k-role">Cloud &amp; DevSecOps Engineer</div>
          <div class="k-period">Aug 2026 – Present · Hyderabad</div>
          <div class="k-tags">
            <span class="k-tag">Go</span><span class="k-tag">Docker</span>
            <span class="k-tag">K8s</span><span class="k-tag">AWS</span>
            <span class="k-tag">Azure</span><span class="k-tag">Claude</span>
          </div>
          <div class="k-quote">"7 products from zero to one"</div>
          <div class="card-inspect-hint">Click card for full details ↗</div>
        </div>
        <div class="k-footer">
          <div class="k-stat"><span class="k-num">7</span><span class="k-unit">Products</span></div>
          <div class="k-sep"></div>
          <div class="k-stat"><span class="k-num">Zero→One</span><span class="k-unit">US Healthcare</span></div>
        </div>
      `,
      code: `ASCENT BUSINESS SOLUTIONS
Cloud & DevSecOps Engineer · Aug 2026 – Present

• Zero-to-one delivery for US healthcare
• Modernize applications security-first
• Automated end-to-end CI/CD delivery
• AI-assisted engineering daily (Claude/Cursor)
• Cloud FinOps: cut infrastructure waste`,
      codeMeta: `<!-- Company: Ascent Business Solutions -->
<!-- Role: Cloud & DevSecOps Engineer -->
<!-- Location: Hyderabad, India -->
<!-- Pipeline: 7 Healthcare Products -->`
    },
    {
      id: 'tcs',
      bg: '#121212',
      textColor: '#ffffff',
      tags: ['all'],
      badge: { num: '−30%', pct: 'MTTR' },
      details: {
        category: 'Work Experience · Cloud Operations',
        title: 'Tata Consultancy Services (TCS)',
        subtitle: 'Software Engineer – DevOps & Cloud Operations · Nov 2024 – Aug 2026 · Hyderabad, India',
        bullets: [
          'Built and maintained reusable pipelines in Jenkins, GitHub Actions, and Azure DevOps automating build, testing, security checks, and multi-environment deployments, with SonarQube SAST gates, Trivy scanning, and OWASP Dependency-Check catching issues before release.',
          'Managed Dockerized microservices on Amazon EKS and Azure AKS, handling manifests, networking, resource requests/limits, quotas, and deployments, debugging failing workloads end to end.',
          'Managed Incident, Event, and Change Management within an ITIL framework, reducing MTTR by 30% through root-cause troubleshooting and structured post-incident reviews.',
          'Automated zero-downtime schema updates and chunked backfills for over 1 million records using Python (psycopg2) against PostgreSQL.',
          'Designed and deployed highly available 3-tier AWS infrastructure using Terraform across dev, staging, and prod, isolating app and RDS PostgreSQL tiers in private subnets behind an ALB and CloudFront.',
          'Eliminated public SSH across the EC2 fleet by migrating to AWS SSM Session Manager and enforcing least-privilege IAM roles.',
          'Reduced monthly cloud infrastructure costs by over 50% through VPC Gateway Endpoints, right-sizing, and CloudWatch budget alerting.'
        ],
        tech: ['AWS', 'Azure', 'EKS', 'AKS', 'Docker', 'Jenkins', 'GitHub Actions', 'Terraform', 'PostgreSQL', 'Python', 'Prometheus', 'Grafana', 'Dynatrace'],
        link: 'https://linkedin.com/in/prafulchalakh',
        linkText: 'View Experience ↗'
      },
      visual: `
        <div class="k-nav">
          <span class="k-logo">TCS</span>
          <div class="k-menu">
            <span>DEVOPS</span><span class="k-active">CLOUD</span><span>INFRA</span>
          </div>
        </div>
        <div class="k-body">
          <div class="k-company">Tata Consultancy Services</div>
          <div class="k-role">Software Engineer – DevOps &amp; Cloud</div>
          <div class="k-period">Nov 2024 – Aug 2026 · Hyderabad</div>
          <div class="k-metrics">
            <div class="k-metric"><span class="k-big">−30%</span><span class="k-unit">MTTR</span></div>
            <div class="k-metric"><span class="k-big">50%+</span><span class="k-unit">Cost Cut</span></div>
            <div class="k-metric"><span class="k-big">1M+</span><span class="k-unit">Records</span></div>
          </div>
          <div class="k-tags">
            <span class="k-tag">Jenkins</span><span class="k-tag">Docker</span>
            <span class="k-tag">EKS</span><span class="k-tag">Terraform</span>
            <span class="k-tag">Prometheus</span>
          </div>
          <div class="card-inspect-hint">Click card for full details ↗</div>
        </div>
      `,
      code: `TATA CONSULTANCY SERVICES (TCS)
Software Engineer – DevOps & Cloud · Nov 2024 – Aug 2026

• Reduced incident MTTR by 30% with RCA
• Automated migrations for 1M+ records
• 3-tier AWS infra via Terraform
• Cut monthly cloud spend by over 50%
• Enforced SonarQube & Trivy quality gates`,
      codeMeta: `<!-- Company: TCS -->
<!-- Focus: Cloud Infrastructure & Reliability -->
<!-- Certs: AWS Solutions Architect, SysOps, Dev -->
<!-- Scale: High-availability production -->`
    }
  ];

  const PROJ_CARDS = [
    {
      id: 'doktriai',
      bg: '#0D1B1A',
      textColor: '#ffffff',
      tags: ['all', 'go'],
      badge: { num: '5', pct: 'Layers' },
      details: {
        category: 'Featured Project · Autonomous Systems',
        title: 'DoktriAI: Autonomous Container Control Plane & AI Gateway',
        subtitle: 'Go (Golang) · Docker · Model Context Protocol (MCP) · HMAC-SHA256 · JSON-RPC · SSE',
        bullets: [
          'Engineered an autonomous container control plane with an integrated Model Context Protocol (MCP) server in Go, enabling secure, declarative deployment, log streaming, and scaling via AI operational agents.',
          'Built dry-run manifest validators, Unicode sanitizers, and HMAC-SHA256 API token verification to enforce RBAC and sanitize agent-generated infrastructure plans before execution.',
          'Implemented a Plan-Then-Execute (PTE) approval gate and workload-level circuit breakers to quarantine high-risk cluster actions and prevent cascading restart storms.'
        ],
        tech: ['Go', 'Docker', 'MCP', 'HMAC-SHA256', 'JSON-RPC', 'SSE', 'RBAC', 'Container Security'],
        link: 'https://github.com/Praful224',
        linkText: 'View on GitHub ↗'
      },
      visual: `
        <div class="k-nav">
          <span class="k-logo k-logo-hot">FEATURED</span>
          <div class="k-menu">
            <span>Go</span><span>Docker</span><span class="k-active">MCP</span>
          </div>
        </div>
        <div class="k-body">
          <div class="k-project-title">DoktriAI</div>
          <div class="k-project-sub">Container Control Plane &amp; AI Agent Gateway</div>
          <div class="k-tags">
            <span class="k-tag">Go</span><span class="k-tag">Docker</span>
            <span class="k-tag">MCP</span><span class="k-tag">HMAC-SHA256</span>
            <span class="k-tag">JSON-RPC</span><span class="k-tag">SSE</span>
          </div>
          <div class="k-spec-grid">
            <div class="k-spec-row"><span class="k-sk">Language</span><span class="k-sv">Go</span></div>
            <div class="k-spec-row"><span class="k-sk">Protocol</span><span class="k-sv">MCP + JSON-RPC</span></div>
            <div class="k-spec-row"><span class="k-sk">Auth</span><span class="k-sv">HMAC-SHA256 + RBAC</span></div>
            <div class="k-spec-row"><span class="k-sk">Safety</span><span class="k-sv">PTE Gates + Circuit Breakers</span></div>
          </div>
          <div class="card-inspect-hint">Click card for full details ↗</div>
        </div>
      `,
      code: `<h1>DoktriAI</h1>
<p>Autonomous container control plane
with integrated MCP server in Go.</p>

<h2>Core Features</h2>
<li>Dry-run manifest validators</li>
<li>Unicode sanitizers</li>
<li>HMAC-SHA256 token verification</li>
<li>Plan-Then-Execute approval gates</li>
<li>Workload circuit breakers</li>`,
      codeMeta: `<!-- Go · Docker · MCP · HMAC · JSON-RPC · SSE -->
<!-- type: container control plane -->
<!-- safety: PTE gates + circuit breakers -->`
    },
    {
      id: 'devsecops',
      bg: '#1A0E08',
      textColor: '#ffffff',
      tags: ['all', 'devops'],
      badge: { num: '4', pct: 'Stages' },
      details: {
        category: 'Project · CI/CD & Security Orchestration',
        title: 'Automated DevSecOps Compliance & Security Orchestration Platform',
        subtitle: 'Jenkins · Docker · Trivy · SonarQube · OWASP Dependency-Check',
        bullets: [
          'Built automated CI pipelines for artifact compilation and container image builds using isolated, secure build agents.',
          'Integrated Trivy container scans and SonarQube SAST gates into delivery pipelines to enforce security compliance before release.',
          'Optimized build performance with multi-stage Docker builds, reducing container image size and decreasing attack surface vulnerability.'
        ],
        tech: ['Jenkins', 'Docker', 'Trivy', 'SonarQube', 'OWASP Dependency-Check', 'Linux', 'Bash'],
        link: 'https://github.com/Praful224',
        linkText: 'View Pipeline Architecture ↗'
      },
      visual: `
        <div class="k-nav">
          <span class="k-logo">DEVOPS</span>
          <div class="k-menu">
            <span>Jenkins</span><span class="k-active">Pipeline</span><span>Security</span>
          </div>
        </div>
        <div class="k-body">
          <div class="k-project-title">DevSecOps Platform</div>
          <div class="k-project-sub">Automated Compliance &amp; Security Orchestration</div>
          <div class="k-pipeline">
            <div class="k-stage">BUILD</div>
            <div class="k-arrow">→</div>
            <div class="k-stage">SCAN</div>
            <div class="k-arrow">→</div>
            <div class="k-stage">GATE</div>
            <div class="k-arrow">→</div>
            <div class="k-stage k-stage-hot">DEPLOY</div>
          </div>
          <div class="k-tags">
            <span class="k-tag">Jenkins</span><span class="k-tag">Docker</span>
            <span class="k-tag">Trivy</span><span class="k-tag">SonarQube</span>
          </div>
          <div class="k-metric-single"><span class="k-big-inline">0</span> vulns shipped</div>
          <div class="card-inspect-hint">Click card for full details ↗</div>
        </div>
      `,
      code: `<h1>DevSecOps Platform</h1>
<p>Automated CI pipelines with integrated
security scanning and quality gates.</p>

<h2>Pipeline</h2>
<li>Artifact compilation + container builds</li>
<li>Trivy container vulnerability scanning</li>
<li>SonarQube SAST quality gates</li>
<li>Multi-stage Docker optimization</li>`,
      codeMeta: `<!-- Jenkins · Docker · Trivy · SonarQube -->
<!-- stages: BUILD → SCAN → GATE → DEPLOY -->
<!-- vulns shipped: 0 -->`
    },
    {
      id: 'gitops',
      bg: '#0E1520',
      textColor: '#ffffff',
      tags: ['all', 'cloud'],
      badge: { num: '3', pct: 'Envs' },
      details: {
        category: 'Project · Cloud-Native Infrastructure',
        title: 'GitOps-Driven Cloud-Native Deployment Architecture',
        subtitle: 'ArgoCD · Kubernetes (EKS / AKS) · Helm · Prometheus · Grafana',
        bullets: [
          'Implemented GitOps continuous delivery using ArgoCD and Helm to reconcile microservice state on Kubernetes clusters with Git as the single source of truth.',
          'Standardized deployment parameterization across Dev, Staging, and Production using modular Helm charts, eliminating environment configuration drift.',
          'Integrated cluster-level health checks and monitoring metrics with Prometheus and Grafana for real-time workload status.'
        ],
        tech: ['ArgoCD', 'Kubernetes', 'Helm', 'AWS EKS', 'Azure AKS', 'GitOps', 'Prometheus', 'Grafana'],
        link: 'https://github.com/Praful224',
        linkText: 'View on GitHub ↗'
      },
      visual: `
        <div class="k-nav">
          <span class="k-logo">GITOPS</span>
          <div class="k-menu">
            <span>ArgoCD</span><span>Helm</span><span class="k-active">K8s</span>
          </div>
        </div>
        <div class="k-body">
          <div class="k-project-title">GitOps Deployment</div>
          <div class="k-project-sub">Cloud-Native Architecture on EKS / AKS</div>
          <div class="k-envs">
            <div class="k-env"><span class="k-env-label">DEV</span><span class="k-env-arrow">→</span></div>
            <div class="k-env"><span class="k-env-label">STG</span><span class="k-env-arrow">→</span></div>
            <div class="k-env k-env-prod"><span class="k-env-label">PROD</span><span class="k-env-badge">✓ live</span></div>
          </div>
          <div class="k-tags">
            <span class="k-tag">ArgoCD</span><span class="k-tag">EKS</span>
            <span class="k-tag">AKS</span><span class="k-tag">Helm</span>
            <span class="k-tag">Prometheus</span>
          </div>
          <div class="k-metric-single">Zero drift across environments</div>
          <div class="card-inspect-hint">Click card for full details ↗</div>
        </div>
      `,
      code: `<h1>GitOps Deployment Architecture</h1>
<p>Continuous delivery with ArgoCD
and Helm on Kubernetes clusters.</p>

<h2>Architecture</h2>
<li>ArgoCD + Helm GitOps reconciliation</li>
<li>Git = single source of truth</li>
<li>Modular Helm charts per environment</li>
<li>Zero configuration drift</li>`,
      codeMeta: `<!-- ArgoCD · EKS · AKS · Helm · Prometheus -->
<!-- environments: DEV → STG → PROD -->
<!-- drift: 0 -->`
    }
  ];

  function openDetailModal(card) {
    if (!card || !card.details) return;
    const d = card.details;
    const backdrop = document.getElementById('detailModalBackdrop');
    if (!backdrop) return;

    document.getElementById('modalCategory').textContent = d.category || 'Details';
    document.getElementById('modalTitle').textContent = d.title || card.id;
    document.getElementById('modalSubtitle').textContent = d.subtitle || '';

    const bulletsList = document.getElementById('modalBullets');
    bulletsList.innerHTML = '';
    (d.bullets || []).forEach(b => {
      const li = document.createElement('li');
      li.textContent = b;
      bulletsList.appendChild(li);
    });

    const tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = '';
    (d.tech || []).forEach(t => {
      const span = document.createElement('span');
      span.className = 'modal-tag';
      span.textContent = t;
      tagsContainer.appendChild(span);
    });

    const footer = document.getElementById('modalFooter');
    footer.innerHTML = '';
    if (d.link) {
      const a = document.createElement('a');
      a.className = 'modal-btn modal-btn-primary';
      a.href = d.link;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = d.linkText || 'Open Link ↗';
      footer.appendChild(a);
    }

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDetailModal() {
    const backdrop = document.getElementById('detailModalBackdrop');
    if (backdrop) {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('modalCloseBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeDetailModal);

    const backdrop = document.getElementById('detailModalBackdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeDetailModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDetailModal();
    });
  });

  function injectCardStyles() {
    if (document.getElementById('belt-internal-styles')) return;
    const style = document.createElement('style');
    style.id = 'belt-internal-styles';
    style.textContent = `
      .belt-card .k-nav {
        display: flex; justify-content: space-between; align-items: center;
        padding: 4.4cqw 4.4cqw 0; margin-top: 1cqw;
      }
      .belt-card .k-logo {
        font-family: "IBM Plex Mono", monospace; font-size: 3cqw;
        font-weight: 700; letter-spacing: 0.05em; opacity: 0.9;
      }
      .belt-card .k-logo-hot { color: #FF5A1F; }
      .belt-card .k-menu {
        display: flex; gap: 2.5cqw; font-family: "IBM Plex Mono", monospace;
        font-size: 1.3cqw; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.75;
      }
      .belt-card .k-active {
        outline: 1px solid rgba(255,255,255,0.5); padding: 0.5cqw 1.2cqw; opacity: 1;
      }
      .belt-card .k-body { padding: 4cqw 4.4cqw 2cqw; }
      .belt-card .k-company {
        font-family: "Newsreader", Georgia, serif; font-size: 5cqw;
        line-height: 1.1; margin-bottom: 1.5cqw;
      }
      .belt-card .k-role { font-size: 2.2cqw; opacity: 0.85; margin-bottom: 0.8cqw; }
      .belt-card .k-period {
        font-family: "IBM Plex Mono", monospace; font-size: 1.5cqw;
        opacity: 0.6; margin-bottom: 2.5cqw;
      }
      .belt-card .k-tags { display: flex; flex-wrap: wrap; gap: 1cqw; margin-bottom: 2cqw; }
      .belt-card .k-tag {
        font-family: "IBM Plex Mono", monospace; font-size: 1.3cqw;
        padding: 0.5cqw 1.2cqw; border: 1px solid rgba(255,255,255,0.25);
        border-radius: 2px; opacity: 0.8;
      }
      .belt-card .k-quote {
        font-family: "Newsreader", Georgia, serif; font-style: italic;
        font-size: 2.8cqw; opacity: 0.7; margin-top: 1cqw;
      }
      .belt-card .k-metrics { display: flex; gap: 4cqw; margin-bottom: 2cqw; }
      .belt-card .k-metric { display: flex; flex-direction: column; }
      .belt-card .k-big {
        font-family: "IBM Plex Mono", monospace; font-size: 6.5cqw;
        font-weight: 700; line-height: 1; letter-spacing: -0.03em; color: #FF5A1F;
      }
      .belt-card .k-unit {
        font-size: 1.4cqw; opacity: 0.6; margin-top: 0.5cqw;
        font-family: "IBM Plex Mono", monospace; text-transform: uppercase; letter-spacing: 0.08em;
      }
      .belt-card .k-footer {
        position: absolute; bottom: 4cqw; left: 4.4cqw; right: 4.4cqw;
        display: flex; align-items: center; gap: 3cqw; padding-top: 2cqw;
        border-top: 1px solid rgba(255,255,255,0.2);
      }
      .belt-card .k-num {
        font-family: "IBM Plex Mono", monospace; font-size: 6cqw;
        font-weight: 400; line-height: 0.9; letter-spacing: -0.04em;
      }
      .belt-card .k-sep { width: 1px; height: 5cqw; background: rgba(255,255,255,0.3); }
      .belt-card .k-stat { display: flex; flex-direction: column; gap: 0.5cqw; }
      .belt-card .k-project-title {
        font-family: "Newsreader", Georgia, serif; font-size: 5.5cqw;
        line-height: 1.05; margin-bottom: 1.2cqw;
      }
      .belt-card .k-project-sub { font-size: 1.9cqw; opacity: 0.75; margin-bottom: 2.2cqw; }
      .belt-card .k-spec-grid { display: flex; flex-direction: column; gap: 1cqw; margin-top: 1.5cqw; }
      .belt-card .k-spec-row {
        display: flex; justify-content: space-between; font-family: "IBM Plex Mono", monospace;
        font-size: 1.5cqw; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 0.8cqw;
      }
      .belt-card .k-sk { opacity: 0.5; }
      .belt-card .k-sv { font-weight: 500; }
      .belt-card .k-pipeline { display: flex; align-items: center; gap: 1.2cqw; margin: 2cqw 0; }
      .belt-card .k-stage {
        font-family: "IBM Plex Mono", monospace; font-size: 1.4cqw; font-weight: 600;
        padding: 0.8cqw 1.8cqw; border: 1px solid rgba(255,255,255,0.3); border-radius: 2px;
      }
      .belt-card .k-stage-hot { background: #FF5A1F; border-color: #FF5A1F; }
      .belt-card .k-arrow { font-family: "IBM Plex Mono", monospace; font-size: 1.4cqw; opacity: 0.5; }
      .belt-card .k-envs { display: flex; gap: 2cqw; margin: 2cqw 0; }
      .belt-card .k-env {
        display: flex; align-items: center; gap: 1cqw; font-family: "IBM Plex Mono", monospace;
        font-size: 1.8cqw; font-weight: 600; opacity: 0.75;
      }
      .belt-card .k-env-prod { color: #10B981; opacity: 1; }
      .belt-card .k-env-badge { font-size: 1.3cqw; opacity: 0.8; }
      .belt-card .k-metric-single {
        font-family: "IBM Plex Mono", monospace; font-size: 1.8cqw; opacity: 0.7; margin-top: 1.5cqw;
      }
      .belt-card .k-big-inline { font-size: 3cqw; font-weight: 700; color: #10B981; }
    `;
    document.head.appendChild(style);
  }

  function createVisualCard(card, cw, ch) {
    const el = document.createElement('div');
    el.className = 'belt-card';
    el.dataset.cardId = card.id;
    el.style.cssText = `
      position: absolute;
      top: 40px;
      left: 0;
      width: ${cw}px;
      height: ${ch}px;
      border-radius: 12px;
      overflow: hidden;
      background: ${card.bg};
      color: ${card.textColor || '#fff'};
      will-change: transform;
      user-select: none;
      container-type: inline-size;
      font-family: var(--sans, system-ui);
      box-shadow: 0 12px 36px rgba(0,0,0,0.22);
      border: 1px solid rgba(255,255,255,0.08);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
    `;
    el.innerHTML = card.visual;
    return el;
  }

  function createCodeBlock(card, cw, ch) {
    const el = document.createElement('div');
    el.className = 'belt-code';
    el.dataset.cardId = card.id;
    el.style.cssText = `
      position: absolute;
      top: 60px;
      left: 0;
      width: ${cw}px;
      height: ${ch}px;
      overflow: hidden;
      white-space: pre;
      pointer-events: none;
      visibility: hidden;
      border-radius: 12px;
      background: var(--bg-surface, #121B24);
      border: 1px solid var(--border, #223243);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    `;

    const htmlBlock = document.createElement('div');
    htmlBlock.style.cssText = `
      position: absolute;
      top: 20px;
      left: 20px;
      right: 46%;
      font-family: var(--mono, monospace);
      font-size: 11px;
      line-height: 1.5;
      color: var(--code, #7A7F88);
      white-space: pre-wrap;
      word-break: break-word;
    `;
    htmlBlock.textContent = card.code;

    const metaBlock = document.createElement('div');
    metaBlock.style.cssText = `
      position: absolute;
      top: 20px;
      left: 56%;
      right: 20px;
      font-family: var(--mono, monospace);
      font-size: 10.5px;
      line-height: 1.5;
      color: var(--muted, #8B9098);
      white-space: pre-wrap;
      word-break: break-word;
      border-left: 1px solid var(--border, #D0D5DC);
      padding-left: 14px;
    `;
    metaBlock.textContent = card.codeMeta;

    el.appendChild(htmlBlock);
    el.appendChild(metaBlock);
    return el;
  }

  function createBelt(config) {
    const { stageEl, cardsEl, cards, initialFilter } = config;
    if (!stageEl || !cardsEl) return null;

    let cw = 0, ch = 0, gap = 0, Lx = 0, span = 0;
    let off = 0, vel = 0;
    let hoverVal = 0, isHovered = false;
    let dragging = false, dragLastX = 0, dragLastT = 0;
    let currentFilter = initialFilter || 'all';
    let visualEls = [];
    let codeEls = [];
    let sparks = [];
    let lastTs = null;
    let shownBadgeCardId = null;
    let badgeNumShown = 0;

    function getFilteredCards() {
      return cards.filter(c => c.tags.includes(currentFilter));
    }

    function measure() {
      const isMobile = window.innerWidth <= 768;
      cw = isMobile ? Math.min(window.innerWidth * 0.88, 380) : Math.min(Math.max(window.innerWidth * 0.44, 460), 600);
      ch = isMobile ? 380 : 360;
      gap = isMobile ? 24 : 40;
      Lx = window.innerWidth / 2;
      span = cw + gap;
    }

    function buildCards() {
      cardsEl.innerHTML = '';
      visualEls = [];

      cards.forEach(card => {
        const ve = createVisualCard(card, cw, ch);
        cardsEl.appendChild(ve);
        visualEls.push(ve);
      });

      // Position the first card nicely centered in the viewport
      off = (window.innerWidth - cw) / 2;
    }

    function tick(ts) {
      if (!lastTs) lastTs = ts;
      const dt = Math.min((ts - lastTs) / 1000, 0.1);
      lastTs = ts;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      // Gentle, readable drift speed: ~22px/s (user has ample time to read)
      const autoSpeed = prefersReduced ? 0 : -22;
      const targetHover = isHovered ? 1 : 0;
      hoverVal += (targetHover - hoverVal) * Math.min(dt * 6, 1);

      if (!dragging) {
        // Pauses completely to 0 speed on hover so user can easily read and inspect
        const targetVel = autoSpeed * (1 - hoverVal);
        vel += (targetVel - vel) * (1 - Math.exp(-3.5 * dt));
        off += vel * dt;
      }

      const active = getFilteredCards();
      const N = active.length;
      if (N === 0) {
        requestAnimationFrame(tick);
        return;
      }

      const p = span * N;

      // Update positions
      active.forEach((card, idx) => {
        const cardOriginalIdx = cards.indexOf(card);
        const vi = visualEls[cardOriginalIdx];
        const ci = codeEls[cardOriginalIdx];
        if (!vi || !ci) return;

        let x = ((off + idx * span) % p);
        if (x < -span) x += p;
        if (x > p - span) x -= p;

        // Continuous seamless loop across the viewport
        while (x < -cw - gap) x += p;
        while (x > window.innerWidth + gap) x -= p;

        vi.style.transform = `translate3d(${x}px, 0, 0)`;
        vi.style.display = 'block';
        vi.style.visibility = 'visible';
        vi.style.opacity = '1';
        vi.style.clipPath = '';
        vi.style.webkitMaskImage = '';
        vi.style.maskImage = '';
      });

      // Hide non-active cards
      cards.forEach(card => {
        if (!active.includes(card)) {
          const cIdx = cards.indexOf(card);
          if (visualEls[cIdx]) visualEls[cIdx].style.display = 'none';
          if (codeEls[cIdx]) codeEls[cIdx].style.visibility = 'hidden';
        }
      });

      // Background particle canvas skipped for clean cards
      // drawFx(canvasEl, active, off, dt, ts, cw, ch, span, Lx, p, sparks, vel);

      requestAnimationFrame(tick);
    }

    function drawFx(canvas, activeCards, currentOff, dt, now, cardW, cardH, cardSpan, lineX, period, sparksPool, currentVel) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = stageEl.offsetWidth;
      const H = stageEl.offsetHeight;

      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
      }

      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const t = now / 1000;
      const rows = Math.ceil(cardH / 3);
      const cardTop = 60;
      const R = 0.3 * cardW;
      const cols = Math.ceil((R + 30) / 3);
      const tFrame = Math.floor(t * 9);
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      activeCards.forEach((card, i) => {
        let x = ((currentOff + i * cardSpan) % period);
        if (x < -cardSpan) x += period;
        if (x > period - cardSpan) x -= period;

        const cut = Math.max(0, Math.min(lineX - x, cardW));
        if (cut <= 0 || x + cardW <= lineX) return;

        // 1. Haze
        const hazeW = Math.min(140, x + cardW - lineX);
        if (hazeW > 0) {
          const haze = ctx.createLinearGradient(lineX, 0, lineX + hazeW, 0);
          haze.addColorStop(0, 'rgba(255,90,31,0.38)');
          haze.addColorStop(1, 'rgba(255,90,31,0)');
          ctx.fillStyle = haze;
          ctx.fillRect(lineX, cardTop, hazeW, cardH);
        }

        // 2. Grid particles
        for (let gc = 0; gc <= cols; gc++) {
          const sx = x + gc * 3;
          if (sx < lineX - 1) continue;
          const d = sx - lineX;
          if (d > R) continue;

          const p_base = Math.pow(1 - d / R, 1.7);

          for (let gr = -3; gr <= rows + 3; gr++) {
            const inside = gr >= 0 && gr < rows;
            const pProb = inside ? p_base * 0.92 : p_base * 0.16;
            if (!inside && Math.abs(gr < 0 ? gr : gr - rows) > 4) continue;

            const h1 = hash(gc, gr, i);
            if (h1 >= pProb) continue;

            if (!prefersReduced) {
              const h3 = hash(gc, gr, tFrame + 97);
              if (h3 < 0.22) continue;
            }

            const h2 = hash(gr, gc, i + 31);
            let colorIdx = (d < 12) ? (4 + Math.floor(h2 * 3)) : Math.floor(h2 * h2 * 7);
            ctx.fillStyle = PALETTE[Math.min(colorIdx, 6)];

            const sz = 1.1 + h2 * 1.6;
            const jx = (hash(gc, gr, i + 7) - 0.5) * 1.4;
            const jy = (hash(gr, gc, i + 13) - 0.5) * 1.4;

            ctx.fillRect(sx + jx - sz / 2, cardTop + gr * 3 + jy - sz / 2, sz, sz);
          }
        }

        // 3. Free sparks
        if (!prefersReduced && Math.random() < 0.6) {
          sparksPool.push({
            x: lineX + Math.random() * 24,
            y: cardTop + Math.random() * cardH,
            vx: -20 + Math.random() * 60 + (currentVel * 0.4),
            vy: (Math.random() - 0.5) * 40,
            life: 0.3 + Math.random() * 0.6,
            maxLife: 0.9,
            size: 0.8 + Math.random() * 1.6,
            color: PALETTE[Math.floor(Math.random() * 7)]
          });
        }
      });

      // Render sparks
      for (let sIdx = sparksPool.length - 1; sIdx >= 0; sIdx--) {
        const s = sparksPool[sIdx];
        s.life -= dt;
        if (s.life <= 0) {
          sparksPool.splice(sIdx, 1);
          continue;
        }
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        ctx.globalAlpha = Math.min(1, s.life * 2.5);
        ctx.fillStyle = s.color;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      }
      ctx.globalAlpha = 1;
    }

    let dragStartX = 0;
    let dragDistance = 0;

    // Pointer events
    stageEl.addEventListener('pointerenter', () => { isHovered = true; });
    stageEl.addEventListener('pointerleave', () => { isHovered = false; });

    stageEl.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      dragging = true;
      dragDistance = 0;
      dragStartX = e.clientX;
      dragLastX = e.clientX;
      dragLastT = e.timeStamp;
      stageEl.setPointerCapture(e.pointerId);
    });

    stageEl.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - dragLastX;
      dragDistance += Math.abs(dx);
      const dt_drag = Math.max(8, e.timeStamp - dragLastT);
      vel = (dx / dt_drag) * 1000 * 0.8 + vel * 0.2;
      off += dx;
      dragLastX = e.clientX;
      dragLastT = e.timeStamp;
    });

    stageEl.addEventListener('pointerup', (e) => {
      dragging = false;
      // If user clicked or tapped without dragging more than 6px, treat as card click
      if (dragDistance < 6) {
        const targetCard = e.target.closest('.belt-card');
        if (targetCard && targetCard.dataset.cardId) {
          const clickedCard = cards.find(c => c.id === targetCard.dataset.cardId);
          if (clickedCard) openDetailModal(clickedCard);
        }
      }
    });
    stageEl.addEventListener('pointercancel', () => { dragging = false; vel = 0; });

    stageEl.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        vel += -e.deltaX * 5;
      }
    }, { passive: false });

    // Filter listener
    stageEl.addEventListener('filter', (e) => {
      currentFilter = e.detail || 'all';
      off = (window.innerWidth - cw) / 2;
    });

    window.addEventListener('resize', () => {
      measure();
      buildCards();
    });

    measure();
    buildCards();
    requestAnimationFrame(tick);

    return {
      setFilter: (f) => {
        currentFilter = f;
        off = (window.innerWidth - cw) / 2;
      }
    };
  }

  function initBelts() {
    injectCardStyles();

    const expBelt = createBelt({
      stageEl: document.getElementById('exp-stage'),
      cardsEl: document.getElementById('exp-cards'),
      cards: EXP_CARDS,
      initialFilter: 'all'
    });

    const projBelt = createBelt({
      stageEl: document.getElementById('proj-stage'),
      cardsEl: document.getElementById('proj-cards'),
      cards: PROJ_CARDS,
      initialFilter: 'all'
    });

    window.projBelt = projBelt;
    window.expBelt = expBelt;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBelts);
  } else {
    initBelts();
  }
})();
