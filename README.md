# Sudoku Solver

- This API receives as input a string with 81 digits (or ".") and solves the sudoku game by filling dots with numbers following sudoku rules.

- Since this is a backend pactice, the interface is just for testing and provided by FreeCodeCamp. 

Technologies used: Javascript, NodeJS, ChaiJS

# Live Version

![image](./images/preview.png)

# Running Locally

To run this locally, run the following commands in a terminal:

```
npm install
npm start
```

# Requirements

- All puzzle logic can go into /controllers/sudoku-solver.js
- The validate function should take a given puzzle string and check it to see if it has 81 valid characters for the input.
- The check functions should be validating against the current state of the board.
- The solve function should handle solving any given valid puzzle string, not just the test inputs and solutions. You are expected to write out the logic to solve this.

Write the following tests in tests/1_unit-tests.js:

- Logic handles a valid puzzle string of 81 characters
- Logic handles a puzzle string with invalid characters (not 1-9 or .)
- Logic handles a puzzle string that is not 81 characters in length
- Logic handles a valid row placement
- Logic handles an invalid row placement
- Logic handles a valid column placement
- Logic handles an invalid column placement
- Logic handles a valid region (3x3 grid) placement
- Logic handles an invalid region (3x3 grid) placement
- Valid puzzle strings pass the solver
- Invalid puzzle strings fail the solver
- Solver returns the expected solution for an incomplete puzzle

Write the following tests in tests/2_functional-tests.js:

- Solve a puzzle with valid puzzle string: POST request to /api/solve
- Solve a puzzle with missing puzzle string: POST request to /api/solve
- Solve a puzzle with invalid characters: POST request to /api/solve
- Solve a puzzle with incorrect length: POST request to /api/solve
- Solve a puzzle that cannot be solved: POST request to /api/solve
- Check a puzzle placement with all fields: POST request to /api/check
- Check a puzzle placement with single placement conflict: POST request to /api/check
- Check a puzzle placement with multiple placement conflicts: POST request to /api/check
- Check a puzzle placement with all placement conflicts: POST request to /api/check
- Check a puzzle placement with missing required fields: POST request to /api/check
- Check a puzzle placement with invalid characters: POST request to /api/check
- Check a puzzle placement with incorrect length: POST request to /api/check
- Check a puzzle placement with invalid placement coordinate: POST request to /api/check
- Check a puzzle placement with invalid placement value: POST request to /api/check

Other requirements:

- You can POST /api/solve with form data containing puzzle which will be a string containing a combination of numbers (1-9) and periods . to represent empty spaces. The returned object will contain a solution property with the solved puzzle.
- If the object submitted to /api/solve is missing puzzle, the returned value will be { error: 'Required field missing' }
- If the puzzle submitted to /api/solve contains values which are not numbers or periods, the returned value will be { error: 'Invalid characters in puzzle' }
- If the puzzle submitted to /api/solve is greater or less than 81 characters, the returned value will be { error: 'Expected puzzle to be 81 characters long' }
- If the puzzle submitted to /api/solve is invalid or cannot be solved, the returned value will be { error: 'Puzzle cannot be solved' }
- You can POST to /api/check an object containing puzzle, coordinate, and value where the coordinate is the letter A-I indicating the row, followed by a number 1-9 indicating the column, and value is a number from 1-9.
- The return value from the POST to /api/check will be an object containing a valid property, which is true if the number may be placed at the provided coordinate and false if the number may not. If false, the returned object will also contain a conflict property which is an array containing the strings "row", "column", and/or "region" depending on which makes the placement invalid.
- If value submitted to /api/check is already placed in puzzle on that coordinate, the returned value will be an object containing a valid property with true if value is not conflicting.
- If the puzzle submitted to /api/check contains values which are not numbers or periods, the returned value will be { error: 'Invalid characters in puzzle' }
- If the puzzle submitted to /api/check is greater or less than 81 characters, the returned value will be { error: 'Expected puzzle to be 81 characters long' }
- If the object submitted to /api/check is missing puzzle, coordinate or value, the returned value will be { error: 'Required field(s) missing' }
- If the coordinate submitted to api/check does not point to an existing grid cell, the returned value will be { error: 'Invalid coordinate'}
- If the value submitted to /api/check is not a number between 1 and 9, the returned value will be { error: 'Invalid value' }
- All 12 unit tests are complete and passing.
- All 14 functional tests are complete and passing.