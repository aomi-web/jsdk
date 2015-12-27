/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/25
 */

import Long from '../lang/Long';
import StringBuilder from '../lang/StringBuilder';
import Arrays from './Arrays';
const ADDRESS_BITS_PER_WORD = 5;
const BITS_PER_WORD = 1 << ADDRESS_BITS_PER_WORD;
const WORD_MASK = 0xffffffffffffffff;

class BitSet {

    words = [];
    sizeIsSticky = false;
    wordsInUse = 0;

    constructor(nbits:Number) {
        if (nbits < 0) {
            throw Error(`nbits < 0: ${nbits}`);
        }
        this._initWords(nbits);
        this.sizeIsSticky = true;
    }


    set(bitIndex:Number) {
        if (bitIndex < 0) {
            throw Error(`bitIndex < 0: ${bitIndex}`);
        }

        let wordIndex = this._wordIndex(bitIndex);
        this._expandTo(wordIndex);
        this.words[wordIndex] |= (1 << bitIndex);
    }

    get(bitIndex:Number):Boolean {
        if (bitIndex < 0) {
            throw Error(`bitIndex < 0: ${bitIndex}`);
        }

        let wordIndex = this._wordIndex(bitIndex);
        return (wordIndex < this.wordsInUse) && ((this.words[wordIndex] & (1 << bitIndex)) != 0);
    }


    length() {
        if (this.wordsInUse === 0) {
            return 0;
        }

        return BITS_PER_WORD * (this.wordsInUse - 1) +
            (BITS_PER_WORD - Long.numberOfLeadingZeros(this.words[this.wordsInUse - 1]));
    }

    cardinality():Number {
        let sum = 0;
        for (let i = 0; i < this.wordsInUse; i++) {
            sum += Long.bitCount(this.words[i]);
        }
        return sum;
    }

    nextSetBit(fromIndex:Number) {
        if (fromIndex < 0) {
            throw Error(`Index Out Of Bounds Exception. fromIndex < 0: ${fromIndex}`);
        }

        let u = this._wordIndex(fromIndex);
        if (u >= this.wordsInUse) {
            return -1;
        }

        let word = this.words[u] & (WORD_MASK << fromIndex);
        while (true) {
            if (word != 0) {
                return (u * BITS_PER_WORD) + Long.numberOfLeadingZeros(word);
            }
            if (++u === this.wordsInUse) {
                return -1;
            }
            word = this.words[u];
        }
    }

    nextClearBit(fromIndex:Number) {
        if (fromIndex < 0) {
            throw Error(`Index Out Of Bounds Exception. fromIndex < 0: ${fromIndex}`);
        }
        let u = this._wordIndex(fromIndex);
        if (u >= this.wordsInUse)
            return fromIndex;

        let word = ~this.words[u] & (WORD_MASK << fromIndex);

        while (true) {
            if (word != 0)
                return (u * BITS_PER_WORD) + Long.numberOfTrailingZeros(word);
            if (++u == this.wordsInUse)
                return this.wordsInUse * BITS_PER_WORD;
            word = ~this.words[u];
        }
    }


    _initWords(nbits:Number) {
        this.words = new Array(this._wordIndex(nbits - 1) + 1);
    }

    _wordIndex(bitIndex:Number):Number {
        return bitIndex >> ADDRESS_BITS_PER_WORD;
    }

    _expandTo(wordIndex:Number) {
        let wordsRequired = wordIndex + 1;
        if (this.wordsInUse < wordsRequired) {
            this._ensureCapacity(wordsRequired);
            this.wordsInUse = wordsRequired;
        }
    }

    _ensureCapacity(wordsRequired:Number) {
        if (this.words.length < wordsRequired) {
            // Allocate larger of doubled size or required size
            let request = Math.max(2 * this.words.length, wordsRequired);
            this.words = Arrays.copyOf(this.words, request);
            this.sizeIsSticky = false;
        }
    }

    toString():String {
        let numBits = ( this.wordsInUse > 128) ? this.cardinality() : this.wordsInUse * BITS_PER_WORD;
        let b = new StringBuilder(6 * numBits + 2);
        b.append('{');
        let i = this.nextSetBit(0);
        if (i !== -1) {
            b.append(i);
            while (true) {
                if (++i < 0) break;
                if ((i = this.nextSetBit(i)) < 0) break;
                let endOfRun = this.nextClearBit(i);
                do {
                    b.append(", ").append(i);
                }
                while (++i != endOfRun);
            }
        }

        b.append('}');

        return b.toString();
    }

}

export default BitSet;