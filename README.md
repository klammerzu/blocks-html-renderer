# Strapi Blocks React Renderer

Easily render the content of Strapi's new Blocks rich text editor in your React frontend.

## Installation

Install the Blocks renderer and its peer dependencies:

```sh
yarn add blocks-html-renderer
```

```sh
npm install blocks-html-renderer
```

## Basic usage

After fetching your Strapi content, you can use the BlocksRenderer component to render the data from a blocks attribute. Pass the array of blocks coming from your Strapi API to the `content` prop:

```ts
import { renderBlock, type Node } from 'blocks-html-renderer';

// Content should come from your Strapi API
const content: Node[] = [
  {
    type: 'paragraph',
    children: [{ type: 'text', text: 'A simple paragraph' }],
  },
];

renderBlock(content);

```
