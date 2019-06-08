

/**
 * @author 田尘殇Sean(sean.snow@live.com) create at 2017/12/21
 */
export class BigInteger extends Number {

  static ZERO = new BigInteger([0], 0);

  static ONE = BigInteger.valueOf(1);

  static TEN = BigInteger.valueOf(10);

  static MAX_CONSTANT = 16;

  private static posConst = [];
  private static negConst = [];

  constructor(magnitude?: any, signum?: any) {
    super();
  }

  
  static valueOf(val): BigInteger {
    if (Array.isArray(val)) {
      return val[0] > 0 ? new BigInteger(val, 1) : new BigInteger(val);
    }
    if (val === 0) {
      return BigInteger.ZERO;
    }
    if (val > 0 && val <= BigInteger.MAX_CONSTANT) {
      return BigInteger.posConst[val];
    } else if (val < 0 && val >= -BigInteger.MAX_CONSTANT) {
      return BigInteger.negConst[-val];
    }

    return new BigInteger(val);
  }

}
