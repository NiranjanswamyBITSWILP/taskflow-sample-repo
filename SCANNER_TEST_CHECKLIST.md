# Scanner Test Checklist

Use this checklist to verify that scanning tools properly detect the intentional vulnerabilities in TaskFlow.

## Security Vulnerabilities Checklist

### High Severity Issues
- [ ] **Hardcoded Secrets**
  - Location: `backend/src/controllers/taskController.js`
  - Pattern: `const INTERNAL_API_KEY = 'sk-prod-...'`
  - Tool Detection: SonarQube, Snyk, TruffleHog

- [ ] **Hardcoded Secrets (Auth)**
  - Location: `backend/src/controllers/authController.js`
  - Pattern: `const ENCRYPTION_KEY = 'weakkey123456789'`
  - Tool Detection: SonarQube, Snyk

- [ ] **CORS Wildcard Configuration**
  - Location: `backend/src/server.js`
  - Pattern: `app.use(cors({ origin: '*' }))`
  - Tool Detection: ESLint, SonarQube

- [ ] **Exposed Environment Variables**
  - Location: `backend/src/server.js` - `/debug` endpoint
  - Pattern: `res.json({ env: process.env })`
  - Tool Detection: Manual code review, DAST

- [ ] **XSS Vulnerability (innerHTML)**
  - Location: `frontend/src/services/taskService.ts`
  - Pattern: `document.body.innerHTML += '<div>...'`
  - Tool Detection: ESLint, SonarQube, Burp Suite

- [ ] **eval() Usage**
  - Location: `frontend/src/services/taskService.ts`
  - Pattern: `const dynamicEval = (code) => eval(code)`
  - Tool Detection: ESLint, SonarQube

### Medium Severity Issues
- [ ] **NoSQL Injection Pattern**
  - Location: `backend/src/controllers/taskController.js`
  - Pattern: `const query = \`{ title: { $regex: "${search}" }}`
  - Tool Detection: SonarQube, Snyk

- [ ] **Sensitive Data Logging**
  - Location: `backend/src/controllers/authController.js`
  - Pattern: `console.log('New user registered:', { password: ... })`
  - Tool Detection: Manual review, SonarQube

- [ ] **Default JWT Secret**
  - Location: `backend/src/utils/jwt.js`
  - Pattern: `const DEFAULT_SECRET = 'dev-secret-key-...'`
  - Tool Detection: SonarQube, Snyk

- [ ] **Missing JWT Algorithm Verification**
  - Location: `backend/src/utils/jwt.js`
  - Pattern: `jwt.verify(token, secret)` without algorithm option
  - Tool Detection: SonarQube

- [ ] **No Rate Limiting**
  - Location: `backend/src/controllers/authController.js`
  - Pattern: Direct login without rate limit check
  - Tool Detection: DAST, Manual review

- [ ] **Weak Encryption Key**
  - Location: `backend/src/controllers/authController.js`
  - Pattern: Hardcoded weak key in code
  - Tool Detection: Manual review, SonarQube

### Low Severity Issues
- [ ] **Overly Permissive Payload Limit**
  - Location: `backend/src/server.js`
  - Pattern: `express.json({ limit: '50mb' })`
  - Tool Detection: ESLint, code review

- [ ] **Deprecated Packages in Use**
  - Location: `backend/package.json`
  - Pattern: `"request": "^2.88.0"`
  - Tool Detection: npm audit, Snyk

## Dependency Issues Checklist

- [ ] **Old Lodash Version**
  - Package: `lodash 4.17.19`
  - Issue: ReDoS vulnerability
  - Detection: `npm audit`, Snyk

- [ ] **Deprecated Request Package**
  - Package: `request 2.88.0`
  - Issue: No longer maintained, has CVEs
  - Detection: `npm audit`, Snyk

- [ ] **Dangerous eval Package**
  - Package: `eval 0.1.8`
  - Issue: Unnecessary, promotes dangerous practices
  - Detection: Manual inspection, FOSSA

- [ ] **License Conflicts**
  - Issue: Potential GPL/AGPL dependencies with MIT license
  - Detection: FOSSA, Black Duck, WhiteSource

## Code Quality Issues Checklist

- [ ] **Missing Input Validation** - Some endpoints
- [ ] **Insufficient Error Handling** - Catch blocks
- [ ] **No HTTPS Enforcement** - All routes
- [ ] **Unauthenticated /health Endpoint** - Information disclosure
- [ ] **Code Duplication** - Similar patterns repeated
- [ ] **Missing Type Definitions** - Some functions
- [ ] **Inadequate Test Coverage** - Low test count

