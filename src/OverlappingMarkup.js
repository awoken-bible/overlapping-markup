import React from 'react';

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

function _buildHierachy(styling, sort_tie_breaker){
  if(styling.length <= 1){ return styling; }

  // Sort into ascending order based on min field
  // If there are ties, defer to the sort tie breaker - which by default put the longest element
  // first (since this will be a parent which fully contains the subsequent blocks with same min)
  styling.sort((a,b) => {
    if(a.min === b.min){
      return sort_tie_breaker(a, b);
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
        return sort_tie_breaker(a, b);
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

function _generateDefaultComponentState(styling, component_state = {}){
  let new_component_state = {};
  Object.assign(new_component_state, component_state);

  for(let block of styling){
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

  return new_component_state;
}

/**
 * Renders a block of plain text styled by a set of potentially overlapping blocks
 *
 * text    - The plain string to be rendered
 * styling - Set of style blocks with min and max representing extent of text which is styled
 * sort_tie_breaker - Function called to break ties when sorting the styling elements into order
 *    This can be used to control whether styling renders as: `<a><b> text content </b></a>` or
 *    `<b><a> text content </a></b>`
 *    For this component to function, we must ALWAYS sort a styling block with a lower min before an
 *    element with a higher min - but when the min of two blocks is equal we by default sort the
 *    blocks so the LONGER is first, therefore rendering: <a><b> text </b> content </a>
 *    If this is undesired, a different tie breaking algorithm can be used, which could be example
 *    produce: <b><a> text </a></b><a> content </a>
 *    This is useful when there are requirements for a particular type of styling block to always
 *    appear inside some other - even if that means we need to generate more tags to achieve it
 */
export default function OverlappingMarkup(props) {
  let { text, styling, sort_tie_breaker } = props;

  let [ component_state, setComponentState ] = React.useState(_generateDefaultComponentState(styling));

  let hierachy = React.useMemo(() => {
    setComponentState(x => _generateDefaultComponentState(styling, x));

    // Our internal functions consume the styling array as we process it, but we don't want to
    // consume the actual array being used as a prop, or on subsequent re-renders there will be
    // no styling - so we pass a copy into _buildHierachy
    return _buildHierachy([...styling], sort_tie_breaker || ((a,b) => b.max - a.max));
  }, [ styling, sort_tie_breaker ]);

  let root = {
    min: 0,
    max: text.length,
    style: { content: (props) => (<>{props.children}</>) },
    children: hierachy,
  };

  let elements = _generateElements(text, root, component_state, setComponentState);

  // Return the element set and wrap in container which has the className, styling and onEvent
  // handlers specified by props
  // We can't just pass props directly since it would cause extra props such as text, styling and
  // sort_tie_breaker to be rendered to the DOM (which in the case of sort_tie_breaker, emits
  // warnings as we can't very well render a function into the DOM as a HTML attribute)
  let div_props = { className: props.className, style: props.style };
  for(let k of Object.keys(props)){
    if(k.startsWith('on')){ div_props[k] = props[k]; }
  }
  return (
    <div {...div_props}>
      { elements }
    </div>
  );
}
