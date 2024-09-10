import React from 'react';
import client from 'client';
import { Cover } from 'components/Cover';
import { Heading } from 'components/heading/Heading';
import { Paragraph } from 'components/Paragraph';
import { ApolloProvider } from '@apollo/client';
import { Columns } from 'components/Columns';
import { Column } from 'components/Column';
import Button from 'components/Button';
import Image from 'next/image';
import  HomepageSection3  from 'components/HomepageSection3';

export const renderBlock = (block, isHomepage) => {
    if (!block || !block.name) {
        console.error("Block or attributes are undefined:", block);
        return null;
    }

    console.log(block);

    const { attributes, innerBlocks } = block;

    switch (block.name) {
        case "core/paragraph":
            if (!attributes || typeof attributes.content !== 'string') {
                console.error("Expected string content for paragraph, but got:", attributes?.content);
                return null;
            }
            return (
                <Paragraph
                    key={block.id}
                    content={attributes.content}
                    textAlign={attributes.align}
                    textColor={attributes.textColor || 'text-black'}
                />
            );
        case "core/heading":
            if (!attributes || typeof attributes.content !== 'string') {
                console.error("Expected string content for heading, but got:", attributes?.content);
                return null;
            }
            return (
                <Heading
                    key={block.id}
                    content={attributes.content}
                    level={attributes.level}
                    textAlign={attributes.textAlign}
                    textColor={attributes.textColor || 'text-black'}
                />
            );
        case "core/cover":
            return (
                <Cover key={block.id} background={attributes?.url}>
                    {innerBlocks && innerBlocks.map((innerBlock, index) => renderBlock(innerBlock, isHomepage))}
                </Cover>
            );
        case "core/columns":
            // Apply bg-slate-800 only on the homepage
            const bgClass = isHomepage ? "bg-slate-800" : "";
            return (
                <div className={bgClass}>
                    <Columns {...attributes}>
                        {innerBlocks.map(innerBlock => renderBlock(innerBlock, isHomepage))}
                    </Columns>
                </div>
            );
        case "core/column":
            return (
                <Column key={block.id} width={attributes?.width}>
                    {innerBlocks && innerBlocks.map((innerBlock, index) => renderBlock(innerBlock, isHomepage))}
                </Column>
            );
        case "core/image":
            return (
                <Image
                    key={block.id}
                    src={block.attributes.url}
                    alt={block.attributes.alt || 'Image'}
                    width={parseInt(block.attributes.width, 10)} // Ensure width is an integer
                    height={parseInt(block.attributes.height, 10)} // Ensure height is an integer
                    layout="intrinsic" // Or "responsive" based on your layout needs
                />
            );
        case "core/buttons":
            return (
                <div key={block.id} className="flex flex-wrap gap-4">
                    {innerBlocks && innerBlocks.map((buttonBlock, index) => {
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
            console.error("Unknown block type:", block.name);
            return null;
    }
};

export const BlockRenderer = ({ blocks, isHomepage }) => {
    return (
        <div>
            {blocks.map((block, index) => (
                <React.Fragment key={index}>
                    {renderBlock(block, isHomepage)}
                </React.Fragment>
            ))}
            <HomepageSection3 />
        </div>
    );
};
