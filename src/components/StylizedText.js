import React from 'react';

function _generateElements(text, root){
  let child_elms = [];
  if(root.children === undefined || root.children.length === 0){
    // Base case - if this is leaf node, simply wrap the corresponding
    // section of text in the appropriate style
    child_elms = text.substring(root.min, root.max);
  } else {
    // Otherwise recurse down the hierachy
    let t_idx = root.min;

    for(let c_idx = 0; c_idx < root.children.length; ++c_idx){
      if(t_idx < root.children[c_idx].min){
        // Then there is some extra unstyled text content before the start of the
        // next child
        child_elms.push(<>{text.substring(t_idx, root.children[c_idx].min)}</>);
      }

      child_elms.push(_generateElements(text, root.children[c_idx]));
      t_idx = root.children[c_idx].max;
    }

    // Then there is some extra text content outside the styling of any children
    // of root, append it to the end
    if(t_idx < root.max){
      child_elms.push(<>{text.substring(t_idx, root.max)}</>);
    }
  }

  let props = {
    style_data: root.data,
  };

  let elements = [];

  // :TODO: generate this in deterministic way
  let key = Math.random();

  console.dir(props);
  if(root.style.before != null && !root.is_continuation){
    elements.push(React.createElement(root.style.before,
                                      { key: 'b', ...props },
                                      []
                                     ));
  }
  elements.push(React.createElement(root.style.content,
                                    { key: 'c', ...props },
                                    child_elms));
  if(root.style.after != null && root.is_last){
    elements.push(React.createElement(root.style.after,
                                      { key: 'a', ...props },
                                      []));
  }

  return (<>{elements}</>);
}

function _buildHierachy(styling){
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
        // (which we recurse into)
        root.children.push(_recurse({ ...next, max: root.max, children: [] }, []));

        // and another which starts just after this root
        to_reopen.push({ ...next, min: root.max, is_continuation: true });
      } else {
        // then the next block ends before the current root, so treat it
        // as if it were a new root
        root.children.push(_recurse({ ...next, children: [], is_last: true }, []));
      }
    }

    // we've reached the end of this root, so append the to_reopen
    // blocks to styling
    styling = to_reopen.concat(styling);
    styling.sort((a,b) => {
      if(a.min === b.min){
        return b.max - a.max;
      }
      return a.min - b.min;
    });

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
