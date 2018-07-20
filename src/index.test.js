/* global test expect */
import * as f from './index';

function printRun(ticketNumbers) {
  const cmds = [];
  const ticketCount = ticketNumbers.length;

  ticketNumbers.forEach((ticketNumber, i) => {
    cmds.push(ticket(ticketNumber));

    if (i == ticketCount - 1) {
      cmds.push(f.print(false));
    } else {
      cmds.push(f.print(false));
    }
  });

  return cmds.join('') + '\x1A';
}

//TTF1 = Open Sans Regular
//TTF2 = Open Sans Bold Condensed
//TTF3 = Open Sans Light

function ticket(ticketNumber) {
  const bodyWidth = 1125;
  const bodyGutter = 50;
  const qrTop = 140;
  const stubStart = 1275;
  // const stubHeight =
  const qrEdge = 300;
  // const stubWidth = 400;
  const rotateLeftEdge = 550;
  const rotateWidth = 500;
  const rotateStubTop = 1275;
  const eventTitle = 'The New Pornographers with Neko Case';
  const ticketTitle = 'Early Bird Special - Balcony';

  const SEAT_TOP = 365;
  const SEAT_DETAIL_TOP = SEAT_TOP + 30;

  return [
    f.rotate(0),
    // f.rotate(-90), f.move(500, 50), f.useFont(10, 'TICKIT'),
    // f.rotate(0), f.move(30, 300), f.useFont(2, '30,300 Event Title Goes Here'),
    // f.move(60, 300), f.useFont(2, '60,300 Font2 Unmodified'),
    f.move(40, bodyGutter),
    // f.
    // f.useFont(2, f.alignCenter(`Villager Events Presents`, bodyWidth), 2, 2),
    f.useTTF(1, 9, f.alignCenter(`Villager Events Presents`, bodyWidth)),
    f.move(50, bodyGutter),
    f.horizontalLine(bodyWidth, 4),

    f.move(130, bodyGutter),
    f.useTTF(3, 12, f.alignCenter(eventTitle, bodyWidth), 1, 1),
    // f.useFont(3, f.alignCenter(eventTitle, bodyWidth), 1, 1),

    f.move(190, bodyGutter),
    // f.useFont(3, f.alignCenter(`${ticketTitle}`, bodyWidth)),
    f.useTTF(3, 12, f.alignCenter(`${ticketTitle}`, bodyWidth)),

    f.move(250, bodyGutter),
    f.useTTF(3, 9, f.alignCenter(`December 31, 2018 at 8pm`, bodyWidth)),
    // f.useFont(3, f.alignCenter(`December 31, 2018 at 8pm`, bodyWidth)),
    // f.move(300, bodyGutter),
    // f.useTTF(1, 20, `December 31, 2018 at 8pm`),

    f.move(305, bodyGutter),
    // f.useTTF(3, 20, `December 31, 2018 at 8pm`),
    f.useTTF(1, 9, f.alignCenter(`Amazeballs Venue, Vancouver, BC`, bodyWidth)),

    // f.move(300, bodyGutter),
    // f.useFont(11, f.alignCenter(`${ticketTitle}`, bodyWidth)),

    f.move(460, bodyGutter),
    f.useTTF(
      3,
      6,
      f.alignCenter(
        `Verify or register this ticket at https://tickit.ca/reg/AEAB9D57E01D78`,
        bodyWidth
      ),
      1,
      1
    ),
    // f.useFont(
    //   2,
    //   f.alignCenter(
    //     `Verify or register this ticket at https://tickit.ca/reg/aeab9d57e01d78`,
    //     bodyWidth
    //   ),
    //   1,
    //   1
    // ),

    f.move(515, bodyGutter),
    f.useTTF(
      3,
      6,
      f.alignCenter(
        `All sales are final. No refunds or exchanges. All outdoor mainstage concerts proceed rain or shine!`,
        bodyWidth
      ),
      1,
      1
    ),
    // f.useFont(
    //   2,
    //   f.alignCenter(
    //     `All sales are final. No refunds or exchanges. All outdoor mainstage concerts proceed rain or shine!`,
    //     bodyWidth
    //   ),
    //   1,
    //   1
    // ),

    // f.move(400, bodyGutter),
    // f.useFont(12, f.alignCenter(`${ticketTitle}`, bodyWidth)),

    // f.move(500, bodyGutter),
    // f.useFont(13, f.alignCenter(`${ticketTitle}`, bodyWidth)),

    f.move(SEAT_TOP, bodyGutter),
    f.useTTF(1, 8, 'Row'),

    f.move(SEAT_DETAIL_TOP, bodyGutter),
    f.useTTF(2, 15, 'AA'),

    f.move(SEAT_TOP, bodyGutter + 130),
    f.useTTF(1, 8, 'Seat'),

    f.move(SEAT_DETAIL_TOP, bodyGutter + 130),
    f.useTTF(2, 15, '88'),

    f.move(SEAT_TOP, bodyGutter + 260),
    f.useTTF(1, 8, 'Section'),

    f.move(SEAT_DETAIL_TOP, bodyGutter + 260),
    f.useTTF(2, 15, 'Orchestra'),

    f.move(SEAT_TOP, bodyGutter + 600),
    f.useTTF(1, 8, 'Ticket #'),

    f.move(SEAT_DETAIL_TOP, bodyGutter + 600),
    f.useTTF(2, 15, ticketNumber),

    // f.move(SEAT_TOP, bodyGutter),
    // f.useFont(2, 'Row', 2, 2),

    // f.move(SEAT_DETAIL_TOP, bodyGutter),
    // f.useFont(2, 'AA', 3, 3),

    // f.move(SEAT_TOP, bodyGutter + 130),
    // f.useFont(2, 'Seat', 2, 2),

    // f.move(SEAT_DETAIL_TOP, bodyGutter + 130),
    // f.useFont(2, '88', 3, 3),

    // f.move(SEAT_TOP, bodyGutter + 260),
    // f.useFont(2, 'Section', 2, 2),

    // f.move(SEAT_DETAIL_TOP, bodyGutter + 260),
    // f.useFont(2, 'Orchestra', 3, 3),

    // f.move(350, bodyGutter),
    // f.useFont(3, f.alignCenter(`${ticketTitle}`, bodyWidth), 2, 2),

    f.useFont(1, '', 1, 1),
    f.move(qrTop, stubStart + 10),
    f.qrCode(ticketNumber, 6),

    f.move(rotateStubTop + 100, stubStart),
    // f.useFont(2, f.alignCenter(ticketNumber, qrEdge), 2, 2),
    // f.move(qrTop + qrEdge + 100, stubStart),

    f.rotate(-90),
    // f.move(rotateLeftEdge, 50),
    // f.useFont(2, f.alignCenter('Some text ', rotateWidth), 2, 2),

    // f.move(50, rotateStubTop),
    // f.verticalLine(rotateWidth, 2),

    f.move(rotateLeftEdge, rotateStubTop + qrEdge + 20),
    f.useFont(1, f.alignCenter(ticketNumber, rotateWidth), 2, 2),

    f.move(rotateLeftEdge, rotateStubTop + qrEdge + 60),
    f.useFont(1, f.alignCenter(ticketTitle, rotateWidth), 1, 1)

    // f.move(rotateLeftEdge, rotateStubTop - 200),
    // f.useFont(2, f.alignCenter('Some text ', rotateWidth), 2, 2),

    // f.useFont(2, 'Some text, 600, 50 '),
    // f.move(600, 500),
    // f.useFont(2, 'Some text, 600, 500 '),
    // f.move(50, 500),
    // f.useFont(2, 'Some text, 50, 500 ')

    // f.move(500, 50), f.useFont(6), f.boxSize(26, 44), 'THREE', f.useFont(2), f.boxSize(26, 44), 'PARKS'),
    // f.line(f.move(24, 580), f.drawBox(340, 50, 2)),
    // f.line(f.move(500, 40), f.code128(ticketNumber, true, 10, 2))
  ].join(' ');
}

test('basics', () => {
  expect(
    [f.rotate(-90), f.move(360, 10), f.useFont(3, 'GHOSTWRITER WORLD', 1, 1)].join('')
  ).toEqual('<RL><RC360,10><HW1,1><F3>GHOSTWRITER WORLD<HW1,1>');

  expect(
    [f.useFont(6), f.boxSize(26, 44), 'THREE', f.useFont(2), f.boxSize(26, 44), 'PARKS'].join('')
  ).toEqual('<F6><BS26,44>THREE<F2><BS26,44>PARKS');

  expect([f.move(24, 580), f.drawBox(340, 50, 2)].join('')).toEqual('<RC24,580><LT2><BX340,50>');

  expect([f.move(60, 990), f.code39('*01000407*', true, 10, 2)].join('')).toEqual(
    '<RC60,990><X2><nL10>*01000407*'
  );
});

test('print run', () => {
  console.log(printRun(['1234567-8910-01-A', '1234567-8910-99-A']));
});
