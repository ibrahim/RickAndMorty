import { ApolloClient, InMemoryCache, Reference, ApolloLink, HttpLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error] Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error **]: ${networkError}`);
});

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          keyArgs: false,
					merge(existing={}, incoming, { args }) {
						let results : Reference[] = [] 
						const page = args && args["page"]
						const firstPage = page === 1
						const newResults = incoming && incoming.results
						const existingResults = existing && existing.results
						if(firstPage){
							return incoming
						}
            if (existingResults) {
              results = results.concat(existing.results);
						}
            if (newResults) {
              results = results.concat(incoming.results);
						}
            return {
              ...incoming,
              results,
            };
          }
        }
      }
    }
  }
});
const uri = 'https://rickandmortyapi.com/graphql'
export const client = new ApolloClient({
    uri,
    cache,
		link: ApolloLink.from([errorLink, new HttpLink({uri})]),
});
