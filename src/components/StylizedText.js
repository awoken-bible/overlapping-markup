import React, { useState, useMemo } from 'react';

function _generateElements(text, root, component_state, setComponentState){
  let child_elms = [];

  function makeTextElm(min, max){
    return (<React.Fragment key={"__text__" + min + "-" + max + "__"}>
              { text.substring(min, max) }
            </React.Fragment>
           );
  }

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
        child_elms.push(makeTextElm(t_idx, root.children[c_idx].min));
      }

      child_elms.push(_generateElements(text, root.children[c_idx], component_state, setComponentState));
      t_idx = root.children[c_idx].max;
    }

    // Then there is some extra text content outside the styling of any children
    // of root, append it to the end
    if(t_idx < root.max){
      child_elms.push(makeTextElm(t_idx, root.max));
    }
  }

  let props = {
    style_data : root.data,
  };
  if(root.id){
    props.state    = component_state[root.id];
    props.setState = (val) => {
      console.log("Setting state!");
      console.dir(val);
      let new_state = {};
      Object.assign(new_state, component_state);
      new_state[root.id] = val;
      setComponentState(new_state);
    };
  }

  let elements = [];

  let key = `__${root.min}-${root.max}`;

  if(root.style.before != null && !root.is_continuation){
    elements.push(React.createElement(root.style.before,
                                      { key: `${key}-b`, ...props },
                                      []
                                     ));
  }
  elements.push(React.createElement(root.style.content,
                                    { key: `${key}-c`, ...props },
                                    child_elms));
  if(root.style.after != null && root.is_last){
    elements.push(React.createElement(root.style.after,
                                      { key: `${key}-a`, ...props },
                                      []));
  }

  return elements;
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

  // Our internal functions consume the styling array
  // as we process it, but we don't want to consume
  // the actual array being used as a prop, or on subsequent
  // re-renders there will be no styling - so copy it now
  let _styling = [...styling];

  let [ component_state, setComponentState ] = useState({});

  useMemo(() => {
    let new_component_state = {};
    Object.assign(new_component_state, component_state);

    for(let block of _styling){
      if(block.id === undefined ||
         component_state[block.id] !== undefined){
        continue;
      }

      if(block.style.initial_state){
        new_component_state[block.id] = { ...block.style.initial_state };
      } else {
        new_component_state[block.id] = {};
      }
    }

    setComponentState(new_component_state);
  }, [styling]);

  let hierachy = _buildHierachy(_styling);

  let root = {
    min: 0,
    max: text.length,
    style: { content: (props) => (<>{props.children}</>) },
    children: hierachy,
  };

  let elements = _generateElements(text, root, component_state, setComponentState);

  return (
    <div style={{ fontFamily: 'mono' }}>{ elements }</div>
  );
}

export default StylizedText;
