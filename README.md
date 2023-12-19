# Strapi Blocks React Renderer

Easily render the content of Strapi's new Blocks rich text editor in your React frontend.

## Installation

Install the Blocks renderer and its peer dependencies:

```sh
yarn add @klammerzu/blocks-html-renderer react react-dom
```

```sh
npm install @klammerzu/blocks-html-renderer react react-dom
```

## Basic usage

After fetching your Strapi content, you can use the BlocksRenderer component to render the data from a blocks attribute. Pass the array of blocks coming from your Strapi API to the `content` prop:

```jsx
import { renderBlock } from '@klammerzu/blocks-html-renderer';

// Content should come from your Strapi API
const content = [
  {
    type: 'paragraph',
    children: [{ type: 'text', text: 'A simple paragraph' }],
  },
];

renderBlock(content);

```
