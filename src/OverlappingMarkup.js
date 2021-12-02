import React from 'react';

function _generateElements(text, root, componentState, setComponentState){
	let childElms = [];

	function makeTextElm(min, max){
		return (
			<React.Fragment key={"__text__" + min + "-" + max + "__"}>
				{ text.substring(min, max) }
			</React.Fragment>
		);
	}

	if(root.children === undefined || root.children.length === 0){
		// Base case - if this is leaf node, simply wrap the corresponding
		// section of text in the appropriate style
		childElms = text.substring(root.min, root.max);
	} else {
		// Otherwise recurse down the hierachy
		let textIdx = root.min;

		for(let child of root.children){
			if(textIdx < child.min){
				// Then there is some extra unstyled text content before the start of the next child
				childElms.push(makeTextElm(textIdx, child.min));
			}

			childElms.push(_generateElements(text, child, componentState, setComponentState));
			textIdx = child.max;
		}

		// Then there is some extra text content outside the styling of any children
		// of root, append it to the end
		if(textIdx < root.max){
			childElms.push(makeTextElm(textIdx, root.max));
		}
	}

	///////////////
	// Generate props to attach to the generated element
	let props = { styleData : root.data };
	if(root.id){
		props.state		 = componentState[root.id];
		props.setState = (arg) => {
			setComponentState((old) => {
				let result = { ...old };
				result[root.id] = typeof arg === 'function' ? arg(old[root.id]) : arg;
				return result;
			});
    };
  }

  let elements = [];

  let key = `__${root.min}-${root.max}`;

  if(root.style.before && !root.isContinuation){
    elements.push(React.createElement(
			root.style.before, { key: `${key}-b`, ...props }, []
		));
  }
  elements.push(React.createElement(
		root.style.content, { key: `${key}-c`, ...props }, childElms
	));
  if(root.style.after && root.isLlast){
    elements.push(React.createElement(
			root.style.after, { key: `${key}-a`, ...props }, []
		));
  }

  return elements;
}

/**
 * Helper function which converts from a list of styling blocks, to an internal
 * hierhachical object representation
 */
function _buildHierachy(styling, sortTieBreaker){
  if(styling.length <= 1){ return styling; }

  // Sort into ascending order based on min field
  // If there are ties, defer to the sort tie breaker - which by default put the longest element
  // first (since this will be a parent which fully contains the subsequent blocks with same min)
	const _sorter = (a,b) => a.min - b.min || sortTieBreaker(a, b);
  styling.sort(_sorter);


  let result = [];

  function _recurse(root, toReopen){
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
        toReopen.push({ ...next, min: root.max, isCcontinuation: true });
      } else {
        // then the next block ends before the current root, so treat it
        // as if it were a new root
        root.children.push(_recurse({ ...next, children: [], isLast: true }, []));
      }
    }

    // we've reached the end of this root, so append the toReopen blocks to styling
    styling = toReopen.concat(styling);
    styling.sort(_sorter);

    return root;
  }

  while(styling.length){
    let root = { ...styling.shift(), children: [] };
    result.push(root);
    _recurse(root, []);
  }

  return result;
}

function _generateDefaultComponentState(styling, oldState = {}){
  let result = { ...oldState };

  for(let block of styling){
    if(block.id === undefined || result[block.id] !== undefined){
      continue;
    }
		result[block.id] = block.style.initialState === undefined ? {} : { ...block.style.initialState };
  }

  return result;
}

export default function OverlappingMarkup({
	/** The plain string to be rendered */
	text,

	/** Set of style blocks with min and max representing extent of text which is styled */
	styling,

	/**
	 * Function called to break ties when sorting the styling elements into order
	 *
	 * This can be used to control the nesting order of overlapping styling, IE:
	 * - `<a><b> text content </b></a>`
	 * - `<b><a> text content </a></b>`
	 *
	 * Note that this function automatically sorts elements with a lower min before a higher min.
	 * This function is only called when two styling blocks have an equal min. By default we sort the
	 * blocks so the LONGER is first, therefore rendering: `<a><b> text </b> content </a>`
	 *
	 * If this is undesired, a different tie breaking algorithm can be used, which could be example
	 * produce: <b><a> text </a></b><a> content </a>
	 *
	 * This is useful when there are requirements for a particular type of styling block to always
	 * appear inside some other (eg, inline elements inside block elements), even if this means we
	 * need to generate more tags to achieve this result
	 */
	sortTieBreaker = defaultTieBreaker,
}) {

	let [ componentState, setComponentState ] = React.useState({});

	let hierachy = React.useMemo(() => {
		setComponentState(x => _generateDefaultComponentState(styling, x));

		// Our internal functions consume the styling array as we process it, but we don't want to
		// consume the actual array being used as a prop, or on subsequent re-renders there will be
		// no styling - so we pass a copy into _buildHierachy
		return _buildHierachy([...styling], sortTieBreaker);
	}, [ styling, sortTieBreaker ]);

	const elements = React.useMemo(() => {
		let root = {
			min: 0,
			max: text.length,
			style: { content: (props) => (<>{props.children}</>) },
			children: hierachy,
		};

		return _generateElements(text, root, componentState, setComponentState);
	}, [ text, componentState, hierachy, setComponentState ]);

	return <>{ elements }</>;
}

/**
 * Default sort order tie breaker which puts nests shorter styling blocks inside longer blocks
 */
function defaultTieBreaker(a,b) {
	return b.max - a.max;
}


// attach to component, so user's of lib can fallback to default implementation within their own
OverlappingMarkup.defaultTieBreaker = defaultTieBreaker;
