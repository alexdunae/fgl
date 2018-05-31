/* global test expect */
import { run } from './index';

test('first', () => {
  run();
  expect(1).toBeDefined();
});
