// src/components/FdForm.js
import React, { useState } from 'react';

function FdForm() {
    const [fd, setFd] = useState({
        customerId: '',
        accountId: '',
        depositAmount: '',
        depositType: '',
        depositPeriod: '',
        startDate: '',
        maturityDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFd({ ...fd, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/fds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fd)
        })
        .then(response => {
            if (response.ok) {
                alert('Fixed Deposit created successfully');
                setFd({
                    customerId: '',
                    accountId: '',
                    depositAmount: '',
                    depositType: '',
                    depositPeriod: '',
                    startDate: '',
                    maturityDate: ''
                });
            } else {
                alert('Error creating Fixed Deposit');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error creating Fixed Deposit');
        });
    };

    const formStyle = {
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9'
    };

    const inputStyle = {
        display: 'block',
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc'
    };

    const labelStyle = {
        margin: '10px 0 5px',
        fontWeight: 'bold'
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#28a745',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer'
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <div>
                <label style={labelStyle}>Customer ID:</label>
                <input
                    type="text"
                    name="customerId"
                    value={fd.customerId}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>
            <div>
                <label style={labelStyle}>Account ID:</label>
                <input
                    type="text"
                    name="accountId"
                    value={fd.accountId}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>
            <div>
                <label style={labelStyle}>Deposit Amount:</label>
                <input
                    type="number"
                    name="depositAmount"
                    value={fd.depositAmount}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>
            <div>
                <label style={labelStyle}>Deposit Type:</label>
                <input
                    type="text"
                    name="depositType"
                    value={fd.depositType}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>
            <div>
                <label style={labelStyle}>Deposit Period (months):</label>
                <input
                    type="number"
                    name="depositPeriod"
                    value={fd.depositPeriod}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>
            <div>
                <label style={labelStyle}>Start Date:</label>
                <input
                    type="date"
                    name="startDate"
                    value={fd.startDate}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>
            <div>
                <label style={labelStyle}>Maturity Date:</label>
                <input
                    type="date"
                    name="maturityDate"
                    value={fd.maturityDate}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>
            <button type="submit" style={buttonStyle}>Create Fixed Deposit</button>
        </form>
    );
}

export default FdForm;

