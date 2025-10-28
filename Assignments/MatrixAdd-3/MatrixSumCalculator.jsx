
import React, { useState } from 'react';

const MatrixSumCalculator = () => {
  const [rowsA, setRowsA] = useState(2);
  const [colsA, setColsA] = useState(2);
  const [rowsB, setRowsB] = useState(2);
  const [colsB, setColsB] = useState(2);
  const [matrixA, setMatrixA] = useState([]);
  const [matrixB, setMatrixB] = useState([]);
  const [resultMatrix, setResultMatrix] = useState([]);
  const [error, setError] = useState('');

  const handleMatrixASetup = () => {
    if (rowsA <= 0 || colsA <= 0) {
      setError('Dimensions must be greater than 0');
      return;
    }
    const emptyMatrix = Array.from({ length: rowsA }, () =>
      Array.from({ length: colsA }, () => 0)
    );
    setMatrixA(emptyMatrix);
    setError('');
  };

  const handleMatrixBSetup = () => {
    if (rowsB <= 0 || colsB <= 0) {
      setError('Dimensions must be greater than 0');
      return;
    }
    const emptyMatrix = Array.from({ length: rowsB }, () =>
      Array.from({ length: colsB }, () => 0)
    );
    setMatrixB(emptyMatrix);
    setError('');
  };

  const handleMatrixChange = (matrixSetter, rowIndex, colIndex, value) => {
    const numValue = parseFloat(value) || 0;
    matrixSetter((prevMatrix) => {
      const updatedMatrix = prevMatrix.map((row) => [...row]);
      updatedMatrix[rowIndex][colIndex] = numValue;
      return updatedMatrix;
    });
  };

  const calculateSum = () => {
    setError('');
    
    if (matrixA.length === 0 || matrixB.length === 0) {
      setError('Please initialize both matrices first');
      return;
    }

    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
      setError('Matrix A and Matrix B must have the same dimensions for addition');
      return;
    }

    
    const result = matrixA.map((row, i) =>
      row.map((val, j) => val + matrixB[i][j])
    );
    setResultMatrix(result);
  };

  const renderMatrix = (matrix, setMatrix, matrixName) => (
    <div className="mx-matrix-wrap">
      <h4>{matrixName}</h4>
      <table className="mx-matrix">
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((col, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    value={col === 0 ? col : col}
                    onChange={(e) =>
                      handleMatrixChange(setMatrix, rowIndex, colIndex, e.target.value)
                    }
                    className="mx-input"
                    placeholder="0"
                    step="any"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const clearAll = () => {
    setMatrixA([]);
    setMatrixB([]);
    setResultMatrix([]);
    setError('');
  };

  return (
    <div className="mx-container">
      {error && (
        <div className="mx-error">
          <span className="mx-error-icon"></span>
          {error}
        </div>
      )}

      <div className="mx-card">
        <h3>Matrix A Dimensions</h3>
        <div className="mx-row">
          <label>
            Rows:
            <input
              type="number"
              value={rowsA}
              onChange={(e) => setRowsA(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="mx-num"
              min="1"
              max="10"
            />
          </label>
          <label>
            Columns:
            <input
              type="number"
              value={colsA}
              onChange={(e) => setColsA(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="mx-num"
              min="1"
              max="10"
            />
          </label>
          <button className="mx-btn" onClick={handleMatrixASetup}>
            Set Matrix A
          </button>
        </div>
        {matrixA.length > 0 && renderMatrix(matrixA, setMatrixA, "Matrix A")}
      </div>

      <div className="mx-card">
        <h3>Matrix B Dimensions</h3>
        <div className="mx-row">
          <label>
            Rows:
            <input
              type="number"
              value={rowsB}
              onChange={(e) => setRowsB(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="mx-num"
              min="1"
              max="10"
            />
          </label>
          <label>
            Columns:
            <input
              type="number"
              value={colsB}
              onChange={(e) => setColsB(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="mx-num"
              min="1"
              max="10"
            />
          </label>
          <button className="mx-btn" onClick={handleMatrixBSetup}>
            Set Matrix B
          </button>
        </div>
        {matrixB.length > 0 && renderMatrix(matrixB, setMatrixB, "Matrix B")}
      </div>

      <div className="mx-actions">
        {matrixA.length > 0 &&
          matrixB.length > 0 &&
          matrixA.length === matrixB.length &&
          matrixA[0]?.length === matrixB[0]?.length && (
            <button className="mx-btn primary" onClick={calculateSum}>
              Calculate Sum
            </button>
          )}
        
        {(matrixA.length > 0 || matrixB.length > 0) && (
          <button className="mx-btn secondary" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>

      {resultMatrix.length > 0 && (
        <div className="mx-card mx-result-card">
          <h3>Result Matrix (A + B)</h3>
          <div className="mx-matrix-wrap">
            <table className="mx-matrix">
              <tbody>
                {resultMatrix.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((col, colIndex) => (
                      <td key={colIndex} className="mx-result-cell">
                        {col}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrixSumCalculator;



