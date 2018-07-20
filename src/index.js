const ESC = '\x1B';

let debugMode = false;
let lastMove = null;

export function startDebugging(shouldDebug) {
  debugMode = shouldDebug;
}

/**
 * @constant
 *
 * @type {string[]}
 */
export const IMAGE_TYPES = ['fgl', 'pcx', 'bmp'];

function checkRange(name, value, min, max) {
  if (value < min || value > max) throw new Error(`${name} must be between ${min} and ${max}`);
}

function checkType(name, value, types) {
  if (!types.includes(value)) throw new Error(`${name} must be one of ${types.join(', ')}`);
}

function formatCmd(format) {
  return format == 'fgl' ? '' : cmd(format);
}

/**
 * Print a generic FGL command
 * @param {string} string The command string, excluding the brackets
 * @param {string} [text] Text to encode immediately after the command
 * @returns {string}
 */
export function cmd(string, text) {
  if (text) {
    return `<${string}>${text}`;
  } else {
    return `<${string}>`;
  }
}

/**
 * Set the rotation
 * @param {number} deg May be 0, 90, 180 or 270
 * @returns {string}
 */
export function rotate(deg) {
  let string = 'NR';
  switch (deg) {
    case 90:
      string = 'RR';
      break;
    case 180:
      string = 'RU';
      break;
    case -90:
    case 270:
      string = 'RL';
      break;
  }

  return cmd(string);
}

/**
 * @param {number} row
 * @param {number} col
 * @returns {string}
 */
export function move(row, col) {
  lastMove = `${row},${col}`;
  return cmd(`RC${row},${col}`);
}

/**
 * @param {number} w
 * @param {number} h
 * @returns {string}
 */
export function boxSize(w, h) {
  return cmd(`BS${w},${h}`);
}

function fontHeightWidth(h, w) {
  return cmd(`HW${h},${w}`);
}

// <F1>  Font1 characters (5x7)
// <F2>  Font2 characters (8x16)
// <F3>  OCRB (17x31)
// <F4>  OCRA (5x9)
// <F6>  large OCRB (30x52)
// <F7>  OCRA (15x29)
// <F8>  Courier (20x40)(20x33)
// <F9>  small OCRB (13x20)
// <F10> Prestige (25x41)
// <F11> Script (25x49)
// <F12> Orator (46x91)
// <F13> Courier (20x40)(20X42)

/**
 * Use an internal font, optionally setting the height and width
 *
 * If height and width are provided we automatically send a <HW1,1> after the
 * text to reset the font size.
 *
 * The text param can take a callback function, useful for centering text.
 *
 * @example
 * f.useFont(2, f.alignCenter('Justified Text', 1000), 2, 2)
 *
 * @param {number} id Font ID
 * @param {string} [text='']
 * @param {number} [h] Height
 * @param {number} [w] Width
 * @returns {string}
 */
export function useFont(id, text = '', h, w) {
  const sizeCmd = h ? fontHeightWidth(h, w) : '';
  const resetSizeCmd = h ? fontHeightWidth(1, 1) : '';
  const debugString = debugMode ? `${lastMove},F${id},${h || 1}${w || 1}` : '';

  return sizeCmd + cmd(`F${id}`) + text + resetSizeCmd + debugString;
}

/**
 * @param {number} id ID for identifying the font
 * @param {string} bytes Hex-encoded bytes
 * @returns {string}
 */
export function uploadTTF(id, bytes) {
  checkRange('id', id, 0, 511);

  return cmd(`ID${id}`) + cmd(`ttf${bytes.length}`) + bytes;
}

/**
 * Start using an uploaded TTF font
 * @param {number} id Font ID
 * @param {number} size Font size
 * @returns {string}
 */
export function useTTF(id, size) {
  return cmd(`TTF${id},${size}`);
}

/**
 * @param {number} id ID for identifying the logo
 * @param {string} bytes Hex-encoded bytes
 * @param {string} [format=fgl]
 * @returns {string}
 */
export function uploadImageLogo(id, bytes, format = 'fgl') {
  checkRange('id', id, 0, 511);
  checkType('format', format, IMAGE_TYPES);

  return (
    ESC +
    cmd(`ID${id}`) +
    move(0, 0) +
    formatCmd(format) +
    cmd(`G${bytes.length}`) +
    bytes +
    move(0, 0) +
    ESC
  );
}

/**
 * Create a text-based logo
 * @param {...string} cmds The commands that make up the text logo
 * @todo does this accept an ID?
 * @returns {string}
 */
export function uploadTextLogo() {
  return ESC + Array.prototype.join.call(arguments, '') + ESC;
}

/**
 * @param {number} id
 * @param {number} row
 * @param {number} col
 * @param {string} [format='fgl']
 * @returns {string}
 */
export function printLogo(id, row, col, format = 'fgl') {
  checkType('format', format, IMAGE_TYPES);
  return cmd(`SP${row},${col}`) + formatCmd(format) + cmd(`LD${id}`);
}

function barcodeExpansion(expansion) {
  return expansion ? cmd(`X${expansion}`) : '';
}

// const QR_VERSIONS = [2, 7, 11, 15];

