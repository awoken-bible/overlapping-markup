import React, { useState } from 'react';
import { css, StyleSheet } from 'aphrodite';

import StylizedText from './components/StylizedText';


const styles = StyleSheet.create({
  red: {
    backgroundColor: 'red',
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

let TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id massa quis ligula fringilla semper eget et lacus. Nulla posuere eget mi at tristique. Praesent vel posuere erat. Donec sit amet lorem ut nunc dapibus pretium. In ante sapien, efficitur quis ante ut, vehicula fermentum diam. Nullam leo sapien, pellentesque sit amet tempor in, consectetur ac magna. Integer id nulla non massa bibendum dapibus. Pellentesque placerat faucibus arcu non vehicula. Mauris non volutpat diam.Morbi eleifend, augue id ultrices rhoncus, risus felis faucibus augue, ac sodales tortor odio ut libero. Vivamus laoreet enim sit amet varius consequat. Sed gravida luctus nibh eu ultrices. Fusce vitae elementum neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque non euismod odio. Praesent vehicula quam eu nunc posuere, vitae pretium odio condimentum. Nulla a eros magna. Mauris laoreet lacus in nulla scelerisque, eu placerat mauris commodo. In efficitur ullamcorper lorem, vitae sodales urna scelerisque non. Maecenas justo nibh, bibendum id viverra nec, mattis ut quam. Mauris a facilisis elit, sed viverra velit.Maecenas interdum, tellus vitae mattis porttitor, leo metus viverra erat, ac auctor ex enim sit amet turpis. Vestibulum sit amet justo dapibus, laoreet eros nec, iaculis quam. Praesent feugiat, leo non tempus dapibus, arcu augue imperdiet est, non semper felis est eget tellus. Donec varius, odio et tempor sagittis, neque diam tempor nulla, et pulvinar elit ex lobortis tortor. Phasellus tempor felis ex, quis dapibus arcu aliquam vitae. Aliquam sodales metus ac libero auctor iaculis. Aenean in efficitur massa. Quisque viverra in sem ultricies condimentum. Donec sed lectus quam. In volutpat, dui ultrices posuere ultricies, felis urna fermentum orci, vitae suscipit risus eros nec mauris. Fusce volutpat elementum accumsan. Donec ante augue, vestibulum eu ex eu, placerat vehicula ex. Vestibulum ante justo, blandit vel ultricies at, tempus iaculis mi. Nullam diam nisl, rutrum vitae dui in, ultrices tempus nisl. Aliquam nisi lacus, maximus eget commodo non, dapibus viverra odio. Vivamus vestibulum dignissim risus.Aliquam in dui enim. Proin hendrerit luctus odio, at fermentum massa. Etiam sed dolor ac sem mattis eleifend. Vestibulum hendrerit tempor tellus in placerat. Proin ipsum dolor, aliquam ut porttitor in, facilisis at magna. Aliquam vitae condimentum augue. Cras sodales elit sodales mollis aliquet. In lorem arcu, hendrerit ut dictum non, dignissim eget nunc. Donec eros justo, dictum in dui nec, consequat viverra purus. Nulla vel arcu non erat efficitur finibus in ac massa.Mauris ultricies molestie vulputate. Phasellus at congue ex. Fusce eleifend, diam ut volutpat rhoncus, diam libero tincidunt dolor, nec malesuada mi mauris scelerisque magna. Duis consectetur augue vel erat accumsan, eu ultrices ligula pharetra. Donec viverra massa nec enim dictum, non condimentum libero elementum. Sed pharetra, nibh sit amet pellentesque eleifend, velit metus finibus enim, at gravida orci dolor nec orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam sed hendrerit neque. Morbi eget imperdiet augue. Pellentesque tristique sollicitudin nulla vel eleifend. Sed tempus, felis nec dignissim hendrerit, felis enim condimentum libero, non interdum risus lacus vel diam. Sed non pellentesque enim. Donec iaculis velit ac lacinia mollis. Morbi tortor orci, tempor ac orci sed, luctus ultrices sem. Nam fringilla volutpat urna, ut sodales mauris.Phasellus dictum purus ex, eu gravida lorem rutrum sit amet. Phasellus dictum lectus vitae porttitor tincidunt. Proin posuere massa eget suscipit fermentum. Donec condimentum sem non gravida commodo. Nulla at mi ac mauris dignissim efficitur sit amet eget nunc. Sed in dignissim ante, sit amet tempor diam. Morbi quis nunc sit amet sem pulvinar feugiat sed at sem. Nullam vel magna sed mi interdum viverra porta ac augue. Ut pulvinar leo quam, in placerat erat cursus rutrum. Quisque eu suscipit massa.Duis dictum ligula rhoncus arcu gravida, ut laoreet neque feugiat. Etiam eu cursus nisi, in aliquet justo. Aenean neque ipsum, ultrices sed viverra eget, dictum sit amet quam. Praesent quis tempor elit, congue blandit ante. Duis vel ligula faucibus, pharetra dolor ac, efficitur lectus. Curabitur at lacus tincidunt ex mollis sodales quis ut enim. Suspendisse id risus est. Etiam sed ante sed libero condimentum placerat.Nunc interdum id felis vitae placerat. Etiam pharetra est sed tempus mollis. Donec porttitor est ut tincidunt vestibulum. Aliquam egestas metus ligula, in consequat nibh rutrum eu. Morbi pretium metus vitae ultricies malesuada. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse suscipit scelerisque diam. Integer porta est dui, ac condimentum risus vestibulum nec. Aliquam vehicula sem in erat suscipit feugiat. Integer eget blandit nunc, sed vestibulum eros. Nam elementum aliquet justo, vel consectetur nulla tincidunt sed. Donec quis augue molestie, volutpat mauris pharetra, egestas sem. Sed suscipit tellus sit amet nibh congue lobortis non et leo.Vestibulum nec justo quis turpis finibus vehicula ut vitae dolor. Mauris vel velit nec magna eleifend sagittis. Quisque quis vulputate ligula, id viverra felis. Ut eleifend vulputate nisi, malesuada tristique dui blandit et. Pellentesque porta sapien a euismod facilisis. Nulla facilisi. Sed odio ligula, ultrices eu erat eu, pretium egestas justo. Curabitur rhoncus mattis sem vitae ornare. In dignissim vulputate erat ac gravida. Nulla mollis ac turpis eget feugiat. Praesent erat lorem, commodo ut consectetur sit amet, porttitor vel massa.Donec vel scelerisque erat, ac eleifend urna. Donec hendrerit mi vulputate quam venenatis, id vestibulum orci vulputate. Suspendisse semper elit ultricies, sodales lectus sit amet, hendrerit dui. Maecenas ullamcorper diam purus, sed molestie diam imperdiet eu. Praesent ut facilisis magna. Donec vestibulum in neque et faucibus. Nam dapibus nisl id ultrices lacinia. Integer feugiat porta scelerisque. Aenean accumsan orci sed vehicula fermentum. Vestibulum eu feugiat neque, sit amet sollicitudin orci.Mauris et luctus dui. Cras vitae purus eget ante maximus pretium. In neque lacus, vulputate eu eros non, accumsan ornare velit. Suspendisse tempus nisi at luctus imperdiet. Praesent hendrerit, ligula placerat finibus placerat, odio lacus faucibus sem, at tincidunt purus libero id quam. Nullam ultrices nunc nec magna commodo luctus. Cras gravida ante ac sem pellentesque cursus. Nunc cursus posuere libero, quis laoreet nunc imperdiet ut. Aenean vel nisi quis tortor accumsan placerat quis non purus. Aliquam magna lacus, rhoncus sit amet orci eget, condimentum volutpat tellus. Proin rutrum nibh in nulla tristique congue.Etiam aliquet justo a pharetra maximus. Nulla purus nulla, pretium in eleifend sollicitudin, tincidunt sit amet mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rutrum, dui sollicitudin ultricies semper, libero ligula varius turpis, eget ultricies risus nisl vel orci. Aliquam vehicula, ex a pretium molestie, metus nibh condimentum urna, sed tristique dui mi eu tortor. Nunc non lacinia ex. Suspendisse at nisi maximus, sollicitudin dui quis, tristique libero. Nullam sollicitudin diam in ligula elementum tempus. Suspendisse potenti. Nullam vehicula urna ut bibendum sollicitudin.Maecenas volutpat tempus erat, vitae vulputate purus fringilla ut. Sed porta eleifend dolor, sed mollis sem sagittis nec. Donec odio lectus, euismod eget pharetra ac, convallis et erat. Duis non eros at quam convallis imperdiet ac eget justo. Suspendisse non auctor felis, id vehicula augue. Ut scelerisque turpis sed eros sollicitudin, eget faucibus mauris euismod. Mauris lorem quam, elementum sed accumsan in, sollicitudin at erat. Maecenas et massa tincidunt, egestas lorem at, molestie sem. Sed tellus lectus, porttitor nec auctor a, egestas fringilla orci. Fusce dictum gravida commodo. Etiam dolor erat, gravida vitae nulla ac, pellentesque molestie elit. Curabitur eget tellus sit amet elit dignissim euismod. In interdum consectetur feugiat. Mauris vulputate pellentesque feugiat. Ut dignissim facilisis nibh sit amet lacinia. Aenean justo lectus, rutrum quis scelerisque nec, rhoncus et nunc.Fusce orci mi, sollicitudin ac velit sed, gravida maximus neque. Nam et dolor lectus. Aliquam nec sem augue. Pellentesque id feugiat purus, in rutrum magna. Aliquam tincidunt fringilla felis. Donec mollis eu quam non mattis. Nulla iaculis mauris nisi. Aliquam et vestibulum mauris. Vivamus quam lectus, faucibus et metus in, vehicula posuere nisi. Sed consequat nunc ac dui eleifend vestibulum. Quisque nec blandit orci, nec luctus erat. Aliquam at convallis ipsum.Curabitur nec felis id nunc feugiat finibus. Duis a convallis ante, non mollis ipsum. Suspendisse potenti. Pellentesque diam risus, condimentum eget sapien vitae, faucibus laoreet turpis. Curabitur sed magna nec nibh dignissim sagittis. Aenean vehicula velit sem, a molestie massa lacinia vel. Donec at orci ut nisl placerat blandit. Proin eget facilisis nulla. Vivamus nec metus varius, aliquam nulla nec, rutrum massa. Sed dignissim, velit eu ullamcorper convallis, lacus nisl tempus nisi, eu gravida metus nulla at quam. Cras egestas vehicula odio et lobortis. Etiam eget sem a augue sollicitudin malesuada ut vitae eros. Praesent finibus justo consectetur sem suscipit, in sagittis odio luctus. Phasellus et risus mollis, viverra ante vitae, lobortis dolor.Sed eget mi non risus aliquet tempor. Aliquam vitae blandit risus. Mauris in orci et quam euismod aliquam sed eu nulla. Integer vel elementum nunc. Aenean nisi tortor, dignissim non placerat vel, dapibus sed ligula. Curabitur massa erat, luctus nec magna at, faucibus sodales nulla. Cras eget neque mauris. Maecenas et enim arcu. Aliquam in iaculis tellus, ac dictum libero. Praesent vel rhoncus mi. Praesent vulputate finibus orci, id consequat tellus vulputate nec. Donec a tincidunt diam. Donec dignissim vulputate tempus. Etiam aliquet enim id tortor molestie, sed aliquet sapien commodo. Sed quis tortor posuere, viverra magna porttitor, ultrices purus. Proin consequat nec lorem eu iaculis.Integer vel fringilla tellus. Aenean lobortis egestas dolor, ut maximus elit laoreet eu. Nulla fermentum magna sit amet orci gravida, id vestibulum nulla hendrerit. Mauris consectetur tristique mi, vitae aliquet orci aliquam eget. Etiam at justo eu diam dapibus maximus ac eget libero. Nulla pretium felis ipsum, at luctus arcu auctor eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed hendrerit mauris et enim vestibulum, vitae viverra nisi tempus. Proin sed condimentum massa. Quisque cursus orci quis felis ultrices tempor.Fusce id lacus sit amet est varius sodales. Nam sed lorem vitae felis hendrerit molestie. Maecenas eu massa tortor. Maecenas auctor rhoncus dapibus. Sed eget blandit orci. Aliquam scelerisque enim nec diam iaculis accumsan. Integer condimentum dui non dolor vehicula euismod. Integer porttitor magna sed sodales bibendum. Aliquam eget justo in magna vulputate finibus.Pellentesque ornare ligula quis lectus malesuada, in dignissim nibh sodales. Aliquam et condimentum eros. Pellentesque ultricies ex risus, eu placerat orci iaculis et. Etiam aliquam arcu quis erat tristique, vel ornare enim porttitor. Nulla maximus consectetur lacus et tempor. Sed vitae sapien molestie, luctus nisl interdum, dictum nisi. Vestibulum congue tortor sit amet sodales scelerisque. Quisque nibh augue, condimentum nec dui vitae, blandit tincidunt velit. Praesent vestibulum sem et lacinia porttitor. Pellentesque laoreet libero vitae neque bibendum, et finibus mi cursus.Nam posuere sapien non nisi pharetra mollis. Suspendisse eu cursus massa, non facilisis velit. Aliquam erat volutpat. Nunc sed dui tempus, semper leo finibus, dignissim neque. Praesent pretium, nibh aliquet dapibus sodales, velit massa rhoncus metus, non sodales ante neque sit amet quam. Donec vestibulum porta erat eget lacinia. Aenean laoreet lacus eu gravida faucibus.Donec enim elit, porttitor vel nunc nec, sodales vulputate massa. Donec facilisis arcu gravida, elementum risus ac, hendrerit elit. Sed volutpat metus id felis semper, ut molestie velit accumsan. Ut dignissim quam nec faucibus placerat. Praesent pulvinar tortor faucibus, hendrerit est in, cursus quam. Sed id cursus enim. Vivamus tincidunt dolor dictum pulvinar placerat. Cras in mauris a orci fringilla laoreet at sit amet quam. Duis nec nisl nulla.Cras ac diam sed mi viverra aliquet non vitae nisl. Nunc nibh enim, accumsan quis auctor ac, tincidunt vitae est. Fusce sit amet mollis quam. Nunc id mauris volutpat, euismod tortor ac, scelerisque tortor. Quisque ut pellentesque diam. Ut aliquam, velit commodo venenatis auctor, ligula nisl venenatis turpis, quis convallis diam tellus et mi. Sed a tortor ligula. Nam nec tortor sit amet ante ultricies molestie.Donec pretium elit at nulla porta tristique. Nunc ac purus tempor, venenatis nunc vitae, venenatis mauris. Pellentesque augue magna, fermentum ut eros non, porttitor vulputate libero. Quisque accumsan nibh in finibus mattis. Duis pharetra tincidunt massa, id lobortis tortor gravida at. Cras eu posuere felis. Ut varius facilisis ullamcorper. Aliquam nec velit placerat, facilisis dui non, lacinia quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed massa tortor, placerat sed bibendum quis, hendrerit non nulla. In et cursus risus. Aenean vel commodo tellus. Aliquam porta dui eu malesuada sagittis. Fusce aliquet lobortis massa, eget pellentesque lectus viverra quis. Pellentesque vel mauris scelerisque, tristique risus vitae, tristique urna.Curabitur viverra, odio eu tincidunt porta, quam velit pellentesque mauris, ac efficitur ante magna vitae nisl. Donec a neque ut ipsum lacinia venenatis nec et leo. Mauris semper at arcu a aliquam. Quisque a imperdiet nisl. Ut placerat, diam sed bibendum viverra, arcu enim cursus lectus, in dapibus orci justo in quam. Suspendisse potenti. In dictum odio at ante scelerisque imperdiet. In scelerisque sapien lobortis semper elementum.Nulla fermentum venenatis neque at euismod. Nulla convallis, nisi non imperdiet ultricies, tortor mauris bibendum ante, in sollicitudin sapien lorem molestie arcu. Donec faucibus dictum erat, at aliquam tellus suscipit imperdiet. Fusce sollicitudin eros id nunc sagittis mattis. Maecenas tincidunt libero vitae mi laoreet ornare. Nam pretium volutpat neque scelerisque pharetra. Donec ultrices lectus ac gravida lobortis. Cras sed eleifend leo.Praesent augue ex, mollis imperdiet iaculis sed, sodales nec metus. Nam finibus elit quis efficitur tempor. Cras interdum a turpis eget tempor. Duis ornare elit venenatis lorem rhoncus, ac congue purus vulputate. Duis ornare, felis vitae porttitor molestie, enim velit hendrerit turpis, sed sagittis eros sem nec purus. Vestibulum molestie, nisl eu congue laoreet, nibh velit porttitor justo, ut lacinia neque nisl vestibulum nunc. Donec accumsan arcu at leo pulvinar finibus. Integer vitae condimentum augue, at auctor justo. Mauris ut sapien odio. Praesent quis arcu eu magna sagittis tristique. Donec nec arcu rutrum, vestibulum diam nec, interdum ante. Curabitur ac purus ac dolor imperdiet pharetra. Suspendisse mi tellus, dignissim quis semper id, consectetur sed felis. Phasellus posuere consequat tempus. Aliquam ultrices ipsum eu mi bibendum, at ullamcorper urna fringilla. Morbi non euismod eros.Proin sagittis erat magna, id sagittis lorem blandit eget. Sed convallis varius est, quis commodo mi gravida ut. Pellentesque ultrices ipsum a lectus accumsan consectetur. Mauris accumsan sed elit a cursus. Mauris laoreet molestie neque nec maximus. Phasellus eget elit blandit, cursus dolor eget, vehicula tellus. Sed convallis ante nibh, et ullamcorper lacus ultrices ut. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin nec egestas est. Nulla ornare felis ac ligula dapibus, sed lobortis sapien suscipit.Etiam eget fringilla mi. Etiam vulputate metus nulla, quis convallis lectus pellentesque aliquam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam consequat vel mauris eget eleifend. Duis id arcu maximus, aliquet urna volutpat, mattis lectus. Morbi quis dui commodo, dictum augue id, malesuada sem. Proin sit amet egestas mi, ac fermentum odio. Quisque ligula justo, cursus vitae hendrerit quis, porttitor in justo. Duis id scelerisque orci. Mauris placerat justo ac erat laoreet interdum.Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras nisl orci, sollicitudin vitae malesuada eget, tempor vel tellus. Nam vel sem luctus, sodales urna nec, dictum dui. Aenean mollis rhoncus nibh nec mollis. Aliquam aliquet ex a fringilla vulputate. Vivamus bibendum dapibus quam ut commodo. Phasellus tincidunt mi quis ligula laoreet feugiat. Integer rhoncus ligula sit amet neque eleifend, a lobortis leo lobortis. Pellentesque at finibus est. Morbi congue, elit at aliquet sagittis, tortor risus luctus elit, id ultrices lorem risus quis urna. Mauris nec interdum enim. Integer lacus ante, accumsan et ligula in, tincidunt tristique est. Ut hendrerit vulputate odio convallis tincidunt. Donec et finibus elit.Curabitur dictum purus ut ipsum lacinia, ut lacinia felis convallis. Phasellus sit amet nibh neque. Integer scelerisque tristique placerat. Nulla tortor justo, eleifend ac sapien ut, porta congue orci. Sed vel pellentesque nisl, nec sollicitudin mauris. Quisque accumsan, dolor vitae sodales eleifend, elit nibh tempus nibh, ut blandit nunc tortor eu diam. Donec cursus neque vitae felis eleifend consequat. Proin lobortis tristique ultricies. Sed id sapien sit amet ex rutrum auctor. Integer ac odio a ligula tincidunt fermentum. Integer ultricies, eros vel aliquet tincidunt, lacus felis scelerisque odio, in convallis tellus nisi id eros. Aliquam finibus ut est a porttitor. Pellentesque sit amet nunc interdum, ullamcorper nulla dapibus, eleifend tortor. Aliquam non pharetra neque, non lacinia magna. Vivamus hendrerit sit amet risus ut varius. Phasellus eget justo at tortor sollicitudin scelerisque.Duis id libero cursus, rhoncus eros vitae, lobortis neque. Sed et elit ac diam dictum feugiat et in mi. Integer dapibus, ex ac consectetur sollicitudin, metus lorem porta justo, a sodales est lectus sit amet justo. Donec cursus suscipit hendrerit. Ut non volutpat ante, eu vestibulum ex. Vestibulum elementum mattis ultrices. Phasellus elit turpis, cursus eget congue quis, posuere in magna. Ut a consectetur quam.raesent vitae eros sapien. Maecenas cursus dui sed sollicitudin volutpat. Suspendisse at dolor lobortis, elementum quam nec, pulvinar velit. Sed iaculis a mi molestie ornare. Mauris eu elementum lorem. Ut consequat lectus leo, a posuere justo convallis et. Fusce non dolor a urna tristique dictum.Pellentesque tincidunt egestas eleifend. Morbi dignissim augue non blandit lobortis. Phasellus feugiat cursus venenatis. Suspendisse pulvinar ligula quis dignissim varius. Ut facilisis nec justo sagittis sodales. Nulla maximus orci in turpis tincidunt congue. Nam eget libero feugiat nisl rutrum condimentum. Morbi ut est eget turpis dignissim pharetra a at tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.Ut ac nunc sed risus mattis sodales. Suspendisse sit amet ante porta, sagittis enim vitae, pulvinar justo. In sit amet purus molestie, maximus mauris ac, tristique erat. Curabitur mi lacus, facilisis vel pretium non, tincidunt ut massa. Phasellus sem diam, dignissim sodales tincidunt non, euismod vel est. Proin porttitor justo a sagittis feugiat. Praesent sodales velit ut mi facilisis, ac tincidunt tortor mattis. Ut eget tellus volutpat, varius lorem non, faucibus tellus. Phasellus sapien dolor, viverra et euismod viverra, tincidunt eget sapien. Aenean congue sed ante eget aliquam. Morbi maximus tempus nisi, et eleifend nisi sodales sit amet.Suspendisse tincidunt pulvinar nibh, eget consectetur neque pellentesque ut. Aenean malesuada urna ac tortor fermentum, in aliquet justo tincidunt. Suspendisse id gravida ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras ac quam congue, consectetur augue nec, interdum nibh. Aliquam id consectetur est, eu feugiat magna. Praesent ligula turpis, vehicula in mi eget, posuere auctor purus. Ut ac cursus felis. Donec bibendum leo non nisl tempus posuere.Mauris tincidunt condimentum molestie. Donec euismod tellus est, sit amet interdum enim dictum ut. Donec magna nisi, tincidunt eget sapien et, semper commodo enim. Integer sapien quam, elementum vel dui at, porttitor imperdiet enim. Vivamus id vestibulum dolor. Curabitur auctor lectus sit amet egestas ultrices. Morbi aliquam euismod est, vel tristique nibh.Vivamus eget odio eget libero convallis porta fringilla sit amet felis. Vivamus ut semper justo. Nullam consequat nunc et enim consequat, non malesuada lorem pharetra. Morbi egestas justo vel odio suscipit, et sollicitudin nibh porta. Phasellus quam turpis, tempus nec lorem a, mollis cursus nisi. Vivamus consectetur, orci non imperdiet mattis, est elit sollicitudin purus, vitae cursus mauris nunc eget erat. Nam sed semper est, sit amet hendrerit nibh. Nulla scelerisque massa magna, eget pharetra odio malesuada vel. Donec bibendum dui ac neque pharetra tincidunt. Vestibulum blandit velit ac nulla commodo eleifend. Etiam tincidunt, arcu eget fermentum pharetra, erat purus posuere turpis, in consequat nisi nibh sed est.Nulla placerat fringilla laoreet. Nam velit turpis, volutpat nec libero eu, ultricies faucibus sem. Aenean lacus orci, rhoncus a varius non, tempor ac turpis. Praesent venenatis risus faucibus dui convallis scelerisque. Nulla quis lacus vitae libero sodales maximus. Donec sit amet luctus lorem. Aliquam ac erat mattis, mollis leo eget, rhoncus sem. Suspendisse in ante in odio rhoncus placerat. Vestibulum sed vulputate justo. Ut sapien felis, fermentum sit amet finibus et, pulvinar ut sem. Phasellus consequat tristique dui et vulputate. Ut aliquet, odio ut blandit auctor, sapien diam vehicula dolor, quis porttitor massa libero tincidunt lacus.Suspendisse ultricies tincidunt rutrum. Aenean vel auctor nisl. Donec mauris lacus, sollicitudin bibendum ex vehicula, imperdiet ullamcorper leo. Ut vehicula purus sit amet mauris luctus, sit amet sollicitudin mauris fermentum. Cras et nibh leo. Mauris neque sem, aliquam quis nunc nec, lacinia dignissim arcu. Duis consequat luctus nisl, pellentesque lacinia metus pretium id. Proin sed feugiat tellus.Phasellus suscipit ipsum leo, eu facilisis sem ornare eget. Fusce at lacinia risus. In quis metus et tortor dapibus egestas. Duis ac purus sit amet elit porta sagittis eu in risus. Pellentesque euismod tortor purus, ac congue felis consectetur et. Mauris facilisis placerat ligula, ac ullamcorper magna auctor et. Nulla eleifend nisi at lacus vulputate, eget gravida odio gravida.Ut tincidunt tellus at ultrices accumsan. Proin aliquam tincidunt felis, in condimentum lacus imperdiet nec. Aenean quis diam metus. Maecenas accumsan tempor varius. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed vestibulum, leo id imperdiet vehicula, massa felis elementum ex, a euismod lectus nisl quis magna. Etiam blandit finibus neque a facilisis. Nullam risus dui, tempor non consectetur vel, tempor et lorem. Vivamus tincidunt enim at feugiat euismod. Ut quis vehicula arcu.Nulla facilisi. Sed a sollicitudin mauris, quis sollicitudin ante. Ut nibh ex, vulputate in nibh vitae, euismod fringilla lacus. Etiam a leo nec augue viverra tempor et id arcu. Duis sapien sapien, fermentum malesuada fringilla at, lacinia et arcu. Ut scelerisque, felis id hendrerit varius, arcu quam luctus libero, ac viverra erat mi ut ligula. Vivamus nec ligula in purus aliquet bibendum. Aliquam in mi eget ante blandit laoreet. Nunc vitae massa odio. Nulla convallis venenatis congue. Nulla bibendum at arcu a volutpat. Ut eu nibh tempus, laoreet eros eget, feugiat mauris. In efficitur massa felis, nec suscipit nisl porttitor vel. Cras viverra vel elit eu dapibus. Fusce id neque et diam dignissim egestas varius congue justo.Ut sed malesuada tellus, mollis luctus mauris. Maecenas id consequat neque, sed vehicula sapien. Praesent non aliquam mauris. Suspendisse eu urna vel sapien semper vehicula. Proin rhoncus urna ac nunc molestie, imperdiet accumsan metus rhoncus. Duis suscipit quis dolor eget facilisis. Cras rhoncus sem quis ex rhoncus volutpat ut non tortor. Vivamus porttitor magna porta lacus finibus, vel auctor tellus dapibus. Suspendisse ac magna ut odio vehicula gravida.Cras a tortor libero. Integer fermentum lacus purus, ac auctor orci vulputate ullamcorper. Quisque justo lorem, facilisis et viverra eu, convallis non dolor. Curabitur pretium ante id ex fermentum aliquet. Nam velit sapien, tincidunt nec ipsum in, porta blandit orci. Duis facilisis consequat viverra. Phasellus sit amet malesuada velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi lobortis sollicitudin libero quis rhoncus. Vestibulum placerat nisi nec nulla imperdiet, in dictum libero venenatis. Proin laoreet et ipsum vel luctus. Maecenas dolor eros, consectetur vel elit a, fringilla sagittis nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas et ante leo.Nunc vitae lectus dignissim, convallis nisi quis, ornare sapien. Fusce condimentum rutrum massa vitae viverra. Quisque efficitur sem ut turpis scelerisque, in blandit augue consequat. Quisque sed elit non lorem efficitur congue id ac elit. Nulla ut blandit dolor. Etiam lobortis turpis non lorem suscipit vestibulum. In eu ipsum suscipit, faucibus felis a, lacinia leo. Vestibulum accumsan, est vel posuere imperdiet, ligula sem vehicula erat, non facilisis lorem arcu nec ligula. Pellentesque risus erat, convallis et dapibus non, rhoncus ac ipsum. Donec ut cursus turpis, non vulputate nulla. Praesent bibendum ante a lorem tempus congue.Vestibulum tempus condimentum magna sit amet mattis. Fusce in pharetra ante. Suspendisse eget purus imperdiet, convallis urna nec, lacinia lectus. Nulla at auctor diam. Quisque mauris augue, sagittis id ultricies at, laoreet tempor dolor. Nam a neque eu tellus bibendum condimentum. Nullam pulvinar metus ut lorem suscipit suscipit. Aliquam mattis arcu sit amet ex suscipit tempor. Aliquam sagittis tincidunt sodales. Aliquam ac velit eget justo placerat venenatis. Mauris at orci mollis, imperdiet risus non, efficitur dolor. Donec tincidunt viverra rhoncus. Nulla rhoncus, augue non scelerisque porta, mauris urna cursus eros, vitae lacinia mi turpis et ante. Nullam pellentesque, massa a blandit fermentum, diam justo lacinia enim, in finibus lorem nulla nec massa.Donec feugiat eget augue ut fermentum. Maecenas fermentum nibh in ultrices euismod. Fusce lobortis aliquam sodales. Ut at lobortis massa. Suspendisse faucibus efficitur enim, accumsan suscipit leo tincidunt vitae. Donec dignissim semper eleifend. Ut eleifend ante sit amet interdum fringilla. Nullam tempus, purus sed faucibus egestas, neque mauris hendrerit magna, ac tristique sem lorem bibendum leo. Mauris feugiat massa justo, sed euismod mauris commodo a.Fusce non massa nec lorem dapibus interdum. Quisque vitae ultrices mauris, vel feugiat erat. Vivamus quis arcu eget libero finibus accumsan eget sit amet enim. Phasellus in cursus est. Quisque iaculis tortor ac augue pellentesque, a consectetur arcu tristique. Phasellus sit amet est finibus, ornare mauris in, accumsan nisi. Morbi bibendum erat id felis sagittis rhoncus.Quisque consequat lacus a sem tempus, a varius quam tincidunt. In in rutrum sem. Nunc sagittis blandit vestibulum. Aenean sodales mauris eget dui bibendum faucibus quis a nunc. Aliquam pretium tellus arcu, sed convallis velit sollicitudin id. Nullam molestie lacus orci, eu interdum quam convallis a. Praesent non neque a ante porta egestas. Nulla ac lectus a lacus ullamcorper accumsan. Nam aliquet finibus condimentum. Phasellus sollicitudin ligula velit, sed elementum ligula iaculis molestie. Vivamus convallis nisi ac tortor tempor fringilla. Integer mollis quis massa et bibendum. Mauris pharetra malesuada nibh, vitae pharetra ipsum viverra sed. Etiam hendrerit elit lorem.Ut ultricies lorem eu lacus porttitor tempor. Mauris eget mi neque. Suspendisse malesuada pharetra turpis sit amet ullamcorper. Morbi vehicula mauris ut ligula rutrum, eget egestas nunc ultricies. Pellentesque ac elit faucibus, ornare magna quis, ultrices ipsum. Sed maximus, leo ut semper finibus, leo sem bibendum quam, vitae dignissim sem massa nec arcu. Ut eu nisl eget urna dignissim consectetur. Sed sed pharetra erat.`;

let STYLING = [
  { id    : 'v1',
    min   : 0,
    max   : 22,
    style : style_verse,
    data  : { verse: 1 },
  },

  { min   : 10,
    max   : 30,
    style : style_red,
  },

  { min   : 50,
    max   : 70,
    style : style_red,
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
  { min   : 896,
    max   : 925,
    style : style_red,
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

function randInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

  let style = [];

  const NUM_Ps = 50;
  let p_breaks = [0, TEXT.length];
  for(let i = 2; i < NUM_Ps; ++i){
    p_breaks.push(randInt(1, TEXT.length-1));
  }
  p_breaks.sort((a,b) => a - b);

  for(let i = 0; i < NUM_Ps-1; ++i){
    style.push({
      min: p_breaks[i],
      max: p_breaks[i+1],
      style: style_paragraph,
    });
  }

  const NUM_Vs = 200;
  let v_breaks = [0, TEXT.length];
  for(let i = 2; i < NUM_Vs; ++i){
    v_breaks.push(randInt(1, TEXT.length-1));
  }
  v_breaks.sort((a,b) => a - b);

  for(let i = 0; i < NUM_Vs-1; ++i){
    style.push({
      min: v_breaks[i],
      max: v_breaks[i+1],
      style: style_verse,
      id: 'v' + i,
      data: { verse: i + 1 },
    });
  }

  for(let i = 0; i < 500; ++i){
    let val = randInt(0, TEXT.length);
    let s   = [style_red, style_under, style_bold][randInt(0,2)];
    style.push({
      min: val,
      max: val + randInt(3, 8),
      style: s,
    });
  }

  console.dir(style);

  return (<div>
            <StylizedText text={TEXT} styling={style}></StylizedText>
          </div>
         );
}

export default App;
