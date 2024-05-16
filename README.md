import React, { useState, useEffect } from 'react';

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

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setFd(prevFd => ({
            ...prevFd,
            startDate: currentDate,
            maturityDate: prevFd.depositPeriod ? calculateMaturityDate(currentDate, prevFd.depositPeriod) : ''
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFd(prevFd => ({
            ...prevFd,
            [name]: value,
            maturityDate: (name === 'startDate' && prevFd.depositPeriod) || (name === 'depositPeriod' && prevFd.startDate)
                ? calculateMaturityDate(name === 'startDate' ? value : prevFd.startDate, name === 'depositPeriod' ? value : prevFd.depositPeriod)
                : ''
        }));
    };

    const calculateMaturityDate = (startDate, period) => {
        const startDateObj = new Date(startDate);
        const maturityDateObj = new Date(startDateObj.setMonth(startDateObj.getMonth() + parseInt(period)));
        return maturityDateObj.toISOString().split('T')[0];
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
                return response.json();
            }
            throw new Error('Error creating Fixed Deposit');
        })
        .then(data => {
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
                <input type="date" name="maturityDate" value={fd.maturityDate} readOnly required />
            </div>
            <button type="submit">Create Fixed Deposit</button>
        </form>
    );
}

export default FdForm;

