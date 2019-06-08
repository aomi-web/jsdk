/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/27
 */
import { Integer } from './Integer';
import { Arrays } from '../util/Arrays';

export class StringBuilder {

    value: Array<any>;
    count: number;

    constructor(capacity: number = 16) {
        this.value = new Array(capacity);
        this.count = 0;
    }

    append(v): StringBuilder {
        if (v == null) {
            return this._appendNull();
        }
        if (typeof v !== 'string') {
            v = String(v);
        }
        let len = v.length;
        this._ensureCapacityInternal(this.count + len);
        this.value.push(v);
        this.count += len;
        return this;
    }

    length(): number {
        return this.count;
    }

    capacity(): number {
        return this.value.length;
    }

    toString() {
        return this.value.join('');
    }

    _ensureCapacityInternal(minimumCapacity: number) {
        if (minimumCapacity - this.value.length > 0) {
            this._expandCapacity(minimumCapacity);
        }
    }

    _expandCapacity(minimumCapacity: number) {
        let newCapacity = this.value.length * 2 + 2;
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
