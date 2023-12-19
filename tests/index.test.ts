import { expect } from '@jest/globals'

import { Node, renderBlock } from '../src'

const block: Node[] = [
  {
    "type": "heading",
    "children": [
      {
        "type": "text",
        "text": "Lorem"
      }
    ],
    "level": 1
  },
  {
    "type": "heading",
    "children": [
      {
        "type": "text",
        "text": "Ipsum"
      }
    ],
    "level": 4
  },
  {
    "type": "paragraph",
    "children": [
      {
        "type": "text",
        "text": ""
      }
    ]
  },
  {
    "type": "paragraph",
    "children": [
      {
        "type": "text",
        "text": "Vel purus scelerisque",
        "bold": true
      },
      {
        "type": "text",
        "text": " sed orci orci "
      },
      {
        "type": "text",
        "text": "pellentesque",
        "italic": true
      },
      {
        "type": "text",
        "text": " varius "
      },
      {
        "type": "text",
        "text": "condimentum",
        "underline": true
      },
      {
        "type": "text",
        "text": " "
      },
      {
        "type": "text",
        "text": "scelerisque mi ex ac commodo",
        "strikethrough": true
      },
      {
        "type": "text",
        "text": " orci tortor "
      },
      {
        "type": "link",
        "url": "https://example.com",
        "children": [
          {
            "type": "text",
            "text": "consectetur tristique eu molestie ac purus varius urna euismod."
          }
        ]
      },
      {
        "text": "",
        "type": "text"
      }
    ]
  },
  {
    "type": "paragraph",
    "children": [
      {
        "type": "text",
        "text": ""
      }
    ]
  },
  {
    "type": "paragraph",
    "children": [
      {
        "type": "text",
        "text": "Tempus sollicitudin sollicitudin ipsum varius scelerisque pellentesque ac ac varius eu lacus sed tristique proin proin nunc maecenas sem a pellentesque pellentesque rutrum vivamus scelerisque."
      }
    ]
  },
  {
    "type": "paragraph",
    "children": [
      {
        "type": "text",
        "text": ""
      }
    ]
  },
  {
    "type": "image",
    "image": {
      "name": "Favicon.png",
      "alternativeText": "Favicon.png",
      "caption": null,
      "width": 750,
      "height": 750,
      "formats": {
        "thumbnail": {
          "name": "thumbnail_Favicon.png",
          "hash": "thumbnail_Favicon_adcc1c0f6c",
          "ext": ".png",
          "mime": "image/png",
          "path": null,
          "width": 156,
          "height": 156,
          "size": 1.36,
          "url": "/uploads/thumbnail_Favicon_adcc1c0f6c.png"
        },
        "xsmall": {
          "name": "xsmall_Favicon.png",
          "hash": "xsmall_Favicon_adcc1c0f6c",
          "ext": ".png",
          "mime": "image/png",
          "path": null,
          "width": 100,
          "height": 100,
          "size": 0.85,
          "url": "/uploads/xsmall_Favicon_adcc1c0f6c.png"
        },
        "small": {
          "name": "small_Favicon.png",
          "hash": "small_Favicon_adcc1c0f6c",
          "ext": ".png",
          "mime": "image/png",
          "path": null,
          "width": 600,
          "height": 600,
          "size": 8.35,
          "url": "/uploads/small_Favicon_adcc1c0f6c.png"
        }
      },
      "hash": "Favicon_adcc1c0f6c",
      "ext": ".png",
      "mime": "image/png",
      "size": 4.88,
      "url": "http://localhost:1337/uploads/Favicon_adcc1c0f6c.png",
      "previewUrl": null,
      "provider": "local",
      "provider_metadata": null,
      "createdAt": "2023-12-19T10:39:43.687Z",
      "updatedAt": "2023-12-19T10:39:52.930Z"
    },
    "children": [
      {
        "type": "text",
        "text": ""
      }
    ]
  },
  {
    "type": "paragraph",
    "children": [
      {
        "type": "text",
        "text": ""
      }
    ]
  },
  {
    "type": "quote",
    "children": [
      {
        "type": "text",
        "text": "Lorem ipsum sit dolor"
      }
    ]
  },
  {
    "type": "code",
    "children": [
      {
        "type": "text",
        "text": "Lorem"
      }
    ]
  },
  {
    "type": "paragraph",
    "children": [
      {
        "type": "text",
        "text": ""
      }
    ]
  },
  {
    "type": "paragraph",
    "children": [
      {
        "type": "text",
        "text": "Lorem ipsum",
        "code": true
      }
    ]
  },
  {
    "type": "list",
    "format": "unordered",
    "children": [
      {
        "type": "list-item",
        "children": [
          {
            "type": "text",
            "text": "Lorem"
          }
        ]
      },
      {
        "type": "list-item",
        "children": [
          {
            "type": "text",
            "text": "Ipsum"
          }
        ]
      },
      {
        "type": "list-item",
        "children": [
          {
            "type": "text",
            "text": "Sit"
          }
        ]
      }
    ]
  },
  {
    "type": "list",
    "format": "ordered",
    "children": [
      {
        "type": "list-item",
        "children": [
          {
            "type": "text",
            "text": "Lorem"
          }
        ]
      },
      {
        "type": "list-item",
        "children": [
          {
            "type": "text",
            "text": "Ipsum"
          }
        ]
      },
      {
        "type": "list-item",
        "children": [
          {
            "type": "text",
            "text": "Sit"
          }
        ]
      }
    ]
  }
]

const expectedHTML = `<h1>Lorem</h1><h4>Ipsum</h4><p></p><p><strong>Vel purus scelerisque</strong> sed orci orci <em>pellentesque</em> varius <u>condimentum</u> <s>scelerisque mi ex ac commodo</s> orci tortor <a href="https://example.com">consectetur tristique eu molestie ac purus varius urna euismod.</a></p><p></p><p>Tempus sollicitudin sollicitudin ipsum varius scelerisque pellentesque ac ac varius eu lacus sed tristique proin proin nunc maecenas sem a pellentesque pellentesque rutrum vivamus scelerisque.</p><p></p><img src="http://localhost:1337/uploads/Favicon_adcc1c0f6c.png" alt="Favicon.png" /><p></p><blockquote>Lorem ipsum sit dolor</blockquote><pre><code>Lorem</code></pre><p></p><p><code>Lorem ipsum</code></p><ul><li>Lorem</li><li>Ipsum</li><li>Sit</li></ul><ol><li>Lorem</li><li>Ipsum</li><li>Sit</li></ol><ul><li>Lorem</li><li>Ipsum</li><li>Sit</li></ul>`

describe('renderBlock', () => {
  it('should correctly render block to HTML', () => {
    const result = renderBlock(block);

    expect(result).toEqual(expectedHTML);
  });
});