/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/27
 */
export class Arrays {

  static copyOf(original: Array<any>, newLength: number): Array<any> {
    let copy = new Array(newLength);
    Arrays.arraycopy(original, 0, copy, 0, Math.min(original.length, newLength));
    return copy;
  }

  static arraycopy(src: Array<any>, srcPos: number, dest: Array<any>, destPos: number, length: number) {
    let tmp = src.slice(srcPos);
    for (let i = destPos; i < destPos + length; i++) {
      dest[i] = tmp[i - destPos];
    }
  }

  /**
   * 笛卡尔积
   */
  static cartesian(arr: Array<any>) {
    if (arr.length < 2) {
      return arr[0] || [];
    }
    return [].reduce.call(arr, function (col, set) {
      let res = [];
      col.forEach(c => {
        set.forEach(s => {
          let t = [].concat(Array.isArray(c) ? c : [c]);
          t.push(s);
          res.push(t);
        });
      });
      return res;
    });
  }
}

