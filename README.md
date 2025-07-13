## This is a backend project for hotel management.
It's powered by ExpressJS Typescript, Prisma, and Supabase (with the PostgreSQL database).

### What included ?
- Auth methods for admin/manager and customer: register and login
- Middleware for checking permission of the user signed in
- ADMIN could CRUD rooms, bookings
- MANAGER could RU rooms, bookings
- CUSTOMER could R rooms, bookings

### Detailed:
- Passwords were hashed by Bcrypt (FE hashed by SHA-256 before sending to BE)
- User logged in would receive their JWT
