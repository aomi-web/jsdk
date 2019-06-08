// import { BigInteger } from './BigInteger';
//
//
// /**
//  * @author 田尘殇Sean(sean.snow@live.com) create at 2017/12/21
//  */
//
// // Rounding Modes
//
// /**
//  * Rounding mode to round away from zero.  Always increments the
//  * digit prior to a nonzero discarded fraction.  Note that this rounding
//  * mode never decreases the magnitude of the calculated value.
//  */
// export const ROUND_UP = 0;
//
// /**
//  * Rounding mode to round towards zero.  Never increments the digit
//  * prior to a discarded fraction (i.e., truncates).  Note that this
//  * rounding mode never increases the magnitude of the calculated value.
//  */
// export const ROUND_DOWN = 1;
//
// /**
//  * Rounding mode to round towards positive infinity.  If the
//  * {@code BigDecimal} is positive, behaves as for
//  * {@code ROUND_UP}; if negative, behaves as for
//  * {@code ROUND_DOWN}.  Note that this rounding mode never
//  * decreases the calculated value.
//  */
// export const ROUND_CEILING = 2;
//
// /**
//  * Rounding mode to round towards negative infinity.  If the
//  * {@code BigDecimal} is positive, behave as for
//  * {@code ROUND_DOWN}; if negative, behave as for
//  * {@code ROUND_UP}.  Note that this rounding mode never
//  * increases the calculated value.
//  */
// export const ROUND_FLOOR = 3;
//
// /**
//  * Rounding mode to round towards {@literal "nearest neighbor"}
//  * unless both neighbors are equidistant, in which case round up.
//  * Behaves as for {@code ROUND_UP} if the discarded fraction is
//  * &ge; 0.5; otherwise, behaves as for {@code ROUND_DOWN}.  Note
//  * that this is the rounding mode that most of us were taught in
//  * grade school.
//  */
// export const ROUND_HALF_UP = 4;
//
// /**
//  * Rounding mode to round towards {@literal "nearest neighbor"}
//  * unless both neighbors are equidistant, in which case round
//  * down.  Behaves as for {@code ROUND_UP} if the discarded
//  * fraction is {@literal >} 0.5; otherwise, behaves as for
//  * {@code ROUND_DOWN}.
//  */
// export const ROUND_HALF_DOWN = 5;
//
// /**
//  * Rounding mode to round towards the {@literal "nearest neighbor"}
//  * unless both neighbors are equidistant, in which case, round
//  * towards the even neighbor.  Behaves as for
//  * {@code ROUND_HALF_UP} if the digit to the left of the
//  * discarded fraction is odd; behaves as for
//  * {@code ROUND_HALF_DOWN} if it's even.  Note that this is the
//  * rounding mode that minimizes cumulative error when applied
//  * repeatedly over a sequence of calculations.
//  */
// export const ROUND_HALF_EVEN = 6;
//
// /**
//  * Rounding mode to assert that the requested operation has an exact
//  * result, hence no rounding is necessary.  If this rounding mode is
//  * specified on an operation that yields an inexact result, an
//  * {@code ArithmeticException} is thrown.
//  */
// export const ROUND_UNNECESSARY = 7;
//
//
// export class BigDecimal extends Number {
//
//   // Cache of common small BigDecimal values.
//   private static zeroThroughTen = [
//     new BigDecimal(BigInteger.ZERO,       0,  0, 1),
//     new BigDecimal(BigInteger.ONE,        1,  0, 1),
//     new BigDecimal(BigInteger.valueOf(2), 2,  0, 1),
//     new BigDecimal(BigInteger.valueOf(3), 3,  0, 1),
//     new BigDecimal(BigInteger.valueOf(4), 4,  0, 1),
//     new BigDecimal(BigInteger.valueOf(5), 5,  0, 1),
//     new BigDecimal(BigInteger.valueOf(6), 6,  0, 1),
//     new BigDecimal(BigInteger.valueOf(7), 7,  0, 1),
//     new BigDecimal(BigInteger.valueOf(8), 8,  0, 1),
//     new BigDecimal(BigInteger.valueOf(9), 9,  0, 1),
//     new BigDecimal(BigInteger.TEN,        10, 0, 2),
//   ];
//
//   // Cache of zero scaled by 0 - 15
//   private static ZERO_SCALED_BY = [
//     BigDecimal.zeroThroughTen[0],
//     new BigDecimal(BigInteger.ZERO, 0, 1, 1),
//     new BigDecimal(BigInteger.ZERO, 0, 2, 1),
//     new BigDecimal(BigInteger.ZERO, 0, 3, 1),
//     new BigDecimal(BigInteger.ZERO, 0, 4, 1),
//     new BigDecimal(BigInteger.ZERO, 0, 5, 1),
//     new BigDecimal(BigInteger.ZERO, 0, 6, 1),
//     new BigDecimal(BigInteger.ZERO, 0, 7, 1),
//     new BigDecimal(BigInteger.ZERO, 0, 8, 1),
//     new BigDecimal(BigInteger.ZERO, 0, 9, 1),
//     new BigDecimal(BigInteger.ZERO, 0, 10, 1),
//     new BigDecimal(BigInteger.ZERO, 0, 11, 1),
//     new BigDecimal(BigInteger.ZERO, 0, 12, 1),
//     new BigDecimal(BigInteger.ZERO, 0, 13, 1),
//     new BigDecimal(BigInteger.ZERO, 0, 14, 1),
//     new BigDecimal(BigInteger.ZERO, 0, 15, 1),
//   ];
//
//   /**
//    * The scale of this BigDecimal, as returned by {@link #scale}.
//    *
//    * @serial
//    * @see #scale
//    */
//   private scale;
//   private precision;
//   private intCompact;
//   private intVal;
//
//   constructor(intVal,val,scale,prec){
//     super();
//     this.scale = scale;
//     this.precision = prec;
//     this.intCompact = val;
//     this.intVal = intVal;
//   }
//
//   static zeroValueOf(scale):BigDecimal {
//   if (scale >= 0 && scale < this.ZERO_SCALED_BY.length)
//   return this.ZERO_SCALED_BY[scale];
//   else
//   return new BigDecimal(BigInteger.ZERO, 0, scale, 1);
// }
//
//   setScale(newScale: number, roundingMode = ROUND_UNNECESSARY) {
//     if (roundingMode < ROUND_UP || roundingMode > ROUND_UNNECESSARY) {
//       throw new Error("Invalid rounding mode");
//     }
//
//     const oldScale = this.scale;
//     if (newScale == oldScale)        // easy case
//       return this;
//     if (this.signum() == 0)            // zero can have any scale
//       return zeroValueOf(newScale);
//     if(this.intCompact!=INFLATED) {
//       long rs = this.intCompact;
//       if (newScale > oldScale) {
//         int raise = checkScale((long) newScale - oldScale);
//         if ((rs = longMultiplyPowerTen(rs, raise)) != INFLATED) {
//           return valueOf(rs,newScale);
//         }
//         BigInteger rb = bigMultiplyPowerTen(raise);
//         return new BigDecimal(rb, INFLATED, newScale, (precision > 0) ? precision + raise : 0);
//       } else {
//         // newScale < oldScale -- drop some digits
//         // Can't predict the precision due to the effect of rounding.
//         int drop = checkScale((long) oldScale - newScale);
//         if (drop < LONG_TEN_POWERS_TABLE.length) {
//           return divideAndRound(rs, LONG_TEN_POWERS_TABLE[drop], newScale, roundingMode, newScale);
//         } else {
//           return divideAndRound(this.inflated(), bigTenToThe(drop), newScale, roundingMode, newScale);
//         }
//       }
//     } else {
//       if (newScale > oldScale) {
//         int raise = checkScale((long) newScale - oldScale);
//         BigInteger rb = bigMultiplyPowerTen(this.intVal,raise);
//         return new BigDecimal(rb, INFLATED, newScale, (precision > 0) ? precision + raise : 0);
//       } else {
//         // newScale < oldScale -- drop some digits
//         // Can't predict the precision due to the effect of rounding.
//         int drop = checkScale((long) oldScale - newScale);
//         if (drop < LONG_TEN_POWERS_TABLE.length)
//           return divideAndRound(this.intVal, LONG_TEN_POWERS_TABLE[drop], newScale, roundingMode,
//             newScale);
//         else
//           return divideAndRound(this.intVal,  bigTenToThe(drop), newScale, roundingMode, newScale);
//       }
//     }
//   }
// }
