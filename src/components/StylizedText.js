import React from 'react';

function _generateElements(text, root){

  console.log("Generating element for");
  console.dir(root);

  // Base case - if this is leaf node, simply wrap the corresponding
  // section of text in the appropriate style
  if(root.children === undefined || root.children.length === 0){
    console.log(`Is leaf --> ${root.min} - ${root.max} : ` + text.substring(root.min, root.max));

    return React.createElement(root.style.content, {}, text.substring(root.min, root.max));
  }

  let elements = [];

  let t_idx = root.min;

  for(let c_idx = 0; c_idx < root.children.length; ++c_idx){
    if(t_idx < root.children[c_idx].min){
      // Then there is some extra unstyled text content before the start of the
      // next child
      elements.push(<>{text.substring(t_idx, root.children[c_idx].min)}</>);
    }

    elements.push(_generateElements(text, root.children[c_idx]));
    t_idx = root.children[c_idx].max;
  }

  // Then there is some extra text content outside the styling of any children
  // of root, append it to the end
  if(t_idx < root.max){
    elements.push(<>{text.substring(t_idx, root.max)}</>);
  }

  return React.createElement(root.style.content, {}, elements);
}

function _buildHierachy(styling){
  //debugger;
  if(styling.length <= 1){ return styling; }

  // Sort into ascending order based on min field
  // If there are ties, put the longest element first
  // (since this will be a parent which fully contains
  // the subsequent blocks with same min)
  styling.sort((a,b) => {
    if(a.min === b.min){
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

      if(next.max > root.max){
        // then the next block continues after this root
        // split the block into 2:

        // One that continues until the end of this root
        root.children.push({ ...next, max: root.max });

        // and another which starts just after this root
        to_reopen.push({ ...next, min: root.max});
      } else {
        // then the next block ends before the current root, so treat it
        // as if it were a new root
        root.children.push(_recurse({ ...next, children: [] }, []));
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


  let root = {
    min: 0,
    max: text.length,
    style: { content: (props) => (<>{props.children}</>) },
    children: hierachy,
  };

  let elements = _generateElements(text, root);

  return (
    <div style={{ fontFamily: 'mono' }}>{ elements }</div>
  );
}

export default StylizedText;
