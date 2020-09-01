const { describe, expect, test } = require('@jest/globals');
const Logs = require('./logs');

describe('Testing transformToReadableString(square, value)', () => {
  test('square 0 with X return as aspected', async () => {
    const str = await Logs.transformToReadableString(0, 'X');
    expect(str).toMatch('X was placed in the upper left position');
  });

  test('square 8 with O return as aspected', async () => {
    const str = await Logs.transformToReadableString(8, 'O');
    expect(str).toMatch('O was placed in the lower right position');
  });

  test('square 5 with X return as aspected', async () => {
    const str = await Logs.transformToReadableString(5, 'X');
    expect(str).toMatch('X was placed in the middle right position');
  });

  test('square 3 with O return as aspected', async () => {
    const str = await Logs.transformToReadableString(3, 'O');
    expect(str).toMatch('O was placed in the middle left position');
  });

  test('square 10 with J throws an error', async () => {
    await expect(Logs.transformToReadableString(10, 'J')).rejects.toThrow('square out of reach');
  });

  test('square -1 with X throws an error', async () => {
    await expect(Logs.transformToReadableString(-1, 'X')).rejects.toThrow('square out of reach');
  });

  test('square 3 with A throws an error', async () => {
    await expect(Logs.transformToReadableString(3, 'A')).rejects.toThrow('value not X or O');
  });

  test('square E with A throws an error', async () => {
    await expect(Logs.transformToReadableString('E', 'A')).rejects.toThrow('square out of reach');
  });

  test('square 3 with 4 throws an error', async () => {
    await expect(Logs.transformToReadableString(3, 4)).rejects.toThrow('value not X or O');
  });
});

describe('Testing checkForWinner(squares)', () => {
  test('all squares are null - no win', async () => {
    const squares = Array(9).fill(null);
    const result = await Logs.checkForWinner(squares);
    expect(result).toBeNull();
  });

  test('all squares are X (impossible game mechanic) - throw error', async () => {
    const squares = Array(9).fill('X');
    await expect(Logs.checkForWinner(squares)).rejects.toThrowError();
  });

  test('all squares are O (impossible game mechanic) - throw error', async () => {
    const squares = Array(9).fill('O');
    await expect(Logs.checkForWinner(squares)).rejects.toThrowError();
  });

  test('squares are mixed - O is winner', async () => {
    const squares = [
      'X', 'O', 'O',
      'X', 'O', 'X',
      'O', 'X', null,
    ];
    const result = await Logs.checkForWinner(squares);
    expect(result).toMatch('O');
  });

  test('squares are mixed - X is winner', async () => {
    const squares = [
      'X', 'O', 'O',
      'X', 'O', 'X',
      'X', null, null,
    ];
    const result = await Logs.checkForWinner(squares);
    expect(result).toMatch('X');
  });

  test('game is finished without a winner - no win', async () => {
    const squares = [
      'X', 'O', 'X',
      'X', 'O', 'X',
      'O', 'X', 'O',
    ];
    const result = await Logs.checkForWinner(squares);
    expect(result).toBeNull();
  });

  test('game contains other values besides X or O (impossible game mechanic) - throw error', async () => {
    const squares = [
      'X', 'E', 'X',
      'X', 'O', 'X',
      'O', 'X', 'O',
    ];
    await expect(Logs.checkForWinner(squares)).rejects.toThrowError();
  });

  test('game contains more than 9 elements (impossible game mechanic) - throw error', async () => {
    const squares = [
      'X', 'O', 'X',
      'X', 'O', 'X',
      'O', 'X', 'O', 'X',
    ];
    await expect(Logs.checkForWinner(squares)).rejects.toThrowError();
  });
});

describe('Testing containsOnly(arr1, arr2)', () => {
  test('array1 does not contain one array2 element', () => {
    expect(Logs.containsOnly([null, 1, 1], [null, 1, 2])).toBeFalsy();
  });

  test('array1 contains no elements from array 2', () => {
    expect(Logs.containsOnly([null, null, null, null], [1, 2, 3])).toBeFalsy();
  });

  test('array1 contains all elements from array 2', () => {
    expect(Logs.containsOnly([1, 2, 3, 1, 3, 4], [1, 2, 3, 4])).toBeTruthy();
  });
});

describe('Testing countFrequency(array)', () => {
  test('counting array element frequency [1, 1, 1, 1, 1]', () => {
    const count = Logs.countFrequency([1, 1, 1, 1, 1]);
    expect(count[1]).toBe(5);
  });

  test('counting array element frequency [2, 2, 2]', () => {
    const count = Logs.countFrequency([2, 2, 2]);
    expect(count[2]).toBe(3);
  });

  test('counting array element 1 frequency [1, 1, 2, 3, 3, 3, 3, 4]', () => {
    const count = Logs.countFrequency([1, 1, 2, 3, 3, 3, 3, 4]);
    expect(count[1]).toBe(2);
  });

  test('counting array element 2 frequency [1, 1, 2, 3, 3, 3, 3, 4]', () => {
    const count = Logs.countFrequency([1, 1, 2, 3, 3, 3, 3, 4]);
    expect(count[2]).toBe(1);
  });

  test('counting array element 3 frequency [1, 1, 2, 3, 3, 3, 3, 4]', () => {
    const count = Logs.countFrequency([1, 1, 2, 3, 3, 3, 3, 4]);
    expect(count[3]).toBe(4);
  });

  test('counting array element 4 frequency [1, 1, 2, 3, 3, 3, 3, 4]', () => {
    const count = Logs.countFrequency([1, 1, 2, 3, 3, 3, 3, 4]);
    expect(count[4]).toBe(1);
  });
});
