# KS Chicken — Frontend

Frontend application for KS Chicken, a responsive e-commerce-style web application built using React.  
The application provides a modern ordering interface with integrated Stripe checkout and automated cloud deployment.

---

## Features

- Built using **React.js**
- Fully **responsive design** supporting desktop and mobile devices
- **Stripe Checkout integration** for secure payment processing
- Dynamic cart and order flow
- Production-style **CI/CD pipeline**
- Automated deployment to AWS using GitHub Actions and CodeDeploy

---

## Tech Stack

**Frontend**
- React.js
- HTML5
- CSS3

**Payments**
- Stripe Checkout API

**CI/CD & Deployment**
- GitHub Actions
- AWS CodeDeploy
- AWS EC2
- AWS S3

---

## Deployment Workflow

The build and deployment process is fully automated:

1. Code is pushed to GitHub
2. GitHub Actions runs the build process
3. Build artifacts are packaged and uploaded to S3
4. AWS CodeDeploy deploys the application to EC2 instances
5. Application updates automatically with zero manual steps
