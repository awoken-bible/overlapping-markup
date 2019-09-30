import React from 'react';
import { css, StyleSheet } from 'aphrodite';

import StylizedText from './components/StylizedText';

const styles = StyleSheet.create({
  red: {
    color: 'red',
  },
  under: {
    textDecoration: 'underline',
  },
  bold: {
    fontWeight: 900,
  },
  paragraph: {
    display: 'block',
  },
});

let text = 'Nulla ac tortor magna. In aliquet tellus in elit egestas, a vulputate enim ornare. Nullam purus ex, sollicitudin et placerat ac, tincidunt at risus. Donec iaculis, nisi ac tristique sagittis, eros odio iaculis ligula, et lacinia sapien diam bibendum mi. Fusce bibendum eget dolor a maximus. Ut luctus at neque et egestas. In sed ultrices justo, at congue risus. Nunc vitae varius magna, eget venenatis tortor. Vestibulum a metus eros. Nunc tristique sapien dolor, et rutrum nisi viverra vel. Fusce id arcu ut ipsum maximus pulvinar. Vivamus eleifend dignissim dolor vitae cursus. Etiam elementum lorem vel egestas dictum. Donec molestie interdum augue.Pellentesque in congue erat, in finibus arcu. Nulla id posuere augue, eget pulvinar est. Etiam tempus eros sed turpis lobortis ultrices. Nunc eget neque rutrum, volutpat ligula eget, mattis neque. Vivamus at velit pharetra, efficitur lacus et, ornare lacus.Quisque molestie urna sed ante elementum sodales efficitur in risus. Ut justo turpis, iaculis id nulla cursus, elementum finibus neque. Nulla ut imperdiet enim, at consectetur enim. Donec pharetra ut diam eu placerat. Fusce augue felis, iaculis vitae placerat eu, consequat a orci. Praesent vehicula mi nec ex blandit, sit amet tincidunt neque elementum. Curabitur rutrum sem nisi, ac tempus arcu ultrices at. Donec sit amet libero eu tortor mattis sollicitudin. Donec tincidunt vulputate felis, et gravida metus ornare sit amet. Nam sagittis porttitor ligula, eu cursus est vestibulum ut. Phasellus malesuada tincidunt sapien et cursus.Morbi imperdiet est massa, nec dictum arcu ultricies vel. Praesent aliquam hendrerit arcu nec pellentesque. Mauris sollicitudin tortor et dui commodo accumsan. Aliquam congue, erat eu tincidunt pellentesque, velit nibh lobortis dui, luctus hendrerit sapien neque sit amet massa. Vivamus auctor dui sed consequat imperdiet. Nunc tristique finibus orci ac tristique. Vestibulum urna enim, semper a vestibulum vitae, lobortis eget lacus. Donec eget sapien orci. In tempor a metus quis placerat. Etiam fringilla, urna mollis condimentum ultrices, lorem ante rhoncus dolor, in hendrerit felis odio fringilla augue.';

let style_paragraph = {
  open  : `<p>`,
  close : `</p>`,
};

let style_red = {
  open  : `<span class="${css(styles.red)}">`,
  close : `</span>`,
};

let style_under = {
  open  : `<span class="${css(styles.under)}">`,
  close : `</span>`,
};

let style_bold = {
  open  : `<span class="${css(styles.bold)}">`,
  close : `</span>`,
};

let styling = [
  { min   : 0,
    max   : 652,
    style : style_paragraph,
  },
  { min : 652,
    max : 909,
    style: style_paragraph,
  },
  { min : 896,
    max : 925,
    style: style_red,
  },
  { min : 909,
    max : 1546,
    style: style_paragraph,
  },
  { min : 917,
    max : 925,
    style: style_bold,
  },
  { min : 917,
    max : 930,
    style: style_under,
  },
  { min : 1546,
    max : 2155,
    style: style_paragraph,
  },
];


/*
let text = '0123456789';

let styling = [
  { min: 1,
    max: 5,
    style: 'under',
  },
  { min: 2,
    max: 5,
    style: 'red',
  },
  { min: 3,
    max: 6,
    style: 'bold',
  },
];
*/

function App(){
  return (<StylizedText text={text} styling={styling}></StylizedText>);
}

export default App;
