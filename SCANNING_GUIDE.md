# Security Scanning Guide

This sample repository is designed to be used for testing security scanning tools and learning secure coding practices.

## How to Use This Repository for Scanning

### 1. Static Application Security Testing (SAST)

#### SonarQube
```bash
# Install SonarQube Scanner locally or use Docker
sonar-scanner \
  -Dsonar.projectKey=taskflow-sample \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=YOUR_TOKEN
```

#### ESLint with Security Plugins
```bash
npm install --save-dev eslint eslint-plugin-security

# Run scan
npx eslint . --ext .js,.ts,.tsx
```

### 2. Dependency Scanning

#### npm audit
```bash
npm audit --audit-level=moderate
```

#### Snyk
```bash
npm install -g snyk
snyk test
snyk monitor
```

#### OWASP Dependency-Check
```bash
dependency-check --scan . --format JSON --out ./reports
```

### 3. Container Scanning

#### Trivy (Docker Images)
```bash
# Scan frontend image
docker build -t taskflow-frontend ./frontend
trivy image taskflow-frontend

# Scan backend image
docker build -t taskflow-backend ./backend
trivy image taskflow-backend
```

#### Grype
```bash
grype taskflow-frontend
grype taskflow-backend
```

### 4. License Compliance Scanning

#### FOSSA
```bash
npm install -g fossa-cli
fossa analyze
fossa report
```

#### Black Duck
- Use Black Duck Hub for comprehensive license scanning

#### WhiteSource (now JFrog)
- Integrated scanning for licenses and vulnerabilities

### 5. Dynamic Application Security Testing (DAST)

#### OWASP ZAP
```bash
# Start the application first
docker-compose up -d

# Run ZAP scan
zaproxy -cmd -quickurl http://localhost:3000 -quickout zap-report.html
```

#### Burp Suite
1. Configure proxy to Burp Suite
2. Navigate through application manually or use automated scan
3. Review findings

### 6. Code Review

#### Key Areas to Review
1. **Security Issues** (See KNOWN_ISSUES.md)
   - Hardcoded secrets
   - CORS misconfiguration
   - Input validation
   - Authentication/Authorization

2. **Code Quality**
   - Function complexity
   - Code duplication
   - Missing error handling
   - Inconsistent patterns

3. **Dependency Management**
   - Outdated packages
   - Known vulnerabilities
   - License conflicts
   - Unused dependencies

## Expected Findings

When you scan this repository, you should detect:

### Critical/High Priority
- [ ] Hardcoded API keys in source code
- [ ] Overly permissive CORS configuration
- [ ] XSS vulnerabilities in frontend
- [ ] NoSQL injection patterns
- [ ] Missing authentication on endpoints
- [ ] Eval() usage
- [ ] Exposed environment variables
- [ ] Vulnerable dependencies (request, eval)

### Medium Priority
- [ ] Weak encryption keys
- [ ] Insufficient input validation
- [ ] Missing rate limiting
- [ ] Sensitive data in logs
- [ ] Default credentials

### Low Priority
- [ ] Large payload limits
- [ ] Code quality issues
- [ ] Missing security headers
- [ ] Documentation gaps

## Scanning Tool Recommendations

| Tool | Type | Best For |
|------|------|----------|
| **SonarQube** | SAST | Code quality, complexity, security patterns |
| **ESLint** | SAST | JavaScript/TypeScript code style |
| **npm audit** | Dependency | Node.js package vulnerabilities |
| **Snyk** | Dependency | Comprehensive dependency scanning |
| **Trivy** | Container | Docker image vulnerabilities |
| **OWASP ZAP** | DAST | Web application security testing |
| **Burp Suite** | DAST | Interactive security testing |
| **FOSSA** | License | License compliance checking |
| **Black Duck** | License | Enterprise license management |

## Workflow Example

```bash
# 1. Clone repository
git clone https://github.com/yourusername/taskflow-sample-repo.git
cd taskflow-sample-repo

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Run static analysis
cd ../backend
npx eslint . --ext .js
npm audit

# 4. Run SonarQube (if available)
sonar-scanner ...

# 5. Start application
docker-compose up -d

# 6. Run DAST tools
zaproxy ...

# 7. Review findings
# - Compare with KNOWN_ISSUES.md
# - Identify false positives
# - Learn from the vulnerabilities
```

## Learning Resources

After scanning, review these resources:

1. **OWASP Top 10**: Most critical web security vulnerabilities
2. **CWE List**: Common Weakness Enumeration database
3. **Secure Coding Practices**: CERT Secure Coding Standards
4. **Node.js Security**: Node.js Security Best Practices
5. **React Security**: React Security Best Practices

## Using Findings for Learning

1. **Identify vulnerabilities** using scanner output
2. **Locate vulnerable code** in the repository
3. **Understand the issue** by reading KNOWN_ISSUES.md
4. **Fix the vulnerability** by modifying code
5. **Re-run scan** to verify fix
6. **Document lessons learned**

## Contributing Fixes

If you want to practice fixing these vulnerabilities:

1. Create a branch for each fix
2. Address the specific vulnerability
3. Document what you changed
4. Run scans to verify the fix
5. Create a pull request with explanation

## Disclaimer

This repository is intentionally vulnerable for educational purposes. Do not deploy to production or expose to untrusted networks.
