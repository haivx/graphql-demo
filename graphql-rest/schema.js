import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt
} from 'graphql';
import fetch from 'node-fetch';
 
const newsource = new GraphQLObjectType({
  name: "newsource",
  fields: {
    "lastUpdate":{type: GraphQLString},
    "code":{type: GraphQLString},
    "deliverySolutionCode":{type:GraphQLString},
    "deliverySolutionName":{type: GraphQLString},
    "clientCode":{type:GraphQLString},
    "clientName": {type:GraphQLString}
  }
})

const site = new GraphQLObjectType({
  name: 'site',
  fields: {
    "_index": {type: new GraphQLNonNull(GraphQLString)},
    "_type": {type: new GraphQLNonNull(GraphQLString)},
    "_id": {type: new GraphQLNonNull(GraphQLString)},
    "_score":{type: new GraphQLNonNull(GraphQLInt)},
    "_source": {type: new GraphQLNonNull(newsource)}
  }
})

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    site: {
      type: new GraphQLList(site),
      resolve: (root) => fetch(`http://10.16.38.95:9200/pck-settings/site/_search`)
        .then( response => (
          response.json().then((data) => {
            console.log('dataatat', data.hits.hits);
            return data.hits.hits;
          })
        ))
        .catch((err) => {
          console.log('errerrerr', err)
        })
    }
  }
})

export default new GraphQLSchema({
  query: QueryType
})