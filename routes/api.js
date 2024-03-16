'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const sudoku = new SudokuSolver();

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let validInput = sudoku.validate(req.body.puzzle);

      if (!req.body.coordinate || !req.body.value || !req.body.puzzle) {return res.json({ error: 'Required field(s) missing' });}
      if (validInput.error) {return res.json(validInput);}

      let coords = req.body.coordinate.toUpperCase();
      let row = coords.charCodeAt(0) - 64;
      let column = parseInt(coords[1]);
      let value = parseInt(req.body.value);
      let conflict = [];
      
      if (coords.length != 2 
          || row < 1 
          || row > 9 
          || isNaN(column)
          || column < 1
          || column > 9) {
        return res.json({ error: 'Invalid coordinate' });
      }
      if (isNaN(req.body.value) || value < 1 || value > 9) {
        return res.json({ error: 'Invalid value' });
      }
      if (!sudoku.checkRowPlacement(req.body.puzzle, row, column, value)) {
        conflict.push("row");
      }
      if (!sudoku.checkColPlacement(req.body.puzzle, row, column, value)) {
        conflict.push("column");
      }
      if (!sudoku.checkRegionPlacement(req.body.puzzle, row, column, value)) {
        conflict.push("region");
      }

      if (req.body.puzzle[(row - 1) * 9 + column - 1] != "." && req.body.puzzle[(row - 1) * 9 + column - 1] == value) {
        res.json({ valid: true })
      } else if (conflict.length != 0) {
        res.json({ valid: false, conflict })
      } else {
        res.json({ valid: true })
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let validInput = sudoku.validate(req.body.puzzle);
      if (validInput.error) {return res.json(validInput);}
                             
      let solution = sudoku.solve(req.body.puzzle);
      if (solution.error) {return res.json({ error: 'Puzzle cannot be solved' });}
      res.send({ solution });
    });
};
