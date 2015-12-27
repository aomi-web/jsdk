/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/27
 */
import Integer from './Integer';
import Arrays from '../util/Arrays';

class StringBuilder {

    value:Array;
    count:Number;

    constructor(capacity:Number = 16) {
        this.value = new Array(capacity);
    }

    append(str:String):StringBuilder {
        if (str == null) {
            return this._appendNull();
        }
        let len = str.length;
        this._ensureCapacityInternal(this.count + len);
        this.value.push(str);
        this.count += len;
        return this;
    }

    length():Number {
        return this.count;
    }

    capacity():Number {
        return this.value.length;
    }

    toString() {
        return this.value.join('');
    }

    _ensureCapacityInternal(minimumCapacity:Number) {
        if (minimumCapacity - this.value.length > 0) {
            this._expandCapacity(minimumCapacity);
        }
    }

    _expandCapacity(minimumCapacity:Number) {
        let newCapacity = value.length * 2 + 2;
        if (newCapacity - minimumCapacity < 0) {
            newCapacity = minimumCapacity;
        }
        if (newCapacity < 0) {
            if (minimumCapacity < 0) // overflow
                throw Error('OutOfMemoryError');
            newCapacity = Integer.MAX_VALUE;
        }
        this.value = Arrays.copyOf(this.value, newCapacity);
    }

    _appendNull() {
        let c = this.count;
        this._ensureCapacityInternal(c + 4);
        let value = this.value;
        value[c++] = 'n';
        value[c++] = 'u';
        value[c++] = 'l';
        value[c++] = 'l';
        this.count = c;
        return this;
    }

}

export default StringBuilder;