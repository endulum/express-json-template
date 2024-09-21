# JSON Server Template
- **Lang:** TypeScript + Express.js Framework
- **Database:** Postgresql + Prisma ORM
- **Protection method:** JSON Web Token

## Rationale
**Why TypeScript?**
TypeScript alone has several general benefits to the codebase.
- Peace of mind and ease of testing with type safety
- Usage of module importing
- IntelliSense provided by the IDE

**Why Express.js?**
Express is lightweight and flexible. Although more, newer options exist, Express's age lends to its stability, extensive documentation, and ease of researching issues and tutorials.

**Why Postgresql?**
It was just the first SQL database I'd been exposed to. It meets my needs, so I don't have a lot of incentive to look at other SQL databases. As to why SQL alone should be used over non-relational databases such as MongoDB, SQL's age lends to stability, documentation, and robust research. Plus, at personal project size, the difference in development and performance between SQL and NoSQL is somewhat negligible.

**Why Prisma?**
Likewise, Prisma is the first ORM I'd been exposed to. As to why an ORM should be used in general, ORMs can define database schemas, standardize migrations, and greatly reduce written raw SQL.

## Todo
- ~~Remove anything intrinsic to an HTML server - templating, flashes, sessions - and its required middleware~~
- ~~Install and play with REST Client extension~~
- Have all endpoints return `res.json` instead of `res.render`
### app.ts Entrypoint
- Add middleware that deserializes a user into `req.user` using JWT
### authRouter
- `/login` and `/signup` should be POST only
### mainRouter
- `GET /` should return a 200 and current user's account info `{ username, role }` if logged in and 401 otherwise (extract this into own middleware?)
- `/account` should be POST only
- New route `GET /user/:userId` that returns given user's account info `{ username, role, isYou }` and 404 if user doesn't exist
### Catchall and error handling
- ~~Allow all other routes and endpoints to return a `404`~~
- ~~Error handler returns given status code or a generic `500`, no description for now~~
### Other consideration
- Add a linter
- Add a testing suite