import React from 'react';
import client from '../client';
import { gql } from '@apollo/client';
import Navbar from '../components/Navbar';
import MyAccountPage from '../components/myAccount';
import SellYourPropertyPage from 'components/SellYourPropertyPage';
import Contact from '../components/Contact';
import { Columns } from 'components/Columns';
import Image from 'next/image';
import Button from 'components/Button';

// Function to dynamically assign Tailwind classes based on heading level
const getHeadingClass = (level) => {
  switch (level) {
    case 1:
      return 'text-8xl font-heading';
    case 2:
      return 'text-5xl font-heading';
    case 3:
      return 'text-4xl font-heading';
    case 4:
      return 'text-3xl font-heading';
    case 5:
      return 'text-2xl font-heading';
    case 6:
      return 'text-lg font-heading';
    default:
      return 'text-base font-heading';
  }
};

// Function to recursively render content with inline elements like <strong> and <br>
const renderContent = (content) => {
  return <span dangerouslySetInnerHTML={{ __html: content }} />;
};

// Function to render a block based on its type
const renderBlock = (block) => {
  if (!block || !block.attributes) {
    console.error("Block or attributes are undefined:", block);
    return null;
  }

  const { attributes } = block;

  switch (block.name) {
    case "core/paragraph":
      return (
        <p
          key={block.id}
          className={`font-body mb-3 text-left ${attributes.align ? `text-${attributes.align}` : ''}`}
        >
          {renderContent(attributes.content)}
        </p>
      );
    case "core/heading":
      const HeadingTag = `h${attributes.level}`;
      const headingClass = getHeadingClass(attributes.level);
      return (
        <HeadingTag
          key={block.id}
          className={`${headingClass} mb-3 text-left ${attributes.align ? `text-${attributes.align}` : ''}`}
        >
          {renderContent(attributes.content)}
        </HeadingTag>
      );
    case "core/cover":
      return (
        <div key={block.id} className="relative w-full">
          <Image src={attributes.url} alt={attributes.alt || ''} className="w-full h-auto" />
          {block.innerBlocks && block.innerBlocks.map(renderBlock)}
        </div>
      );
    case "core/columns":
      return <Columns key={block.id} />;
    case "core/image":
      return (
        <Image
          key={block.id}
          src={block.attributes.url}
          alt={block.attributes.alt}
          className={block.attributes.className || ''}
          width={block.attributes.width}
          height={block.attributes.height}
        />
      );
    case "core/buttons":
      return (
        <div key={block.id} className="flex flex-wrap gap-4">
          {block.innerBlocks && block.innerBlocks.map((buttonBlock) => {
            if (buttonBlock.name === 'core/button') {
              const buttonAttributes = buttonBlock.attributes || {};
              return (
                <Button
                  key={buttonBlock.id}
                  text={buttonAttributes.content}
                  textColor={buttonAttributes.textColor}
                  bgColor={buttonAttributes.bgColor}
                />
              );
            }
            return null;
          })}
        </div>
      );
    default:
      return null;
  }
};

const GuidePage = ({ blocks, slug }) => {
  const showButton = ['guide-to-buying', 'guide-to-selling', 'selling', 'buying'].includes(slug);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto p-3.5 max-w-screen-lg flex-grow">
        {blocks && blocks.map((block, index) => renderBlock(block))}
      </div>
  </div>
  );
};

export default function Page({ blocks, slug, username }) {
  if (slug === 'my-account') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <MyAccountPage username={username} />
      </div>
    );
  }
  if (slug === 'sell-your-property') {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <SellYourPropertyPage />
      </div>
    );
  }
  if (slug === 'contact-us') {
    // Handle the case where Contact component does not exist
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto p-3.5 max-w-screen-lg flex-grow">
          <p>Contact page is under construction.</p>
        </div>
      </div>
    );
  }

  return <GuidePage blocks={blocks} slug={slug} />;
}


export async function getStaticProps({ params }) {
  const uri = `/${params.slug.join('/')}/`;
  try {
    const { data } = await client.query({
      query: gql`
        query PageByUri($uri: String!) {
          nodeByUri(uri: $uri) {
            ... on Page {
              id
              blocks(postTemplate: false)
              slug
            }
          }
        }
      `,
      variables: { uri },
    });

    if (!data || !data.nodeByUri) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        blocks: data.nodeByUri.blocks,
        slug: data.nodeByUri.slug,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    const { data } = await client.query({
      query: gql`
        query AllPagesQuery {
          pages {
            nodes {
              uri
            }
          }
        }
      `
    });

    const paths = data.pages.nodes
      .filter(page => page.uri !== '/')
      .map(page => ({
        params: {
          slug: page.uri.substring(1, page.uri.length - 1).split('/')
        },
      }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}
