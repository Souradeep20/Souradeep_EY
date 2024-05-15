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

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Customer ID:</label>
                <input type="text" name="customerId" value={fd.customerId} onChange={handleChange} required />
            </div>
            <div>
                <label>Account ID:</label>
                <input type="text" name="accountId" value={fd.accountId} onChange={handleChange} required />
            </div>
            <div>
                <label>Deposit Amount:</label>
                <input type="number" name="depositAmount" value={fd.depositAmount} onChange={handleChange} required />
            </div>
            <div>
                <label>Deposit Type:</label>
                <input type="text" name="depositType" value={fd.depositType} onChange={handleChange} required />
            </div>
            <div>
                <label>Deposit Period (months):</label>
                <input type="number" name="depositPeriod" value={fd.depositPeriod} onChange={handleChange} required />
            </div>
            <div>
                <label>Start Date:</label>
                <input type="date" name="startDate" value={fd.startDate} onChange={handleChange} required />
            </div>
            <div>
                <label>Maturity Date:</label>
                <input type="date" name="maturityDate" value={fd.maturityDate} onChange={handleChange} required />
            </div>
            <button type="submit">Create Fixed Deposit</button>
        </form>
    );
}

export default FdForm;
