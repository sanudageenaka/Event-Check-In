
# Event Check-In System (Polished UI)

- Frontend: React (Vite + TS), **styled to match the provided screenshot** (sidebar, header card, donut KPIs, table)
- Backend: NestJS + Prisma (SQLite)
- QR: `react-qr-reader@^2.2.1` (v2 API)

## Run

### API
```
cd server
npm i
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev
```
http://localhost:3000

### Web
```
cd web
npm i
npm run dev
```
http://localhost:5173
