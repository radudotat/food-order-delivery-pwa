# Food Order & Delivery with Realtime Status Updates

**Tags:** node.js, graphql, design, typescript, pwa, offline-first, next.js, postgresql, push-notifications, background-sync, tailwindcss

![Discover vulnerabilities](https://github.com/radudotat/food-order-delivery-pwa/actions/workflows/codeql-analysis.yml/badge.svg) ![Security issues ](https://github.com/radudotat/food-order-delivery-pwa/actions/workflows/yarn-audit-action.yaml/badge.svg) ![Puppeteer tests](https://github.com/radudotat/food-order-delivery-pwa/actions/workflows/test-puppeteer.yml/badge.svg)
![Jest tests](https://github.com/radudotat/food-order-delivery-pwa/actions/workflows/test-jest.yml/badge.svg) ![Lighthouse Scores](https://github.com/radudotat/food-order-delivery-pwa/actions/workflows/lighthouse.yml/badge.svg)

## The application is automated tested & deployed using CI/CD on:

HEROKU: https://geofood-delivery.herokuapp.com/

VERCEL: https://geofood-delivery.vercel.app/

NETLIFY: https://geofood-delivery.netlify.app/

![Alt text](public/screenshot.png?raw=true 'Application Screenshot with Lighthouse fireworks')

## Description

**Design and develop a Food Order & Delivery platform using Next.js, with the following features:**

1. Users can register, add phone & address for delivery
2. Restaurants can register, add logo, cover photo, phone & address and can add/manage products for listing.
3. Couriers can register, add phone & available time frames for delivery.
4. Logged-in Users can add products to cart and place orders.
5. Logged-in Couriers can bind for deliveries based on Restaurant & Customer location/address.
6. Logged in Employees can change order status.
7. The web application can be installed for offline use or giving the feeling of native application.
8. Stretch goal: Realtime Push notifications for order & delivery status updates.
9. Stretch goal: Deployment as Docker containers.
10. Stretch goal: Users can rate Restaurant & Courier

## The application will be built using the following technologies:

- Next.js
- Emotion
- Responsive Design
- PostgreSQL with Postgres.js
- GraphQL
- Progressive Web App offline first
- WebPush Notifications & Firebase Cloud Messaging
