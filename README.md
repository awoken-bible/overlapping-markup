# Overview

Provides a react component capable of automatically generating the markup required to render text with arbitrary styling applied to ranges of the text.

Thinking in terms of HTML, this module converts (a JSON representation of) non-hierarchical tag soup such as:

```html
<b>Hello <i>World</b> Goodble</i>
````

Into the valid tag set:

```html
<b>Hello <i>World</i></b> <i>Goodbye</i>
```

However, rather than dealing with raw HTML, we instead deal with React components, and take as input:

- A string representing the text that should be styled
- A list of styling blocks, which specify both the start and end index of the text to be wrapped, and references to React components used to wrap the text content

The above example would be achieved with the following usage:

```javascript

import OverlappingMarkup from 'overlapping-markup';

const StyleBold = {
  content: (props) => <b>{ props.children }</b>,
};

const StyleItalic = {
  content: (props) => <i>{ props.children }</i>,
};

const TEXT    = 'Hello World Goodbye';

const STYLING = [
  { min: 0, max: 11, style : StyleBold   },
  { min: 6, max: 18, style : StyleItalic },
];

function App(){
  return (
    <OverlappingMarkup text={TEXT} styling={STYLING}/>
  );
}
```

# A Note on Project Structure

This repo is a hybrid of a react-app and a webpack project:
- The react app is a demo application that can be launched by running ~npm run start~
- The webpack project creates a single file =dist/OverlappingMarkup.js= which is distributed in the published NPM package, and is designed to be included by other react projects

# Advanced Features

## Props

The style's `content` component is passed a `props` object with a field `style_data`, which refers to an extra `data` field attached to the style block itself. This allows parameterised components to be rendered, for example the following which highlights text with an arbitrary color:

For example:

```javascript
const StyleHighlight = {
  content: (props) => <span style={{backgroundColor: props.style_data.color}}> { props.children } </span>,
};

const STYLING = [
  // ... etc ...
  { min: 10, max: 20, style: StyleHighlight, data: { color: 'red' } },
];
```

## Before and After Elements

In addition to the `content` render (as seen above), styles may also contain a `before` and `after` render. Conceptually these are equivalent to the CSS `:before` and `:after` psuedo-selectors, however they are provided since this component can deal with overlapping hierarchies by splitting up a region into multiple separate `content` blocks - using CSS would therefore cause each of these to have an associated `before` and `after` element. Using the style's `before` and `after` renderer guarantees only a single extra component is inserted.

For example, we could extend the above example by replacing `StyleItalic` with the following:

```javascript
const StyleItalic = {
  before  : (props) => '(',
  content : (props) => <i>{ props.children }</i>,
  after   : (props) => ')',
};
```

This would cause the following effective tag structure to be rendered:

```html
<b>Hello (<i>World</i></b> <i>Goodbye</i>)</b>
```

As can be seen, only a single instance of the `before` and `after` elements are rendered - even though two instances of the `content` element are rendered since it is split by the overlapping `<b>` block.

The `before` and `after` components are passed the same `props` as `content`.

## Using State

While the `before`, `after` and `content` components are real React components, due to the fact an arbitrary number of instances of `content` may be rendered, stateful components (for example, using the `useState` hook) will behave strangely.

`OverlappingMarkup` provides a mechanism to share state between all parts of a style region, including communicating between the `before`, `content` and `after` components:

```javascript
const StyleHighlightable = {
  content: (props) => {
    if(props.state.active){
	  return <b>{props.children}</b>;
	} else {
	  return <span>{props.children}</span>;
	}
  },
  after: (props) => {
    return (<button onClick={e => props.setState({ active: true })}>Activate</button>),
  },
};
```

Note that when using such stateful styles, you must specify an id for the style block, for example:

```javascript
{
  min   : 10,
  max   : 20,
  style : StyleHighlightable,
  id    : 'block-a'
}
```

If the id changes, the then the state passed through via `props` will be reset. Note also that multiple style blocks may share the same id, which will cause them to share the same state object.

By default, props.state will intially be the empty object. A custom initial state may be provided on the style region:

```javascript
{
  min           : 10,
  max           : 20,
  style         : StyleHighlightable,
  id            : 'block-a',
  initial_state : { active: false },
}
```
