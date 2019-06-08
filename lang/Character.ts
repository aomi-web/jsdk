/**
 * @author Sean sean.snow@live.com
 * @date 2015/12/27
 */


export class Character {

  static MIN_RADIX = 2;
  static MAX_RADIX = 36;


  /**
   * Determines the character representation for a specific digit in
   * the specified radix. If the value of {@code radix} is not a
   * valid radix, or the value of {@code digit} is not a valid
   * digit in the specified radix, the null character
   * ({@code '\u005Cu0000'}) is returned.
   * <p>
   * The {@code radix} argument is valid if it is greater than or
   * equal to {@code MIN_RADIX} and less than or equal to
   * {@code MAX_RADIX}. The {@code digit} argument is valid if
   * {@code 0 <= digit < radix}.
   * <p>
   * If the digit is less than 10, then
   * {@code '0' + digit} is returned. Otherwise, the value
   * {@code 'a' + digit - 10} is returned.
   *
   * @param   digit   the number to convert to a character.
   * @param   radix   the radix.
   * @return String  the {@code char} representation of the specified digit
   *          in the specified radix.
   * @see     Character#MIN_RADIX
   * @see     Character#MAX_RADIX
   * @see     Character#digit(String, Number)
   */
  static forDigit(digit: number, radix: number): String {
    if ((digit >= radix) || (digit < 0)) {
      return '\0';
    }
    if ((radix < Character.MIN_RADIX) || (radix > Character.MAX_RADIX)) {
      return '\0';
    }
    if (digit < 10) {
      return String.fromCharCode('0'.charCodeAt(0) + digit);
    }
    return String.fromCharCode('a'.charCodeAt(0) - 10 + digit);
  }


}
