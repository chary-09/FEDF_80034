import React, { useState, useEffect } from 'react';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    // Keyboard support
    useEffect(() => {
        const handleKeyPress = (event) => {
            const key = event.key;
            if (key >= '0' && key <= '9' || key === '.' || ['+', '-', '*', '/'].includes(key)) {
                handleClick(key);
            } else if (key === 'Enter' || key === '=') {
                handleClick('=');
            } else if (key === 'Escape' || key === 'c' || key === 'C') {
                handleClick('C');
            } else if (key === 'Backspace') {
                handleClick('⌫');
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [input]);

    const handleClick = (value) => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 150);

        if (value === '=') {
            try {
                if (input.trim() === '') return;
                const calcResult = eval(input);
                setResult(calcResult);
            } catch (error) {
                setResult('Error');
            }
        } else if (value === 'C') {
            setInput('');
            setResult('');
        } else if (value === '⌫') {
            setInput(input.slice(0, -1));
        } else {
            setInput(input + value);
        }
    };


    return (
        <div style={appContainerStyle}>
            <h1 style={mainHeadingStyle}>Calculator</h1>
            <div style={calculatorStyle}>
                <div style={displayStyle}>
                    <div style={inputStyle}>{input || '0'}</div>
                    <div style={resultStyle}>{result}</div>
                </div>
                <div style={buttonContainerStyle}>
                    {['C', '⌫', '/', '*', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.', '±'].map((button) => (
                        <button
                            key={button}
                            onClick={() => handleClick(button)}
                            style={{
                                ...buttonStyle,
                                ...(button === '=' ? equalsButtonStyle : {}),
                                ...(button === 'C' ? clearButtonStyle : {}),
                                ...(button === '⌫' ? backspaceButtonStyle : {}),
                                ...(isAnimating ? { transform: 'scale(0.95)' } : {})
                            }}
                            className={isAnimating ? 'button-animate' : ''}
                        >
                            {button}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Styles
const appContainerStyle = {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '10px',
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    overflow: 'hidden',
};

const mainHeadingStyle = {
    color: 'white',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '15px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    letterSpacing: '2px',
};

const calculatorStyle = {
    width: '320px',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    maxHeight: '70vh',
    overflow: 'auto',
};

const displayStyle = {
    marginBottom: '15px',
    textAlign: 'right',
    border: '2px solid #e1e5e9',
    borderRadius: '12px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    fontSize: '16px',
    minHeight: '60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
};

const inputStyle = {
    color: '#495057',
    fontSize: '16px',
    minHeight: '20px',
};

const resultStyle = {
    color: '#007bff',
    fontSize: '24px',
    fontWeight: 'bold',
    minHeight: '25px',
};

const buttonContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    marginBottom: '15px',
};

const buttonStyle = {
    padding: '12px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#6c757d',
    color: 'white',
    fontWeight: '600',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    userSelect: 'none',
};

const equalsButtonStyle = {
    backgroundColor: '#28a745',
    gridColumn: 'span 2',
};

const clearButtonStyle = {
    backgroundColor: '#dc3545',
};

const backspaceButtonStyle = {
    backgroundColor: '#ffc107',
    color: '#212529',
};

export default Calculator;
