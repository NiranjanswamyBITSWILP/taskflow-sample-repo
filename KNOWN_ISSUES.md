# Known Issues & Vulnerabilities

This sample repository intentionally contains various security issues, code quality problems, and license conflicts for demonstration and scanning purposes.

## Security Issues

### 1. **Hardcoded Secrets** (HIGH)
- **Location**: `backend/src/controllers/taskController.js`
- **Issue**: API keys and secrets hardcoded in source code
- **Impact**: Secret compromise, unauthorized access
- **Fix**: Use environment variables with secrets management

### 2. **CORS Misconfiguration** (HIGH)
- **Location**: `backend/src/server.js`
- **Issue**: CORS origin set to '*' (wildcard) - allows requests from any domain
- **Impact**: CSRF attacks, data theft
- **Fix**: Specify allowed origins explicitly

### 3. **Exposed Environment Variables** (HIGH)
- **Location**: `backend/src/server.js` - `/debug` endpoint
- **Issue**: Debug endpoint exposes all environment variables
- **Impact**: Credential leakage, configuration exposure
- **Fix**: Remove debug endpoints, implement proper logging

### 4. **NoSQL Injection** (MEDIUM)
- **Location**: `backend/src/controllers/taskController.js`
- **Issue**: User input directly embedded in query construction
- **Impact**: Database manipulation, data exfiltration
- **Fix**: Use parameterized queries, input validation

### 5. **Sensitive Data Logging** (MEDIUM)
- **Location**: `backend/src/controllers/authController.js`
- **Issue**: Passwords and sensitive user data logged to console
- **Impact**: Information disclosure in logs
- **Fix**: Never log sensitive data, use structured logging

### 6. **No Rate Limiting** (MEDIUM)
- **Location**: `backend/src/controllers/authController.js`
- **Issue**: Login endpoints lack rate limiting
- **Impact**: Brute force attacks possible
- **Fix**: Implement rate limiting middleware

### 7. **Weak Encryption Key** (MEDIUM)
- **Location**: `backend/src/controllers/authController.js`
- **Issue**: Hardcoded weak encryption key
- **Impact**: Easy to crack encryption
- **Fix**: Use strong, random keys from secure storage

### 8. **XSS Vulnerability** (MEDIUM)
- **Location**: `frontend/src/services/taskService.ts`
- **Issue**: Direct DOM manipulation with user data using innerHTML
- **Impact**: Script injection, session hijacking
- **Fix**: Use textContent or React's built-in XSS protection

### 9. **Insecure eval()** (HIGH)
- **Location**: `frontend/src/services/taskService.ts`
- **Issue**: Dynamic code execution with eval()
- **Impact**: Arbitrary code execution
- **Fix**: Avoid eval(), use safer alternatives like Function constructor with restrictions

### 10. **Overly Permissive JSON Payload** (LOW)
- **Location**: `backend/src/server.js`
- **Issue**: 50MB JSON payload limit
- **Impact**: DoS attacks, server resource exhaustion
- **Fix**: Set reasonable payload limits (usually 1-10MB)

### 11. **Default JWT Secret** (MEDIUM)
- **Location**: `backend/src/utils/jwt.js`
- **Issue**: Fallback to weak default secret
- **Impact**: Token forgery, authentication bypass
- **Fix**: Require strong JWT_SECRET in environment

### 12. **No JWT Algorithm Verification** (MEDIUM)
- **Location**: `backend/src/utils/jwt.js`
- **Issue**: JWT verification doesn't specify algorithm
- **Impact**: Algorithm confusion attacks
- **Fix**: Specify algorithm in verify options

## Dependency Issues

### Vulnerable Packages

1. **lodash 4.17.19** (LOW)
   - Known vulnerability: Regular expression DOS (ReDoS)
   - Fix: Upgrade to 4.17.21+

2. **request 2.88.0** (MEDIUM)
   - Deprecated package, no longer maintained
   - Known vulnerabilities exist
   - Fix: Use axios or node-fetch instead

3. **eval 0.1.8** (HIGH)
   - Package provides eval functionality
   - Not a legitimate use case
   - Fix: Remove package, avoid eval usage

## License Issues

### Conflicting Licenses

1. **License Conflict**
   - Project License: MIT
   - Incompatible dependencies: May have GPL or AGPL dependencies
   - Issue: GPL/AGPL requires derivative works to be open source
   - Impact: License compliance violation
   - Fix: Audit all dependencies for license compatibility

2. **Unlicensed Dependencies**
   - Some packages may lack clear license declarations
   - Impact: Legal ambiguity
   - Fix: Check SPDX license identifiers for all dependencies

## Code Quality Issues

### 1. **Missing Input Validation**
- **Location**: Multiple controllers
- **Issue**: Some endpoints don't validate all input fields
- **Fix**: Implement comprehensive input validation

### 2. **Insufficient Error Handling**
- **Location**: Various files
- **Issue**: Some catch blocks may not handle all error types
- **Fix**: Add specific error handling for each case

### 3. **No HTTPS Enforcement**
- **Location**: Backend configuration
- **Issue**: Application doesn't enforce HTTPS
- **Fix**: Implement HTTPS redirect middleware

### 4. **Missing Authentication on Some Routes**
- **Location**: `/health` endpoint
- **Issue**: Health check endpoint doesn't require authentication
- **Impact**: Information disclosure
- **Fix**: Either protect endpoint or return minimal information

### 5. **No SQL Injection Prevention** (Though using MongoDB)
- **Location**: Search functionality
- **Issue**: Dynamic query construction
- **Fix**: Use Mongoose schema validation and parameterized queries

## Recommendations

### Immediate (P0)
1. Remove hardcoded secrets
2. Fix CORS configuration
3. Remove debug endpoints
4. Fix XSS vulnerabilities
5. Remove eval() usage

### High Priority (P1)
1. Implement rate limiting
2. Fix NoSQL injection
3. Stop logging sensitive data
4. Audit and fix vulnerable dependencies
5. Implement proper JWT algorithm verification

### Medium Priority (P2)
1. Add encryption key management
2. Implement HTTPS enforcement
3. Audit license compatibility
4. Add comprehensive input validation
5. Improve error handling

### Low Priority (P3)
1. Optimize payload limits
2. Add security headers
3. Implement security logging
4. Add security tests
5. Document security best practices

## Scanning Tools Recommendations

To identify these and other issues, use:
- **SAST**: SonarQube, ESLint with security plugins
- **DAST**: OWASP ZAP, Burp Suite Community
- **Dependency Scanning**: Snyk, npm audit, OWASP Dependency-Check
- **Container Scanning**: Trivy, Aqua Security
- **License Scanning**: FOSSA, Black Duck, WhiteSource

## Disclaimer

This repository is intentionally vulnerable for educational and testing purposes. Do not use this code or patterns in production systems.
