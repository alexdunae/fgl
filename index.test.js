/* global test expect */
import * as f from './index';

('<RC380,76><F6><HW1,1><BS26,44>ALL<F2>');
('<RC348,130><F6><HW1,1><BS42,44>PASSPORT');
('<RC324,240><RL><F6><HW2,2>6');
('<RC210,240><HW1,1>DAY');
('<RC230,290><F3><HW1,1>ADMIT ONE');
('<RC230,320><F6><HW1,1>GUEST');
('<F1><RC230,370><F1><HW1,1>VERY SMALL PRINT');
('<RC24,530><LT2><BX340,50>');
('<RC25,528><LT2><VX338>');
('<RC216,550><HW1,1><F2>DAY  1');
('<RC216,600>DAY  2');
('<RC24,630><LT2><BX340,50>');
('<RC216,650>DAY  3');
('<RC24,680><LT2><BX340,50>');
('<RC216,700>DAY  4');
('<RC24,730><LT2><BX340,50>');
('<RC25,780><LT2><VX338>');
('<RC216,760>DAY  5');
('<RC340,400><RL><F6><BS36,44><HW1,1>DAY GUEST');
('<RC260,450><F3><HW1,1>$112.00');
('<RC240,482><F3>PLUS TAX');
('<RC280,1010><F3><HW1,1>12345678');
('<RC360,820><F9><HW1,1>VALID ONLY ON DATE STAMPED');
('NONTRANSFERABLE NONREFUNDABLE');
('<RC280,870><F3><HW1,1>01000407');
('<RC20,1079><RR><F3><HW1,1>GHOSTWRITER WORLD');

test('basics', () => {
  // f.run();
  expect(
    [f.rotate(-90), f.move(360, 10), f.useFont(3, 'GHOSTWRITER WORLD', 1, 1)].join('')
  ).toEqual('<RL><RC360,10><HW1,1><F3>GHOSTWRITER WORLD');

  expect(
    [f.useFont(6), f.boxSize(26, 44), 'THREE', f.useFont(2), f.boxSize(26, 44), 'PARKS'].join('')
  ).toEqual('<F6><BS26,44>THREE<F2><BS26,44>PARKS');

  expect([f.move(24, 580), f.drawBox(340, 50, 2)].join('')).toEqual('<RC24,580><LT2><BX340,50>');

  expect([f.move(60, 990), f.code39('*01000407*', true, 10, 2)].join('')).toEqual(
    '<RC60,990><X2><nL10>*01000407*'
  );
});
});
