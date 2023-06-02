# Overview

> :warning: **THIS LIBRARY IS A PRERELEASE** - while version number is < 1.0.0 breaking API changes may be made without warning

This package Provides a React component capable of automatically generating the markup required to render text with arbitrary styling applied to potentially overlapping ranges.

Conceptually, this package transforms (a JSON representation of) non-hierarchical tag soup such as:

```html
<b>Hello <i>World</b> Goodbye</i>
```

Into the following valid tag set:

```html
<b>Hello <i>World</i></b> <i>Goodbye</i>
```

Although each element is in fact a React component.

Further information about the problem domain of "Overlapping (aka Concurrent) Markup" can be found [on wikipedia](https://en.wikipedia.org/wiki/Overlapping_markup).

# Basic Usage

The `<OverlappingMarkup>` component requires at minimum:

- A string representing the text that should be styled
- A list of styling blocks, which specify both the start and end index of the text to be wrapped, and references to React components used to wrap the text content

The above example HTML could be rendered with the following code:

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

# Project Structure

This project is a vite.js react app, containing both a dev server for testing, and a library build
for publishing for use in other projects
- index.html and src/index.jsx define the dev serer entry points
- All vite config is in the single vite.config.js

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
