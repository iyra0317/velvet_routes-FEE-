# Deployment Checklist

## Pre-Deployment

### 1. Environment Setup
- [ ] Create production `.env` file
- [ ] Set strong `JWT_SECRET`
- [ ] Configure production `DATABASE_URL`
- [ ] Add API keys (Stripe, Twilio, RapidAPI)
- [ ] Set `NODE_ENV=production`

### 2. Database
- [ ] Create production PostgreSQL database
- [ ] Run migrations: `npm run db:migrate`
- [ ] Optionally seed data: `npm run db:seed`
- [ ] Backup database regularly
- [ ] Setup database connection pooling

### 3. Security
- [ ] Enable CORS for specific origins only
- [ ] Add rate limiting middleware
- [ ] Implement JWT authentication
- [ ] Add input validation (express-validator)
- [ ] Enable HTTPS/SSL
- [ ] Add helmet.js for security headers
- [ ] Sanitize user inputs
- [ ] Add request logging

### 4. Code Quality
- [ ] Run TypeScript build: `npm run build`
- [ ] Fix all TypeScript errors
- [ ] Add error monitoring (Sentry)
- [ ] Add logging (Winston, Morgan)
- [ ] Write tests (Jest, Supertest)
- [ ] Code review

### 5. Performance
- [ ] Add Redis for caching
- [ ] Optimize database queries
- [ ] Add database indexes
- [ ] Enable gzip compression
- [ ] Setup CDN for static assets
- [ ] Add response caching

## Deployment Options

### Option 1: Heroku
```bash
# Install Heroku CLI
heroku login
heroku create velvetroutes-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your-secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Run migrations
heroku run npm run db:migrate
```

### Option 2: AWS (EC2 + RDS)
1. Create RDS PostgreSQL instance
2. Launch EC2 instance
3. Install Node.js and PostgreSQL client
4. Clone repository
5. Setup environment variables
6. Run migrations
7. Use PM2 for process management
8. Setup Nginx as reverse proxy

### Option 3: DigitalOcean
1. Create Droplet (Ubuntu)
2. Create Managed PostgreSQL database
3. Setup Node.js environment
4. Deploy code
5. Use PM2 for process management
6. Setup Nginx

### Option 4: Vercel/Railway
- Connect GitHub repository
- Add environment variables
- Auto-deploy on push

## Post-Deployment

### 1. Verification
- [ ] Test all API endpoints
- [ ] Check database connection
- [ ] Verify environment variables
- [ ] Test payment processing
- [ ] Test notifications
- [ ] Check logs for errors

### 2. Monitoring
- [ ] Setup uptime monitoring (UptimeRobot)
- [ ] Add error tracking (Sentry)
- [ ] Setup log aggregation (Loggly, Papertrail)
- [ ] Monitor database performance
- [ ] Track API response times

### 3. Backup & Recovery
- [ ] Setup automated database backups
- [ ] Test backup restoration
- [ ] Document recovery procedures
- [ ] Setup disaster recovery plan

### 4. Documentation
- [ ] Update API documentation
- [ ] Document deployment process
- [ ] Create runbook for common issues
- [ ] Document environment variables

## Production Environment Variables

```env
# Required
DATABASE_URL=postgresql://user:pass@host:5432/dbname
JWT_SECRET=strong-random-secret-change-this
NODE_ENV=production
PORT=5000

# Optional - Payment
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional - Notifications
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# Optional - Email
SENDGRID_API_KEY=SG...
EMAIL_FROM=noreply@velvetroutes.com

# Optional - External APIs
RAPIDAPI_KEY=...
BOOKING_COM_API_KEY=...
```

## Security Best Practices

### 1. Authentication
```typescript
// Add JWT middleware
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```

### 2. Rate Limiting
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 3. Input Validation
```typescript
import { body, validationResult } from 'express-validator';

router.post('/bookings',
  body('userId').isUUID(),
  body('customerInfo.email').isEmail(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Process request
  }
);
```

## Monitoring & Alerts

### Setup Alerts For:
- [ ] API downtime
- [ ] High error rates
- [ ] Slow response times
- [ ] Database connection issues
- [ ] High memory/CPU usage
- [ ] Failed payments
- [ ] Failed notifications

## Maintenance

### Regular Tasks
- [ ] Review logs weekly
- [ ] Update dependencies monthly
- [ ] Review security advisories
- [ ] Optimize database queries
- [ ] Clean up old data
- [ ] Review and update documentation

## Rollback Plan

If deployment fails:
1. Revert to previous version
2. Restore database backup if needed
3. Check logs for errors
4. Fix issues in development
5. Test thoroughly
6. Redeploy

## Support & Troubleshooting

### Common Issues

**Database Connection Failed**
- Check DATABASE_URL
- Verify database is running
- Check firewall rules
- Verify SSL settings

**High Memory Usage**
- Check for memory leaks
- Optimize queries
- Add connection pooling
- Scale vertically or horizontally

**Slow API Responses**
- Add database indexes
- Implement caching
- Optimize queries
- Use CDN for static assets

## Success Criteria

Deployment is successful when:
- [ ] All API endpoints respond correctly
- [ ] Database is accessible and performant
- [ ] Payments process successfully
- [ ] Notifications send correctly
- [ ] No critical errors in logs
- [ ] Response times < 500ms
- [ ] Uptime > 99.9%

---

**Remember:** Always test in staging before deploying to production!
