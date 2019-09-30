import React from 'react';

/*
function _generateElements(text, styling, currently_open){
  if(styling.length == 0){
    return (<>{text}</>);
  }

  let elements = [];
  let first_open = styling[0].min;

  if(styling[0].min > 0){
    elements.push(<span>{text.substring(0, styling[0].max)}</span>);
  }

  while(true){
    let sty = styling.unshift();

    let children = _generateElements(text, styling);

    children.push(<>{text.substring(sty.min, next_open)}</>);

    elements.push(React.createElement(sty.content, {}, children));
  }

  return elements;
}
*/

function _buildHierachy(styling){
  if(styling.length <= 1){ return styling; }

  // Sort into ascending order based on min field
  // If there are ties, put the longest element first
  // (since this will be a parent which fully contains
  // the subsequent blocks with same min)
  styling.sort((a,b) => {
    if(a.min == b.min){
      return b.max - a.max;
    }
    return a.min - b.min;
  });

  let result = [];

  function _recurse(root, to_reopen){
    // Consume blocks While the next one is at least partially contained
    // within this root (as opposed to being the subsequent sibling to
    // this root)
    while(styling.length && styling[0].min < root.max){
      let next = styling.shift();

      if(next.max === root.max){
        // Then the next block ends at same point as current root,
        // nothing clever needs doing
        root.children.push(next);
      } else if(next.max > root.max){
        // then the next block continues after this root
        // split the block into 2:

        // One that continues until the end of this root
        root.children.push({ ...next, max: root.max });

        // and another which starts just after this root
        to_reopen.push({ ...next, min: root.max+1});
      } else {
        // then the next block ends before the current root, so treat it
        // as if it were a new root
        root.children.push(_recurse({ ...next, children: [] }, to_reopen));
      }
    }

    // we've reached the end of this root, so append the to_reopen
    // blocks to styling
    styling = to_reopen.concat(styling);

    return root;
  }

  while(styling.length){
    let root = { ...styling.shift(), children: [] };
    result.push(root);
    _recurse(root, []);
  }

  return result;
}


function StylizedText(props) {
  let { text, styling } = props;

  console.log("Rendering StylizedText");

  let hierachy = _buildHierachy(styling);

  console.dir(hierachy);

  /*
  // Sort into ascending order based on min field
  styling.sort((a,b) => { return a.min - b.min; });

  let non_overlapping = [];

  for(let sty of styling){

  }

  let elements = _generateElements(text, styling, []);
  */

  return (
    <div>Hi</div>
  );
}

export default StylizedText;
