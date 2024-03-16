class SudokuSolver {

  validate(puzzleString) {
    const validCharacters = [".", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    if (!puzzleString) {
      return { error: "Required field missing" };
    }
    
    for (let i = 0; i < puzzleString.length; i++) {
      if (!validCharacters.includes(puzzleString[i])) {
        return { error: 'Invalid characters in puzzle' };
      }
    }
    
    if (puzzleString.length != 81) {
      return {error: 'Expected puzzle to be 81 characters long'};
    }

    return true;
  }

  getRow(puzzleString, row) {
    let cut = (row - 1) * 9;
    let rowString = puzzleString.substring(0 + cut, 9 + cut);

    return rowString;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let rowString = this.getRow(puzzleString, row);
    return !rowString.includes(value);
  }

  getColumn (puzzleString, column) {
    let columnString = "";
    
    for (let i = 0; i < 9; i++) {
        columnString += puzzleString[column - 1 + i * 9];
    }
    
    return columnString;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let columnString = this.getColumn(puzzleString, column);
    return !columnString.includes(value);
  }

  getRegion(puzzleString, row, column) {
    let regionString = "";
    let rowSquare;
    let columnSquare;

    if (row <= 3) {
      rowSquare = 0;
    } else if (row <= 6) {
      rowSquare = 1;
    } else {
      rowSquare = 2;
    }

    if (column <= 3) {
      columnSquare = 0;
    } else if (column <= 6) {
      columnSquare = 1;
    } else {
      columnSquare = 2;
    }

    for (let i = 0; i <= 8; i++) {
      let stringPos; 
      if (i < 3) {
        stringPos = rowSquare * 27 + columnSquare * 3 + i;        
      } else if (i < 6) {
        stringPos = rowSquare * 27 + columnSquare * 3 + i - 3 + 9;
      } else {
        stringPos = rowSquare * 27 + columnSquare * 3 + i - 6 + 18;
      }
      regionString += puzzleString[stringPos];
    }

    return regionString;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let regionString = this.getRegion(puzzleString, row, column);
    return !regionString.includes(value);
  }

  write(puzzleString, row, column, value) {
    let index = (row - 1) * 9 + column - 1;
    let newPuzzleString = puzzleString.substring(0, index) + value + puzzleString.substring(index + 1)
    return newPuzzleString;
  }

  solve(puzzleString) {
    let solutionString = puzzleString;
    let previousString;
    let alternativeSolutions = [];
    
    do {
      let blankSpaces = solutionString.split('').map((v, i) => {
        if (v == ".") {return i}
      }).filter(v => v != undefined);
      let possibilities = {};
      previousString = solutionString;

      if (blankSpaces.length === 0) {break;}
      
      for (let i = 0; i < blankSpaces.length; i++) {
        let row = Math.floor(blankSpaces[i] / 9) + 1;
        let column = blankSpaces[i] - 9 * (row - 1) + 1;

        for (let num = 1; num <= 9; num++) {
          if (this.checkRowPlacement(solutionString, row, column, num) 
              && this.checkColPlacement(solutionString, row, column, num) 
              && this.checkRegionPlacement(solutionString, row, column, num)) {
            if (!possibilities[blankSpaces[i]]) {possibilities[blankSpaces[i]] = [];}
            possibilities[blankSpaces[i]].push(num);
          }
        }

        if (possibilities[blankSpaces[i]] === undefined) {
            if (alternativeSolutions.length === 0) {
                return { error: 'Puzzle cannot be solved' };
            } else {
                solutionString = alternativeSolutions[0];
                alternativeSolutions.shift();
            }
        } else if (possibilities[blankSpaces[i]].length === 1) {
          solutionString = this.write(solutionString, row, column, possibilities[blankSpaces[i]][0]);
          break;
        }
      }
      
      if (solutionString === previousString) {
        let lessPos = 10;
        let lessPosSquare;
        
        for (let i = 0; i < blankSpaces.length; i++) {
          if (possibilities[blankSpaces[i]].length < lessPos) {
            lessPos = possibilities[blankSpaces[i]].length;
            lessPosSquare = i;
          }
        }
        
        let row = Math.floor(blankSpaces[lessPosSquare] / 9) + 1;
        let column = blankSpaces[lessPosSquare] - 9 * (row - 1) + 1;
        for (let i = 1; i < possibilities[blankSpaces[lessPosSquare]].length; i++) {
            alternativeSolutions.push(this.write(solutionString, row, column, possibilities[blankSpaces[lessPosSquare]][i]));
        }
        solutionString = this.write(solutionString, row, column, possibilities[blankSpaces[lessPosSquare]][0]);
      }
    } while(solutionString != previousString)
    
    return solutionString;
  }
}

module.exports = SudokuSolver;