/**
 * @param {string} data The data to encode
 * @param {number} [size=3]
 * @param {boolean} [applyTilde=false]
 * @param {number} [encodeMode=0] 0-2
 * @param {number} [errorCorrection=0] 0-3
 * @returns {string}
 */
export function qrCode(data, size = 3, applyTilde = false, encodeMode = 0, errorCorrection = 0) {
  //export function qrCode(data, size = 3, applyTilde = false, encodeMode = 0, errorCorrection = 0) {
  checkRange('size', size, 3, 16);
  checkRange('encodeMode', encodeMode, 0, 2);
  checkRange('errorCorrection', errorCorrection, 0, 3);

  return cmd(`QR${size},${applyTilde ? 0 : 1},${errorCorrection},`, data);
}

/**
 * @param {string} data The data to encode
 * @param {boolean} [ladder=true] Ladder or picket-fence orientation
 * @param {number} [height=4]
 * @param {number} [expansion]
 * @returns {string}
 */
export function code128(data, ladder = true, height = 4, expansion) {
  const orientation = ladder ? 'L' : 'P';

  return barcodeExpansion(expansion) + cmd(`o${orientation}${height}`) + data;
}

/**
 * @param {string} data The data to encode
 * @param {boolean} [ladder=true] Ladder or picket-fence orientation
 * @param {number} [height=4]
 * @param {number} [expansion]
 * @returns {string}
 */
export function code39(data, ladder = true, height = 4, expansion) {
  const orientation = ladder ? 'L' : 'P';
  return barcodeExpansion(expansion) + cmd(`n${orientation}${height}`) + data;
}

/**
 * @returns {string}
 */
export function barcodeInterpretation() {
  return cmd('BI');
}

// 0 - white
// 1 - very light course dot pattern
// 2 - light course dot pattern
// 3 - light - medium course dot pattern
// 4 - medium course dot pattern
// 5 - dark - medium course dot pattern
// 6 - dark course dot pattern
// 7 - open
// 8 - open
// 9 - black
// 10 - white
// 11 - very light fine dot pattern
// 12 - light fine dot pattern
// 13 - light - medium fine dot pattern
// 14 - medium fine dot pattern
// 15 - dark - medium fine dot pattern
// 16 - dark fine dot pattern
// 17 - open
// 18 - open
// 19 - black
// 20 - vertical lines
// 21 - horizontal lines
// 22 - forward diagonal lines
// 23 - backward diagonal lines
// 24 - square grid
// 25 - diagonal grid

/**
 * Set the shading pattern
 * @param {string} data
 * @param {number} [id=14]
 * @param {boolean} [background=true]
 * @returns {string}
 */
export function shadingPattern(data, id = 14, background = true) {
  checkRange('id', id, 0, 25);
  return cmd(`PA${background ? 'B' : 'F'}`) + cmd(`PA${id}`) + cmd('ES') + data, cmd('DS');
}

function lineThicknessCmd(lineThickness) {
  return lineThickness ? cmd(`LT${lineThickness}`) : '';
}

/**
 * @param {number} w
 * @param {number} h
 * @param {number} lineThickness
 * @returns {string}
 */
export function drawBox(w, h, lineThickness) {
  return lineThicknessCmd(lineThickness) + cmd(`BX${w},${h}`);
}

/**
 * @param {number} size
 * @param {number} lineThickness
 * @returns {string}
 */
export function horizontalLine(size, lineThickness) {
  return lineThicknessCmd(lineThickness) + cmd(`HX${size}`);
}

/**
 * @param {number} size
 * @param {number} lineThickness
 * @returns {string}
 */
export function verticalLine(size, lineThickness) {
  return lineThicknessCmd(lineThickness) + cmd(`VX${size}`);
}

/**
 * Print the ticket
 * @param {boolean} cut Print and cut or just print?
 * @returns {string}
 */
export function print(cut = false) {
  return cmd(cut ? 'q' : 'p');
}

/**
 * Print the ticket and hold
 * @param {boolean} cut Print and cut or just print?
 * @returns {string}
 */
export function printAndHold(cut) {
  return cmd(cut ? 'h' : 'r');
}

/**
 * Print the current ticket count
 * @returns {string}
 */
export function ticketCount() {
  return cmd('PC');
}

/**
 * Set the number of tickets to print
 * @param {count}
 * @returns {string}
 */
export function setTicketCount(count) {
  // left-pad!!
  return cmd(`TC${count.toString().padStart(7, '0')}`);
}

/**
 * Print alignCenter text
 * @param {string} text
 * @param {number} fieldWidth
 * @returns {string}
 */
export function alignCenter(text, fieldWidth) {
  return cmd(`CTR${fieldWidth}`) + `~${text}~`;
}

/**
 * Print right-justified text
 * @param {string} text
 * @param {number} fieldWidth
 * @returns {string}
 */
export function alignRight(text, fieldWidth) {
  return cmd(`RTJ${fieldWidth}`) + `~${text}~`;
}

/**
 * Print a line
 * @param {...string} cmds The commands to print on the line
 * @returns {string}
 */
export function line() {
  return Array.prototype.join.call(arguments, '') + '\n';
}
