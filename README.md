# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a515f8be-188e-4e68-a51c-2b1109ebfcf3

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a515f8be-188e-4e68-a51c-2b1109ebfcf3) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a515f8be-188e-4e68-a51c-2b1109ebfcf3) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Stripe Payment Integration

This project uses Stripe Checkout for secure payments.

### Setup

1. **Backend**
   - Create a `.env` file (see `.env.example`) with your Stripe secret key and frontend URL.
   - Run the backend server (`server.js`) with Node.js: `node server.js`.
   - The backend exposes `/create-checkout-session` for the frontend to create Stripe sessions.

2. **Frontend**
   - Add your Stripe publishable key and backend URL to a `.env` file (see `.env.example`).
   - The frontend calls the backend to create a session and redirects users to Stripe Checkout.

### Updating for Real Products
- Replace the mock cart item mapping in `server.js` with your product database lookup.
- Update success/cancel URLs as needed.

### Security
- Never commit real API keys. Use environment variables.
- The backend must keep the Stripe secret key private.

### Test Mode
- The current setup uses Stripe test keys and products. Switch to live keys for production.
