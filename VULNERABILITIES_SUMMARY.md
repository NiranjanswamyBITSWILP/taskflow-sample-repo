# TaskFlow Sample Repository - Ready for Scanning

## Overview

TaskFlow is now a complete sample repository with **intentional security issues, vulnerabilities, and code quality problems** for educational and testing purposes.

## What's Included

### ✅ Functional Application
- Express.js REST API backend
- React 18 TypeScript frontend  
- MongoDB database integration
- Docker containerization
- Complete CRUD operations
- User authentication with JWT

### ⚠️ Intentional Issues (12+)

**Security Vulnerabilities:**
1. Hardcoded API secrets in source code
2. CORS misconfiguration (wildcard origin '*')
3. Exposed environment variables via /debug endpoint
4. NoSQL injection in search functionality
5. XSS vulnerability in frontend (innerHTML with user data)
6. eval() usage for dynamic code execution
7. Sensitive data logged to console
8. No rate limiting on auth endpoints
9. Weak default encryption key
10. Missing JWT algorithm verification
11. Overly permissive JSON payload limit (50MB)
12. Timing attacks on authentication

**Vulnerable Dependencies:**
- request 2.88.0 (deprecated, has CVEs)
- eval 0.1.8 (unnecessary, dangerous package)
- lodash 4.17.19 (ReDoS vulnerability)

**License Issues:**
- Potential GPL/AGPL conflicts with MIT license
- Unlicensed dependency risks

### 📚 Documentation

**KNOWN_ISSUES.md**
- Complete list of 12+ vulnerabilities
- Detailed description of each issue
- Impact analysis
- Recommended fixes
- Severity ratings (HIGH, MEDIUM, LOW)

**SCANNING_GUIDE.md**
- Step-by-step scanning instructions
- Tool recommendations (SonarQube, ESLint, Snyk, Trivy, etc.)
- Expected findings
- Learning workflow
- Resources for secure coding

**README.md**
- Updated with vulnerability warnings
- Clear disclaimer about intentional issues
- Not for production use

## Use Cases

### 1. Security Training
- Learn to identify common vulnerabilities
- Understand attack vectors
- Practice secure coding

### 2. Tool Evaluation
- Test security scanning tools
- Compare tool capabilities
- Evaluate SAST/DAST tools

### 3. DevSecOps Pipeline Testing
- CI/CD integration testing
- Security gate validation
- Automated scanning setup

### 4. Penetration Testing Practice
- Hands-on vulnerability discovery
- Exploitation practice
- Report writing

### 5. Code Review Training
- Learn to spot issues manually
- Understand code review process
- Security-focused review techniques

## Scanning Commands

### Quick Start
```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Run basic scans
npm audit
npx eslint . --ext .js,.ts,.tsx

# Start application
docker-compose up -d

# Access at http://localhost:3000
```

### Comprehensive Scanning
```bash
# SonarQube
sonar-scanner -Dsonar.projectKey=taskflow-sample

# Dependency scanning
npm audit --audit-level=moderate
snyk test

# Container scanning
docker build -t taskflow-backend ./backend
trivy image taskflow-backend

# DAST
zaproxy -quickurl http://localhost:3000
```

## Expected Vulnerabilities to Find

### Critical
- [ ] Hardcoded secrets
- [ ] CORS wildcard
- [ ] XSS vulnerability
- [ ] eval() usage
- [ ] Vulnerable dependencies

### High
- [ ] NoSQL injection
- [ ] No rate limiting
- [ ] Debug endpoint
- [ ] Sensitive logging

### Medium  
- [ ] Weak encryption
- [ ] Default JWT secret
- [ ] Missing algorithm verification
- [ ] Large payload limit

### Low
- [ ] Code quality issues
- [ ] Missing validation
- [ ] License conflicts

## Repository Structure

```
taskflow-sample-repo/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── controllers/        # API logic with vulnerabilities
│   │   ├── models/             # Database schemas
│   │   ├── middleware/         # Auth & error handling
│   │   ├── utils/              # JWT, validators (with issues)
│   │   └── server.js           # Main app (with CORS issue)
│   └── package.json            # With vulnerable deps
│
├── frontend/                   # React + TypeScript UI
│   ├── src/
│   │   ├── services/           # API calls (with XSS/eval)
│   │   ├── components/         # React components
│   │   └── pages/              # Page components
│   └── package.json
│
├── docker-compose.yml          # Full stack setup
├── README.md                   # Updated with warnings
├── KNOWN_ISSUES.md            # Vulnerability catalog
├── SCANNING_GUIDE.md          # Tool recommendations
├── PUBLIC_RELEASE_NOTES.md    # Public release info
└── LICENSE                     # MIT License
```

## Key Characteristics

✅ **Realistic** - Issues mirror real-world vulnerabilities
✅ **Educational** - Clear documentation of each issue
✅ **Complete** - Full working application with problems
✅ **Safe** - Not harmful outside test environment
✅ **Documented** - Detailed guides included
✅ **Testable** - Works with all major scanning tools
✅ **Reproducible** - Consistent vulnerabilities across scans

## For Researchers & Educators

This repository is ideal for:
- University cybersecurity courses
- Security training programs
- Tool benchmarking
- Vulnerability database research
- Secure coding workshops

## For Security Professionals

Use for:
- Tool evaluation and comparison
- Team training and assessment
- CI/CD pipeline testing
- Security metrics baseline
- Demonstration purposes

## Important Disclaimers

⚠️ **DO NOT** deploy to production
⚠️ **DO NOT** expose to untrusted networks
⚠️ **DO NOT** use code patterns in real projects
⚠️ **DO** use only in isolated test environments
⚠️ **DO** understand each vulnerability before practice
⚠️ **DO** document findings and fixes

## Statistics

- **Total Files**: 53
- **Security Issues**: 12+
- **Vulnerable Dependencies**: 3
- **Lines of Code**: ~3,000
- **Components**: 9 React components
- **API Endpoints**: 12+
- **Database Models**: 2
- **Commit History**: Clean (3 commits)

## Getting Started

1. **Clone** the repository
2. **Read** KNOWN_ISSUES.md and SCANNING_GUIDE.md
3. **Set up** local environment
4. **Run** security tools
5. **Identify** vulnerabilities
6. **Compare** findings
7. **Learn** from results

## Next Steps

After scanning and analysis:
1. Document findings
2. Estimate severity
3. Create fix proposals
4. Implement corrections
5. Re-scan to verify
6. Share lessons learned

## Support

For questions or suggestions:
- Review KNOWN_ISSUES.md for details
- Check SCANNING_GUIDE.md for tools
- See README.md for general info
- Review inline code comments

## License

MIT License - Educational use

---

**Perfect for**: Security training, tool evaluation, vulnerability research, and cybersecurity education.

**Status**: Ready for public distribution and scanning.
