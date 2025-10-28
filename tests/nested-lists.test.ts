import { expect } from '@jest/globals'

import { Node, renderBlock } from '../src'

type ListBlockNode = Extract<Node, { type: 'list' }>;
type ListBlockChild = ListBlockNode['children'][number];
type ListItemNode = Extract<ListBlockChild, { type: 'list-item' }>;
type InlineChildNode = ListItemNode['children'][number];
type TextInlineNode = Extract<InlineChildNode, { type: 'text' }>;

type NestedListTestCase = {
  name: string;
  block: Node[];
  expectedHTML: string;
};

const textNode = (
  text: string,
  formatting: Partial<Omit<TextInlineNode, 'type' | 'text'>> = {},
) => ({
  type: 'text',
  text,
  ...formatting,
}) satisfies TextInlineNode;

const listItem = (children: InlineChildNode[]) => ({
  type: 'list-item',
  children,
}) satisfies ListItemNode;

const listBlock = (format: ListBlockNode['format'], children: ListBlockChild[]) => ({
  type: 'list',
  format,
  children,
}) satisfies ListBlockNode;

const wrapBlock = (block: ListBlockNode) => ([block]) satisfies Node[];

const cases: NestedListTestCase[] = [
  {
    name: 'Test Case 1: Nested Unordered Lists',
    block: wrapBlock(
      listBlock('unordered', [
        listItem([textNode('Parent Item 1')]),
        listBlock('unordered', [
          listItem([textNode('Nested Item 1.1')]),
          listItem([textNode('Nested Item 1.2')]),
        ]),
        listItem([textNode('Parent Item 2')]),
      ]),
    ),
    expectedHTML: '<ul><li>Parent Item 1<ul><li>Nested Item 1.1</li><li>Nested Item 1.2</li></ul></li><li>Parent Item 2</li></ul>',
  },
  {
    name: 'Test Case 2: Nested Ordered Lists',
    block: wrapBlock(
      listBlock('ordered', [
        listItem([textNode('First Step')]),
        listBlock('ordered', [
          listItem([textNode('Sub-step 1.1')]),
          listItem([textNode('Sub-step 1.2')]),
        ]),
        listItem([textNode('Second Step')]),
      ]),
    ),
    expectedHTML: '<ol><li>First Step<ol><li>Sub-step 1.1</li><li>Sub-step 1.2</li></ol></li><li>Second Step</li></ol>',
  },
  {
    name: 'Test Case 3: Mixed Nesting (Ordered within Unordered)',
    block: wrapBlock(
      listBlock('unordered', [
        listItem([textNode('Bullet Point 1')]),
        listBlock('ordered', [
          listItem([textNode('Numbered Sub-item A')]),
          listItem([textNode('Numbered Sub-item B')]),
        ]),
        listItem([textNode('Bullet Point 2')]),
      ]),
    ),
    expectedHTML: '<ul><li>Bullet Point 1<ol><li>Numbered Sub-item A</li><li>Numbered Sub-item B</li></ol></li><li>Bullet Point 2</li></ul>',
  },
  {
    name: 'Test Case 4: Deep Nesting',
    block: wrapBlock(
      listBlock('unordered', [
        listItem([textNode('Level 1 Item')]),
        listBlock('unordered', [
          listItem([textNode('Level 2 Item')]),
          listBlock('unordered', [
            listItem([textNode('Level 3 Item')]),
          ]),
        ]),
      ]),
    ),
    expectedHTML: '<ul><li>Level 1 Item<ul><li>Level 2 Item<ul><li>Level 3 Item</li></ul></li></ul></li></ul>',
  },
  {
    name: 'Test Case 5: Multiple nested lists in same parent',
    block: wrapBlock(
      listBlock('unordered', [
        listItem([textNode('Item 1')]),
        listBlock('unordered', [
          listItem([textNode('Nested 1.1')]),
        ]),
        listItem([textNode('Item 2')]),
        listBlock('unordered', [
          listItem([textNode('Nested 2.1')]),
        ]),
      ]),
    ),
    expectedHTML: '<ul><li>Item 1<ul><li>Nested 1.1</li></ul></li><li>Item 2<ul><li>Nested 2.1</li></ul></li></ul>',
  },
  {
    name: 'Test Case 6: List with formatted text in nested items',
    block: wrapBlock(
      listBlock('unordered', [
        listItem([
          textNode('Parent with '),
          textNode('bold text', { bold: true }),
        ]),
        listBlock('unordered', [
          listItem([
            textNode('Nested with '),
            textNode('italic', { italic: true }),
            textNode(' text'),
          ]),
        ]),
      ]),
    ),
    expectedHTML: '<ul><li>Parent with <strong>bold text</strong><ul><li>Nested with <em>italic</em> text</li></ul></li></ul>',
  },
];

describe('renderBlock - Nested Lists', () => {
  cases.forEach(({ name, block, expectedHTML }) => {
    it(name, () => {
      const result = renderBlock(block);
      expect(result).toEqual(expectedHTML);
    });
  });
});
