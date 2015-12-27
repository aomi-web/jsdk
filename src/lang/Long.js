/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/27
 */


class Long {

    /**
     * Returns the number of one-bits in the two's complement binary
     * representation of the specified {@code long} value.  This function is
     * sometimes referred to as the <i>population count</i>.
     *
     * @param i the value whose bits are to be counted
     * @return Number the number of one-bits in the two's complement binary
     *     representation of the specified {@code long} value.
     */
    static bitCount(i:Number):Number {
        // HD, Figure 5-14
        i = i - ((i >>> 1) & 0x5555555555555555);
        i = (i & 0x3333333333333333) + ((i >>> 2) & 0x3333333333333333);
        i = (i + (i >>> 4)) & 0x0f0f0f0f0f0f0f0f;
        i = i + (i >>> 8);
        i = i + (i >>> 16);
        i = i + (i >>> 32);
        return i & 0x7f;
    }

    /**
     * Returns the number of zero bits preceding the highest-order
     * ("leftmost") one-bit in the two's complement binary representation
     * of the specified {@code long} value.  Returns 64 if the
     * specified value has no one-bits in its two's complement representation,
     * in other words if it is equal to zero.
     *
     * <p>Note that this method is closely related to the logarithm base 2.
     * For all positive {@code long} values x:
     * <ul>
     * <li>floor(log<sub>2</sub>(x)) = {@code 63 - numberOfLeadingZeros(x)}
     * <li>ceil(log<sub>2</sub>(x)) = {@code 64 - numberOfLeadingZeros(x - 1)}
     * </ul>
     *
     * @param i the value whose number of leading zeros is to be computed
     * @return the number of zero bits preceding the highest-order
     *     ("leftmost") one-bit in the two's complement binary representation
     *     of the specified {@code long} value, or 64 if the value
     *     is equal to zero.
     */
    static numberOfLeadingZeros(i:Number):Number {
        // HD, Figure 5-6
        if (i == 0)
            return 64;
        let n = 1;
        let x = i >>> 32;
        if (x == 0) {
            n += 32;
            x = i;
        }
        if (x >>> 16 == 0) {
            n += 16;
            x <<= 16;
        }
        if (x >>> 24 == 0) {
            n += 8;
            x <<= 8;
        }
        if (x >>> 28 == 0) {
            n += 4;
            x <<= 4;
        }
        if (x >>> 30 == 0) {
            n += 2;
            x <<= 2;
        }
        n -= x >>> 31;
        return n;
    }

    numberOfTrailingZeros(i:Number):Number {
        // HD, Figure 5-14
        let x, y;
        if (i == 0) return 64;
        let n = 63;
        y = i;
        if (y != 0) {
            n = n - 32;
            x = y;
        } else {
            x = i >>> 32;
        }
        y = x << 16;
        if (y != 0) {
            n = n - 16;
            x = y;
        }
        y = x << 8;
        if (y != 0) {
            n = n - 8;
            x = y;
        }
        y = x << 4;
        if (y != 0) {
            n = n - 4;
            x = y;
        }
        y = x << 2;
        if (y != 0) {
            n = n - 2;
            x = y;
        }
        return n - ((x << 1) >>> 31);
    }
}

export default Long;