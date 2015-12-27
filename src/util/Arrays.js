/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/27
 */


class Arrays {

    static copyOf(original:Array, newLength:Number):Array {
        let copy = new Array(newLength);
        Arrays.arraycopy(original, 0, copy, 0, Math.min(original.length, newLength));
        return copy;
    }

    static arraycopy(src:Array, srcPos:Number, dest:Array, destPos:Number, length:Number) {
        let tmp = src.slice(srcPos);
        for (let i = destPos; i < destPos + length; i++) {
            dest[i] = tmp[i - destPos];
        }
    }

}

export default Arrays;