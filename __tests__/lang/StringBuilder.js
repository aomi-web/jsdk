/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/27
 */


import StringBuilder from '../../src/lang/StringBuilder';

(() => {

    let sb = new StringBuilder();

    sb.append('123');
    sb.append('1');
    console.log(sb.toString());

})();