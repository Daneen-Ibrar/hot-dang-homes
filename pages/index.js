import { gql } from "@apollo/client";
import client from '../client'; // Ensure this path is correct
import { ApolloProvider } from '@apollo/client';
import { BlockRenderer } from "components/BlockRenderer";
import Navbar from "components/Navbar";

export default function Home({ blocks }) {
  return (
    <ApolloProvider client={client}>
      <div>
      <Navbar/>
        <BlockRenderer blocks={blocks} />
      </div>
    </ApolloProvider>
  );
}

export async function getStaticProps() {
  try {
    const { data } = await client.query({
      query: gql`
        query HomePageQuery {
          nodeByUri(uri: "/" ) {
            ... on Page {
              id
              blocks(postTemplate: false)
            }
          }
        }
      `
    });

    if (!data || !data.nodeByUri) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blocks: data.nodeByUri.blocks,
      },
      revalidate: 1, // In seconds, adjust accordingly for ISR (Incremental Static Regeneration)
    };
  } catch (error) {
    console.error("Error fetching home page content:", error);
    return {
      notFound: true,
    };
  }
}
 