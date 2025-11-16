# E-Rose Client

Live demo: REPLACE_WITH_YOUR_LIVE_LINK

Short description

- E-Rose is a responsive e-commerce React + TypeScript frontend for a clothing/accessories store. This repository contains the client application (product catalog, single-product pages, cart, checkout flow, and admin dashboard pages) built with Vite and modern React tools.


**Tech Stack**

- **Framework:** React (TypeScript)
- **Bundler / Dev Server:** Vite
- **Routing:** React Router
- **Data fetching / mutations:** TanStack Query (React Query)
- **HTTP client:** Axios (central instance at `src/components/Axios/useAxiosPub.tsx`)
- **UI components / styles:** Tailwind CSS (utility classes) + custom UI components
- **Notifications & modals:** SweetAlert2, react-toastify
- **Date/time:** moment
- **Icons:** lucide-react
- **State management:** React context for auth (AuthProvider)
- **Other:** ESBuild (dev), GitHub for source control


**Features**

- Product listing and single-product detail pages
- Add-to-cart, view cart and order summary
- Order modal / checkout with: Cash On Delivery and Pay Now flows
- Payment initiation flow: client calls backend to create payment session and redirects to payment provider (if backend returns a URL)
- Admin dashboard skeleton (orders, add item, manage products)
- Promo / discount code support (client-side application)
- Toast and modal UX for confirmations and errors


**Installation & Local Setup**

Requirements:
- Node.js 16+ (recommended)
- npm (or pnpm/yarn)
- Backend API running (default baseURL in the repo is `http://localhost:3000`).

Steps (PowerShell):

```powershell
# 1. Install dependencies
npm install

# 2. Start dev server (Vite)
npm run dev

# 3. Open the app in your browser (Vite prints the URL, usually http://localhost:5173)
```

If you need to build for production:

```powershell
npm run build
# Serve the production build via a static server or deploy the `dist/` output
```

Environment variables
- The client uses `src/components/Axios/useAxiosPub.tsx` which sets a `baseURL` to your API. Replace that file or change to use an environment variable (e.g. `VITE_API_URL`) in production.


**Project Folder Structure (important files)**

- `src/`
  - `main.tsx`  app entry
  - `App.tsx`  root app (routes)
  - `assets/`  images and static assets
  - `components/`  main UI components and pages
    - `AllProduct/SingleDetail/SingleDetails.tsx`  single product page & order modal
    - `DashBord/Orders/Orders.tsx`  checkout/order page with modal and payment flows
    - `Axios/useAxiosPub.tsx`  central axios instance (baseURL)
    - `loginRegistration_work/`  auth + firebase initialization
    - `ui/`  small reusable UI components (button, input, select, etc.)
  - `hooks/`  custom hooks
  - `lib/`  utility helpers
- `public/`  static files
- `README.md`  (this file)

This is a condensed view  inspect the `src/components` folder for full structure.


**API Endpoints (client usage)**

The client calls these backend endpoints. Adjust the URLs if your backend uses different paths.

- `POST /order`
  - Purpose: Create a new order (used for Cash On Delivery and fallback flows).
  - Payload: a JSON object containing order fields: `userNumber`, `name`, `email`, `district`, `division`, `address`, `productDescription`, `order` (array of product objects), `totalTaka`, `orderTime`, `orderStatus`, etc.

- `POST /initialpayment`
  - Purpose: Create/initiate a payment session with a payment provider. The backend should create the payment session and return a redirect URL.
  - Expected response: `{ paymentUrl: "https://gateway.example/checkout?session=..." }` or `{ redirectUrl: "..." }`.
  - Client-side behavior: if `paymentUrl` is returned, the client redirects via `window.location.href = paymentUrl`.

- `GET /allData/:id`
  - Purpose: Fetch single product data used on product detail pages.

Notes for backend implementation
- Make sure your backend accepts JSON bodies (`app.use(express.json())` in Express) and CORS is configured for your frontend origin during development.
- Recommended: For Pay Now flow, create the order server-side with status `Pending` and generate a payment session referencing that orderId. After payment success (webhook or gateway callback), update the order status to `Paid`.


**How the checkout flow works (client-side)**

1. User fills the order form (single-product modal or multi-item order page).
2. The client builds `fullOrderData` and opens a SweetAlert choice (Cash On Delivery or Pay Now).
3. Cash On Delivery: client POSTs `/order` with the order payload. On success the UI shows a confirmation and clears the cart.
4. Pay Now: client POSTs `/initialpayment` with the order payload. If backend returns a `paymentUrl`, the client uses `window.location.href` to navigate to the external payment page. After payment, backend/webhook should update the order status.


**Testing & Debugging**

- Use browser DevTools > Network to verify request payloads and responses for `/order` and `/initialpayment`.
- Ensure the backend logs the `req.body` to verify the payload shape.
- If `req.body` is undefined on server, enable JSON body parsing (`express.json()`) and check CORS settings.


**Author / Contact**

- GitHub: https://github.com/Sakib3602
- Repo: https://github.com/Sakib3602/e-rose-client

If you want, I can:
- Add a `/payment-callback` route skeleton and client logic to handle gateway redirects.
- Wire loading states and disable modal buttons while requests are in-flight.
- Replace the `REPLACE_WITH_YOUR_LIVE_LINK` placeholder with your real deployment URL.

---

Thank you  let me know which improvements you want next and I will implement them (loading states, callback route, or backend helper examples).
