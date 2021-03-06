import React from 'react';
import { css, StyleSheet } from 'aphrodite';

import OverlappingMarkup from './OverlappingMarkup';


const styles = StyleSheet.create({
  red: {
    color: 'red',
  },
  under: {
    textDecoration: 'underline',
  },
  bold: {
    //fontWeight: 900,
    textDecoration: 'line-through',
  },
  paragraph: {
    display: 'block',
  },

  footnote_caller : {
    display: 'inline-block',
    background: 'red',
    width: '1em',
    height: '1em',
  },
});


let style_paragraph = {
  content : (props) => (<p>{props.children}</p>),
};

let style_red = {
  content : (props) => (<span className={css(styles.red)}>
                          {props.children}
                        </span>
                       ),
};

let style_under = {
  content : (props) => (<span className={css(styles.under)}>
                          {props.children}
                        </span>
                       ),
};

let style_bold = {
  content : (props) => (<span className={css(styles.bold)}>
                          {props.children}
                        </span>
                       ),
};


function onVerseClick(props){
  console.log("on verse click!!!");
  console.dir(props);
  props.setState(
    { ...props.state, is_selected: !props.state.is_selected }
  );
}

let style_verse = {
  initial_state : {
    is_selected: false,
  },
  before : (props) => {
    return (
      <sup onClick={() => onVerseClick(props)}>
        {props.style_data.verse}
      </sup>
    );
  },
  content: (props) => {
    return (
      <span style={{ backgroundColor: props.state.is_selected ? 'yellow' : 'inherit' }}
            onClick={() => onVerseClick(props)}
      >
        {props.children}
      </span>
    );
  },
  after : (props) => {
    return (<sub>{props.style_data.verse}</sub>);
  }
};

/*
let style_footnote = {
  before  : null,

  content : (props) => {
    return (<span>
              { props.children }
            </span>
           );
  },

  after : (props) => {
    function onHover(e){
      props.ref_content.current.classList.add('footnote_referenced');
    }
    function onUnHover(e){
      props.ref_content.current.classList.remove('footnote_referenced');
    }
    return (<span className={css.footnote_caller}
                  onMouseEnter={onHover}
                  onMouseLeave={onUnHover}
            >
              {props.data.caller}
            </span>
           );
  },
};
*/

let text = 'Nulla ac tortor magna. In aliquet tellus in elit egestas, a vulputate enim ornare. Nullam purus ex, sollicitudin et placerat ac, tincidunt at risus. Donec iaculis, nisi ac tristique sagittis, eros odio iaculis ligula, et lacinia sapien diam bibendum mi. Fusce bibendum eget dolor a maximus. Ut luctus at neque et egestas. In sed ultrices justo, at congue risus. Nunc vitae varius magna, eget venenatis tortor. Vestibulum a metus eros. Nunc tristique sapien dolor, et rutrum nisi viverra vel. Fusce id arcu ut ipsum maximus pulvinar. Vivamus eleifend dignissim dolor vitae cursus. Etiam elementum lorem vel egestas dictum. Donec molestie interdum augue.Pellentesque in congue erat, in finibus arcu. Nulla id posuere augue, eget pulvinar est. Etiam tempus eros sed turpis lobortis ultrices. Nunc eget neque rutrum, volutpat ligula eget, mattis neque. Vivamus at velit pharetra, efficitur lacus et, ornare lacus.Quisque molestie urna sed ante elementum sodales efficitur in risus. Ut justo turpis, iaculis id nulla cursus, elementum finibus neque. Nulla ut imperdiet enim, at consectetur enim. Donec pharetra ut diam eu placerat. Fusce augue felis, iaculis vitae placerat eu, consequat a orci. Praesent vehicula mi nec ex blandit, sit amet tincidunt neque elementum. Curabitur rutrum sem nisi, ac tempus arcu ultrices at. Donec sit amet libero eu tortor mattis sollicitudin. Donec tincidunt vulputate felis, et gravida metus ornare sit amet. Nam sagittis porttitor ligula, eu cursus est vestibulum ut. Phasellus malesuada tincidunt sapien et cursus.Morbi imperdiet est massa, nec dictum arcu ultricies vel. Praesent aliquam hendrerit arcu nec pellentesque. Mauris sollicitudin tortor et dui commodo accumsan. Aliquam congue, erat eu tincidunt pellentesque, velit nibh lobortis dui, luctus hendrerit sapien neque sit amet massa. Vivamus auctor dui sed consequat imperdiet. Nunc tristique finibus orci ac tristique. Vestibulum urna enim, semper a vestibulum vitae, lobortis eget lacus. Donec eget sapien orci. In tempor a metus quis placerat. Etiam fringilla, urna mollis condimentum ultrices, lorem ante rhoncus dolor, in hendrerit felis odio fringilla augue.';

let styling = [
  { id    : 'v1',
    min   : 0,
    max   : 22,
    style : style_verse,
    data  : { verse: 1 },
  },

  { min   : 0,
    max   : 652,
    style : style_paragraph,
  },
  { min   : 652,
    max   : 909,
    style : style_paragraph,
  },
  { min   : 909,
    max   : 1546,
    style : style_paragraph,
  },
  { min   : 1546,
    max   : 2155,
    style : style_paragraph,
  },
  { id: 'v2',
    min   : 896,
    max   : 925,
    style : style_verse,
    data  : { verse: 1 },
  },
  { min   : 917,
    max   : 925,
    style : style_bold,
  },
  { min   : 917,
    max   : 930,
    style : style_under,
  },
];

function App(){

  /*
  text = '0123456789';
  styling = [
    { min: 1, max: 5, style: style_under },
    { min: 2, max: 5, style: style_red,  },
    { min: 3, max: 6, style: style_bold, },
  ];
  text = 'ABCDEFGHIJKLMNOPQRSTUVWXYS';
  styling = [
    { id: 1, min:  2, max:  7, style: style_red,  },
    { id: 2, min:  5, max:  9, style: style_under },
    { id: 3, min:  8, max: 13, style: style_bold },
    { id: 4, min: 12, max: 20, style: style_red },
    { id: 5, min: 14, max: 15, style: style_under },
    { id: 6, min: 17, max: 18,  style: style_under },
  ];
  */

  return (<OverlappingMarkup text={text} styling={styling}/>);
}

export default App;
