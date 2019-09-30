import React from 'react';

function _generateHtml(text, styling){
  let html = '';

  let t_idx = 0;
  let unclosed_styling = [];
  let cnt = 0;
  while(t_idx < text.length && cnt < 30){
    ++cnt;
    console.log(`\n\nText idx: ${t_idx}`);

    let end = text.length;
    console.log("initial end: " + end);

    ////////////////////////////
    // Close any styling sections that end on max == t_idx
    // Note that it may be that we have to close a styling
    // block that is not the most recently openned - hence
    // we track the extra blocks we had to unintentionally
    // close by pushing them to the array `to_reopen`

    console.log("Checking if should close");
    console.log(JSON.stringify(unclosed_styling, null, 2));

    let first_to_close = null;
    for(let i = 0; i < unclosed_styling.length; ++i){
      console.dir(unclosed_styling[i]);
      if(unclosed_styling[i].max <= t_idx){
        first_to_close = i;
        break;
      }
    }

    let to_reopen = [];
    if(first_to_close != null){
      while(unclosed_styling.length-1 > first_to_close){

        let item = unclosed_styling.pop();
        console.log(" force closing: ");
        console.dir(JSON.stringify(item));

        if(item.max > t_idx){
          to_reopen.unshift(item);
        }
        html += item.style.close;
      }
      let item = unclosed_styling.pop();
      console.log(" closing: ");
      console.dir(JSON.stringify(item));
      html += item.style.close;
    } else {
      console.log("Nothing to close");
    }

    console.log("Still open: ");
    console.log(JSON.stringify(unclosed_styling, null, 2));


    ///////////////////////////////
    // Open any new styling sections, starting on min == t_idx

    while(styling.length && styling[0].min == t_idx){
      let mark = styling.shift();
      console.log("Opening " + mark.style);
      html += mark.style.open;
      unclosed_styling.push(mark);
      if(mark.max < end){ end = mark.max; }
    }
    if(styling.length && styling[0].min < end){
      end = styling[0].min;
    }
    console.log("end to next styling: " + end);

    ///////////////////////////////
    // Re-open any styling sections we were forced to close
    for(let x of to_reopen){
      console.log("  repoen: " + x.style);
      html += x.style.open;
    }
    unclosed_styling = unclosed_styling.concat(to_reopen);
    for(let x of unclosed_styling){
      if(x.max < end){ end = x.max; }
    }
    console.log("end to close styling: " + end);

    ///////////////////////////////
    // Add the text until the next styling change
    html += text.substring(t_idx, end);
    t_idx = end;
  }


  console.log(html);
  return html;
}

function StylizedText(props) {
  let { text, styling } = props;

  console.log("Rendering StylizedText");

  // Sort into ascending order based on min field
  styling.sort((a,b) => { return a.min - b.min; });

  let html = _generateHtml(text, styling);

  return (
    <div style={{ fontFamily: 'mono' }}
         dangerouslySetInnerHTML={ { __html: html } }
    >
    </div>
  );
}

export default StylizedText;
