
/**
 * CONNECT GRAPHQL WITH REST SERVICES
 */
import express from 'express';
import graphQLHTTP from 'express-graphql';
import schema from './schema';
const app = express();

app.use(graphQLHTTP({
  schema,
  graphiql: true
}))

const PORT = 8080;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
});