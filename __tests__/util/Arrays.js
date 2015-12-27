/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/27
 */

import Arrays from '../../src/util/Arrays';

function arraycopy() {

    console.log('array copy');
    let src = [1, 2, 3, 4];
    console.log('src ', src);

    let dest = [];
    Arrays.arraycopy(src, 0, dest, 0, src.length);
    console.log('dest ', dest);

    dest = [];
    Arrays.arraycopy(src, 0, dest, 0, 1);
    console.log('dest ', dest);

    dest = [];
    Arrays.arraycopy(src, 1, dest, 0, 1);
    console.log('dest ', dest);

}

(() => {
    arraycopy();
})();