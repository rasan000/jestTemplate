// src/sum.test.ts
import { ReserveInfo, cancellationFlagDetermine } from '../cancellationFlag';

//キャンセル期限日時なし
test('出発日時を過ぎていない場合、キャンセル可能（キャンセル期限日時なし）', () => {
  expect(
    cancellationFlagDetermine(
    {
      departureDateTime: new Date('2021-01-01T10:00:00'),
      cancellationDeadline: null,
      systemTime: new Date('2021-01-01T09:59:00'),
    }
  )).toBe(true);
});

test('出発日時と同じ時間の場合、キャンセル不可（キャンセル期限日時なし）', () => {
  expect(
    cancellationFlagDetermine(
    {
      departureDateTime: new Date('2021-01-01T10:00:00'),
      cancellationDeadline: null,
      systemTime: new Date('2021-01-01T10:00:00'),
    }
  )).toBe(false);
});

//キャンセル期限日時あり
test('キャンセル期限日時を過ぎていない場合、キャンセル可能', () => {
  expect(
    cancellationFlagDetermine(
    {
      departureDateTime: new Date('2021-01-02T10:00:00'),
      cancellationDeadline: new Date('2021-01-01T10:00:00'),
      systemTime: new Date('2021-01-01T09:59:59'),
    }
  )).toBe(true);
});

test('キャンセル期限日時と同じ時間の場合、キャンセル不可', () => {
  expect(
    cancellationFlagDetermine(
    {
      departureDateTime: new Date('2021-01-02T10:00:00'),
      cancellationDeadline: new Date('2021-01-01T10:00:00'),
      systemTime: new Date('2021-01-01T010:00:00'),
    }
  )).toBe(false);
});

test('出発日時を過ぎている場合、キャンセル期限日時に関わらずキャンセル不可', () => {
  expect(
    cancellationFlagDetermine(
    {
      departureDateTime: new Date('2021-01-02T10:00:00'),
      cancellationDeadline: new Date('2021-01-03T10:00:00'),
      systemTime: new Date('2021-01-02T010:00:00'),
    }
  )).toBe(false);
});
