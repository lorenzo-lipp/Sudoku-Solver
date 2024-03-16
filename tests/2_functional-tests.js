const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const puzzleStrings = require('../controllers/puzzle-strings.js');
const puzzles = puzzleStrings.puzzlesAndSolutions;

chai.use(chaiHttp);

suite('Functional Tests', () => {
  test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function (done) {
    chai.request(server)
      .post('/api/solve')
      .send({
        puzzle: puzzles[0][0]
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "solution");
        done();
      });
  });

  test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function (done) {
    chai.request(server)
      .post('/api/solve')
      .send({})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Required field missing");
        done();
      });
  });

  test('Solve a puzzle with invalid characters: POST request to /api/solve', function (done) {
    chai.request(server)
      .post('/api/solve')
      .send({
        puzzle: "z" + puzzles[0][0].slice(1)
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Invalid characters in puzzle");
        done();
      });
  });

  test('Solve a puzzle with incorrect length: POST request to /api/solve', function (done) {
    chai.request(server)
      .post('/api/solve')
      .send({
        puzzle: puzzles[0][0].slice(1)
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
        done();
      });
  });

  test('Solve a puzzle that cannot be solved: POST request to /api/solve', function (done) {
    chai.request(server)
      .post('/api/solve')
      .send({
        puzzle: "11" + puzzles[0][0].slice(2)
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Puzzle cannot be solved");
        done();
      });
  });

  test('Check a puzzle placement with all fields: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: puzzles[0][0],
        coordinate: "A2",
        value: 1
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "valid");
        done();
      });
  });

  test('Check a puzzle placement with single placement conflict: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: puzzles[0][0],
        coordinate: "A2",
        value: 7
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "valid");
        assert.isFalse(res.body.valid);
        assert.property(res.body, "conflict");
        assert.lengthOf(res.body.conflict, 1);
        done();
      })
  });

  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: puzzles[0][0],
        coordinate: "A2",
        value: 1
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "valid");
        assert.isFalse(res.body.valid);
        assert.property(res.body, "conflict");
        assert.lengthOf(res.body.conflict, 2);
        done();
      });
  });

  test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: puzzles[0][0],
        coordinate: "A2",
        value: 2
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "valid");
        assert.isFalse(res.body.valid);
        assert.property(res.body, "conflict");
        assert.lengthOf(res.body.conflict, 3);
        done();
      });
  });

  test('Check a puzzle placement with missing required fields: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: puzzles[0][0],
        coordinate: "A2"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Required field(s) missing");
        done();
      });
  });

  test('Check a puzzle placement with invalid characters: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: "a" + puzzles[0][0].slice(1),
        coordinate: "A2",
        value: "1"
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Invalid characters in puzzle");    
        done();
      });
  });

  test('Check a puzzle placement with incorrect length: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: puzzles[0][0].slice(1),
        coordinate: "A2",
        value: 1
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
        done();
      });
  });

  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: puzzles[0][0],
        coordinate: "banana",
        value: 1
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Invalid coordinate");
        done();
      });
  });

  test('Check a puzzle placement with invalid placement value: POST request to /api/check', function (done) {
    chai.request(server)
      .post('/api/check')
      .send({
        puzzle: puzzles[0][0],
        coordinate: "A2",
        value: 97
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, "error");
        assert.equal(res.body.error, "Invalid value");
        done();
      });
  });
});

