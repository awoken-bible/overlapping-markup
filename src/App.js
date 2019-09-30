import React from 'react';

import { css, StyleSheet } from 'aphrodite';

/*
let text = 'Nulla ac tortor magna. In aliquet tellus in elit egestas, a vulputate enim ornare. Nullam purus ex, sollicitudin et placerat ac, tincidunt at risus. Donec iaculis, nisi ac tristique sagittis, eros odio iaculis ligula, et lacinia sapien diam bibendum mi. Fusce bibendum eget dolor a maximus. Ut luctus at neque et egestas. In sed ultrices justo, at congue risus. Nunc vitae varius magna, eget venenatis tortor. Vestibulum a metus eros. Nunc tristique sapien dolor, et rutrum nisi viverra vel. Fusce id arcu ut ipsum maximus pulvinar. Vivamus eleifend dignissim dolor vitae cursus. Etiam elementum lorem vel egestas dictum. Donec molestie interdum augue.Pellentesque in congue erat, in finibus arcu. Nulla id posuere augue, eget pulvinar est. Etiam tempus eros sed turpis lobortis ultrices. Nunc eget neque rutrum, volutpat ligula eget, mattis neque. Vivamus at velit pharetra, efficitur lacus et, ornare lacus.Quisque molestie urna sed ante elementum sodales efficitur in risus. Ut justo turpis, iaculis id nulla cursus, elementum finibus neque. Nulla ut imperdiet enim, at consectetur enim. Donec pharetra ut diam eu placerat. Fusce augue felis, iaculis vitae placerat eu, consequat a orci. Praesent vehicula mi nec ex blandit, sit amet tincidunt neque elementum. Curabitur rutrum sem nisi, ac tempus arcu ultrices at. Donec sit amet libero eu tortor mattis sollicitudin. Donec tincidunt vulputate felis, et gravida metus ornare sit amet. Nam sagittis porttitor ligula, eu cursus est vestibulum ut. Phasellus malesuada tincidunt sapien et cursus.Morbi imperdiet est massa, nec dictum arcu ultricies vel. Praesent aliquam hendrerit arcu nec pellentesque. Mauris sollicitudin tortor et dui commodo accumsan. Aliquam congue, erat eu tincidunt pellentesque, velit nibh lobortis dui, luctus hendrerit sapien neque sit amet massa. Vivamus auctor dui sed consequat imperdiet. Nunc tristique finibus orci ac tristique. Vestibulum urna enim, semper a vestibulum vitae, lobortis eget lacus. Donec eget sapien orci. In tempor a metus quis placerat. Etiam fringilla, urna mollis condimentum ultrices, lorem ante rhoncus dolor, in hendrerit felis odio fringilla augue.';

let markup = [
  { min : 0,
    max : 651,
    style: 'paragraph',
  },
  { min : 652,
    max : 908,
    style: 'paragraph',
  },

  { min : 670,
    max : 690,
    style: 'bold',
  },

  { min : 900,
    max : 920,
    style: 'red',
  },



  { min : 909,
    max : 1545,
    style: 'paragraph',
  },
  { min : 1546,
    max : 2155,
    style: 'paragraph',
  },
];
*/

let text = '0123456789';

let markup = [
  { min: 1,
    max: 3,
    style: 'under',
  },
  { min: 2,
    max: 4,
    style: 'red',
  },
  { min: 3,
    max: 5,
    style: 'bold',
  },
];

function generateHtml(){
  let html = '';

  let t_idx = 0;
  let unclosed_markup = [];
  let cnt = 0;
  while(t_idx < text.length && cnt < 30){
    ++cnt;
    console.log(`\n\nText idx: ${t_idx}`);

    let end = text.length;
    console.log("initial end: " + end);

    ////////////////////////////
    // close

    console.log("Checking if should close");
    console.log(JSON.stringify(unclosed_markup, null, 2));

    let first_to_close = null;
    for(let i = 0; i < unclosed_markup.length; ++i){
      console.dir(unclosed_markup[i]);
      if(unclosed_markup[i].max <= t_idx){
        first_to_close = i;
        break;
      }
    }

    let to_reopen = [];
    if(first_to_close != null){
      console.log("Closing " + unclosed_markup[first_to_close].style);
      while(unclosed_markup.length-1 > first_to_close){
        to_reopen.unshift(unclosed_markup.pop());
        html += "</span>";
      }
      unclosed_markup.pop();
      html += "</span>";
      for(let x of to_reopen){
        console.log("  repoen: " + x.style);
        html += `<span class="${css(styles[x.style])}">`;
      }
      unclosed_markup = unclosed_markup.concat(to_reopen);
    } else {
      console.log("Nothing to close");
    }

    console.log("Still open: ");
    console.log(JSON.stringify(unclosed_markup, null, 2));
    for(let x of unclosed_markup){
      if(x.max < end){ end = x.max; }
    }
    console.log("end to close markup: " + end);

    ///////////////////////////////
    // open

    while(markup.length && markup[0].min == t_idx){
      let mark = markup.shift();
      console.log("Opening " + mark.style);
      html += `<span class=${css(styles[mark.style])}>`;
      unclosed_markup.push(mark);
      if(mark.max < end){ end = mark.max; }
    }
    if(markup.length && markup[0].min < end){
      end = markup[0].min;
    }
    console.log("end to next markup: " + end);

    ////////////////

    html += text.substring(t_idx, end);
    t_idx = end;
  }

  return html;
}

function App() {
  console.log("Rendering app");

  let elms = [];

  let html = '';

  html = generateHtml();


  return (
    <div style={{ fontFamily: 'mono' }} dangerouslySetInnerHTML={ { __html: html } }>
    </div>
  );
}

let styles = StyleSheet.create({
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


export default App;
