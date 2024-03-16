const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const puzzleStrings = require('../controllers/puzzle-strings.js');
const puzzles = puzzleStrings.puzzlesAndSolutions;
let solver = new Solver();

suite('UnitTests', () => {
  test('Logic handles a valid puzzle string of 81 characters', function () {
    const solution = solver.validate(puzzles[0][0]);
    assert.notProperty(solution, "error");
    assert.isTrue(solution);
  });

  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function () {
    const solution = solver.validate("a" + puzzles[0][0].slice(1));
    assert.property(solution, "error");
    assert.equal(solution.error, "Invalid characters in puzzle");
  });

  test('Logic handles a puzzle string that is not 81 characters in length', function () {
    const solution = solver.validate("1" + puzzles[0][0]);
    assert.property(solution, "error");
    assert.equal(solution.error, "Expected puzzle to be 81 characters long");
  });

  test('Logic handles a valid row placement', function () {
    const solution = solver.checkRowPlacement(puzzles[0][0], 1, 2, 9);
    assert.isTrue(solution);
  });

  test('Logic handles an invalid row placement', function () {
    const solution = solver.checkRowPlacement(puzzles[0][0], 1, 2, 1);
    assert.isFalse(solution);
  });

  test('Logic handles a valid column placement', function () {
    const solution = solver.checkColPlacement(puzzles[0][0], 1, 2, 3);
    assert.isTrue(solution);
  });

  test('Logic handles an invalid column placement', function () {
    const solution = solver.checkRowPlacement(puzzles[0][0], 2, 1, 7);
    assert.isFalse(solution);
  });

  test('Logic handles a valid region (3x3 grid) placement', function () {
    const solution = solver.checkRegionPlacement(puzzles[0][0], 1, 2, 8);
    assert.isTrue(solution);
  });

  test('Logic handles an invalid region (3x3 grid) placement', function () {
    const solution = solver.checkRegionPlacement(puzzles[0][0], 1, 2, 5);
    assert.isFalse(solution);
  });

  test('Valid puzzle strings pass the solver', function () {
    const solution = solver.solve(puzzles[0][0]);
    assert.notProperty(solution, "error");
    assert.lengthOf(solution, 81);
    assert.notInclude(solution, ".");
  });

  test('Invalid puzzle strings fail the solver', function () {
    const solution = solver.solve("11" + puzzles[0][0].slice(2));
    assert.property(solution, "error");
    assert.equal(solution.error, "Puzzle cannot be solved");
  });

  test('Solver returns the expected solution for an incomplete puzzle', function () {
    const solution = solver.solve(puzzles[0][0]);
    assert.notProperty(solution, "error");
    assert.lengthOf(solution, 81);
    assert.equal(solution, puzzles[0][1]);
  })

});
