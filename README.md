# GQLHTTPTools

GQLHTTPTools is a very basic tool to modularize GraphQL type definitions and attach them to [express-graphql](https://github.com/graphql/express-graphql) `graphqlHTTP()` `typeDef` property without worrying about separating schemas or nesting them on a messy big string.

## Installation

You can use npm or yarn, like you always do:

### NPM

`npm install gqlhttptools`

### Yarn

`yarn add gqlhttptools`

## How to use

The very first thing after installation is to import `buildSchema()` into your schema file:

```typescript
import { buildSchema } from 'gqlhttptools';
```

Then you can build your schema:

```typescript
const usersSchema = buildSchema(`
    type Query {
        users: [User]
        user(id: String!): User
    }

    type User {
        id: ID
        name: String
        username: String
        password: String
    }
`);
```

After this, you can now import `createSchema()`:

```typescript
import { createSchema } from 'gqlhttptools';
```

Then, when you have all your schemas defined you can attach them to `graphqlHTTP()` properties:

```typescript
graphqlHTTP({
    typeDef: createSchema(usersSchema),
    // ... 
})
```

Or you can pass an array:

```typescript
graphqlHTTP({
    typeDef: createSchema([usersSchema, categoriesSchema, anotherSchema]),
    // ... 
})
```