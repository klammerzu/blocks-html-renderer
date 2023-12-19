# Strapi Blocks React Renderer

Render the content of Strapi's Blocks rich text editor as HTML in your frontend.

## Installation

Install the HTML-Blocks renderer and its peer dependencies:

```sh
yarn add blocks-html-renderer
```

```sh
npm install blocks-html-renderer
```

## Basic usage

After fetching your Strapi content, you can use the renderBlock function to render the data from a blocks attribute. Pass the array of blocks coming from your Strapi API to the `content` prop:

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
//<p>A simple paragraph</p>
```