## Tool-Specific Detection Matrix

### SonarQube (SAST)
- [x] Hardcoded secrets
- [x] XSS vulnerabilities
- [x] NoSQL injection
- [x] Code complexity
- [x] Duplicate code
- [x] Security hotspots

### npm audit
- [x] Vulnerable dependencies
- [x] Outdated packages
- [x] License issues

### Snyk
- [x] Vulnerable packages
- [x] Hardcoded secrets
- [x] Code vulnerabilities
- [x] License conflicts

### ESLint (with security plugins)
- [x] eval() usage
- [x] Hardcoded values
- [x] Unsafe patterns
- [x] Code style issues

### OWASP ZAP (DAST)
- [x] CORS misconfiguration
- [x] XSS vulnerabilities
- [x] Exposed endpoints
- [x] Information disclosure
- [x] Authentication bypass attempts

### Trivy (Container)
- [x] Docker base image vulnerabilities
- [x] Package vulnerabilities
- [x] Configuration issues

### FOSSA (License)
- [x] License conflicts
- [x] Unlicensed packages
- [x] GPL/AGPL concerns

## Scanning Workflow Verification

### Phase 1: Setup
- [ ] Repository cloned successfully
- [ ] Dependencies installed (npm install)
- [ ] Docker setup works (docker-compose up)
- [ ] Application accessible at http://localhost:3000

### Phase 2: Static Analysis
- [ ] npm audit runs successfully
- [ ] npm audit finds vulnerable packages
- [ ] ESLint detects issues
- [ ] SonarQube analysis completes
- [ ] SonarQube reports security issues

### Phase 3: Dependency Analysis
- [ ] Snyk test identifies vulnerabilities
- [ ] Snyk finds hardcoded secrets
- [ ] FOSSA detects license issues
- [ ] Black Duck reports findings (if available)

### Phase 4: Container Analysis
- [ ] Docker images build successfully
- [ ] Trivy scans complete
- [ ] Trivy reports image vulnerabilities
- [ ] Grype analysis works (if available)

### Phase 5: Dynamic Testing
- [ ] ZAP scan completes
- [ ] ZAP identifies CORS issue
- [ ] ZAP detects XSS
- [ ] Manual testing confirms issues
- [ ] Burp Suite finds additional issues

## Expected Vulnerability Count

| Severity | Expected Count | Tool |
|----------|---|---|
| Critical | 3-4 | SonarQube, Snyk |
| High | 5-7 | SonarQube, ESLint, DAST |
| Medium | 8-10 | SonarQube, Code Review |
| Low | 5-8 | Code Quality Tools |
| **Total** | **20-30** | All tools combined |

## False Positive Verification

Some tools may report false positives. Common ones:
- [ ] Regex pattern as legitimate query string
- [ ] Helper function flagged incorrectly
- [ ] Development-only code flagged
- [ ] Type annotations missed by scanner

## Documentation Verification

- [ ] KNOWN_ISSUES.md present and readable
- [ ] SCANNING_GUIDE.md has tool recommendations
- [ ] README.md includes vulnerability warnings
- [ ] VULNERABILITIES_SUMMARY.md provides overview
- [ ] Code comments mark intentional issues

## Final Verification

- [ ] All critical issues documented
- [ ] All vulnerabilities locatable in code
- [ ] Tools detect multiple issues
- [ ] False positives identified
- [ ] Documentation is accurate
- [ ] Repository is safe for sharing

## Scanner Recommendations

### Recommended Tool Combination
1. **SonarQube** - Comprehensive SAST
2. **npm audit** - Quick dependency check
3. **Snyk** - Advanced dependency scanning
4. **ESLint** - Code quality and patterns
5. **OWASP ZAP** - Dynamic testing
6. **Trivy** - Container security

### Time to Complete Full Scan
- Quick scan (npm audit + ESLint): 5-10 minutes
- Medium scan (add SonarQube): 15-30 minutes
- Full scan (all tools): 45-60 minutes

## Notes for Administrators

- Repository is intentionally vulnerable
- Safe for use in isolated test environments
- All vulnerabilities are documented
- Tools should detect majority of issues
- Some tool-specific tweaks may be needed
- Community tools are sufficient for detection

---

**Last Updated**: March 15, 2026
**Repository**: TaskFlow Sample Application
**Purpose**: Security Testing & Training
