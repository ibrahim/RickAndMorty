import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { gql } from "@apollo/client";
import { ChildDataProps, graphql } from "@apollo/react-hoc";
import List from './list'

//characters(page: 2, filter: { name: "rick" }) {

const CHARACTERS_QUERY = gql`
query {
  characters{
    info {
      next
      prev
      pages
      count
    }
    results {
      name
      image
    }
  }
}
`;

interface Character {
  name: string;
  image: string;
};

interface Info {
	count: number;
	pages: number;
	next: number;
	prev:number;
}
interface Response {
	characters: {
		info: Info;
		results: [Character];
	}
};

interface Variables {
  name?: string;
  page?: string;
};

interface InputProps {
  name?: string;
  page?: string;
};
type ChildProps = ChildDataProps<InputProps, Response, Variables>;


export const withCharacters = graphql<InputProps, Response, Variables, ChildProps>(CHARACTERS_QUERY, {
  options: ({ name, page }) => ({
    variables: { name, page }
  })
});

export default withCharacters(List)

