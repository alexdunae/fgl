export function cmd(string, text) {
  if (text) {
    return `<${string}>^${text}^`;
  } else {
    return `<${string}>`;
  }
}

export function move(row, col) {
  return cmd(`RC${row},${col}`);
}

export function boxSize(w, h) {
  return cmd(`BS${w},${h}`);
}

export function logoStartingPoint(y, x) {
  return cmd(`SP${y},${x}`);
}

export function printLogo(id) {
  return cmd(`LD${id}`);
}

export function code128Ladder(data, height = 10) {
  return cmd(`OL${height}`, data);
}

export function code128PicketFence(data, height = 10) {
  return cmd(`OP${height}`, data);
}

// const QR_VERSIONS = [2, 7, 11, 15];

export function qrCode(data, size = 3, applyTilde = false, encodeMode = 0, errorCorrection = 0) {
  if (size < 3 || size > 16) throw new Error('size must be between 3 and 16');
  if (encodeMode < 0 || encodeMode > 2) throw new Error('encodeMode must be between 0 and 2');
  if (errorCorrection < 0 || errorCorrection > 3)
    throw new Error('errorCorrection must be between 3 and 16');

  return cmd(`QR${size},${applyTilde ? 0 : 1},${errorCorrection},`, data);
}

export function drawBox(w, h) {
  return cmd(`BX${w},${h}`);
}

export function fontSize(size = 3) {
  return cmd(`F${size}`);
}

export function barcodeInterpretation() {
  return cmd('BI');
}

export function printCut() {
  return cmd('p');
}

export function printCutHold() {
  return cmd('h');
}

export function printNoCut() {
  return cmd('q');
}

export function printNoCutHold() {
  return cmd('r');
}

export function ticketCount() {
  return cmd('PC');
}

export function setTicketCount(count) {
  // left-pad!!
  return cmd(`TC${count.toString().padStart(7, '0')}`);
}

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

export function run() {
  const cmds = [
    setTicketCount(9),
    move(0, 0),
    fontSize(3),
    boxSize(33, 44),
    rotate(90),
    code128Ladder('12345-6789-0', 9),
    qrCode('12345-6789-0'),
    printCut()
  ];
  console.info(cmds);
}
