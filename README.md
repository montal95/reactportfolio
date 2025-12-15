# React Portfolio

[![Netlify Status](https://api.netlify.com/api/v1/badges/a7fe4db5-e077-4f6c-ac6d-eb833ee81b12/deploy-status)](https://app.netlify.com/sites/gallant-hypatia-c82d23/deploys)

A personal portfolio website built with React, showcasing projects, skills, and experience.

**Live Site:** https://gallant-hypatia-c82d23.netlify.app

## Deployment

### Hosting on Netlify

This site is hosted on **Netlify** with automatic continuous deployment from GitHub.

**Current Netlify Site:** gallant-hypatia-c82d23.netlify.app
**Site ID:** a7fe4db5-e077-4f6c-ac6d-eb833ee81b12

Netlify automatically detects and deploys updates whenever changes are pushed to the `main` branch on GitHub.

#### Deployment Status Badge

The badge at the top of this README shows the live status of the Netlify deployment:

- **✓ Success** - Latest deploy succeeded
- **⚠ Building** - Site is currently being deployed
- **✗ Failed** - Latest deploy failed

#### How Netlify Deployment Works

Netlify is connected to the `montal95/reactportfolio` GitHub repository with the following configuration:

- **GitHub Integration:** Direct connection to the repository
- **Automatic Deployment:** Triggered on every push to the `main` branch
- **Build Command:** `npm run build`
- **Publish Directory:** `build/`
- **Preview Deploys:** Automatically generated for pull requests

The deployment is fully automated - push to GitHub, and Netlify handles the rest.

#### Deployment Procedure

1. Make your changes on a feature branch
2. Test locally using `npm start`
3. Push changes to the repository
4. Create a pull request and merge to the `main` branch
5. **Netlify automatically triggers a redeployment** when changes are pushed to the `main` branch
6. Netlify runs `npm run build` to create the production build
7. The site will be live within a few minutes after the build completes

No manual deployment steps are required - Netlify handles everything automatically when the main branch is updated.

#### Manual Deploy

You can also trigger manual deploys via the Netlify Dashboard:
1. Go to the **Deploys** tab
2. Click "Trigger deploy" → "Deploy site"

Or use the Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### DNS Configuration (Squarespace)

The DNS for this site is managed through **Squarespace Domains** (formerly Google Domains).

> **Note:** Google Domains was acquired by Squarespace in 2023. Existing domains were migrated to Squarespace management.

#### Setting up Custom Domain on Netlify

1. **Add custom domain in Netlify**
   - Go to **Site Settings > Domain management**
   - Click "Add custom domain"
   - Enter your domain

2. **Get Netlify DNS configuration**
   - Netlify provides DNS records to configure
   - Note the A Record IP and CNAME target

3. **Configure DNS in Squarespace**
   - Log into [Squarespace Domains](https://domains.squarespace.com)
   - Select your domain
   - Navigate to **DNS Settings**
   - Add the records provided by Netlify:
     - **A Record**: `@` → Netlify's IP
     - **CNAME Record**: `www` → `gallant-hypatia-c82d23.netlify.app`

4. **Wait for DNS propagation**
   - DNS changes can take 24-48 hours to propagate globally

5. **Enable HTTPS in Netlify**
   - Go to **Site Settings > Domain management > HTTPS**
   - Netlify automatically provisions a free SSL certificate via Let's Encrypt
   - Enable "Force HTTPS" to redirect all HTTP traffic to HTTPS

#### Squarespace Domain Management

- **Access your domains:** https://domains.squarespace.com
- **DNS Records:** Managed under DNS Settings for each domain
- **Nameservers:** Can point to Netlify's nameservers for easier management (optional)
- **Auto-renewal:** Ensure domain auto-renewal is enabled to prevent expiration

## Development

### Prerequisites
- Node.js (v12 or higher recommended)
- npm

### Installation
```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
