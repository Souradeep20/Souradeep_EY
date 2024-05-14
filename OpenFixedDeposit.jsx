import React,{ useState } from 'react';
function OpenFixedDeposit()
{
    const [fromAccount,setFromAccount]=useState('');
    const [depositAmount,setDepositAmount]=useState('');
    const [natureOfDeposit,setNatureOfDeposit]=useState('');
    const [depositPeriod,setDepositPeriod]=useState('');
    const [interest,setInterest]=useState('');
    const [totalAmount,setTotalAmount]=useState('');
    const [message,setMessage]=useState('');
    const[success,setSuccess]=useState(false);
    const calculateAmount=()=>{
        const principalAmount=parseFloat(depositAmount);
        const rate =parseFloat(interest);
        const time =parseFloat(depositPeriod);
        const total = principalAmount+ (principalAmount*rate*time)/100;
        setTotalAmount(total);
    };
    const handleSubmit =(e)=>{
        e.preventDefault();

        setMessage('Fixed Deposit account opened successfully!');
        
    };

    
    return(
        <div>
            <h2>Open Fixed Deposit</h2>
            <form onSubmit ={handleSubmit}>
                <div>
                    <label>From Account:</label>
                    <select value={fromAccount} onChange={(e)=>setFromAccount(e.target.value)}required>
                        <option value="112212">Account 1</option>
                        <option value="234567">Account 2</option>
                    </select>
                </div>
                <div>
                    <label>Deposit Amount:</label>
                    <input type="number" value={depositAmount} onChange={(e)=>setDepositAmount(e.target.value)} required/>
                </div>
                <div>
                    <label>Nature of Deposit:</label>
                    <select value={natureOfDeposit}onChange={(e)=>setNatureOfDeposit(e.target.value)} required>
                        <option value="">Select Nature</option>
                        <option value="Monthly">Monthly Interest</option>
                        <option value="Quarterly">Quaterly Interest </option>
                        <option value="Reinvestment">Reinvestment of Interest</option>
                    </select>
                </div>
                <div>
                    <label>Deposit Period:</label>
                    <input type="number" value={depositPeriod} onChange={(e)=>setDepositPeriod(e.target.value)} required/>
                </div>
                <div>
                    <label>% of Interest:</label>
                    <input type ="number" value={interest} onChange={(e)=>setInterest(e.target.value)} required/>
                </div>
                <div>
                    <button onClick={calculateAmount}>Calculate</button>
                    <h3>Total Amount after {depositPeriod} years:</h3>
                    <p>{totalAmount}</p>
                </div>
                <div>
                    <button type="submit">Open Fixed Deposit</button>
                    {<p>{message}</p>}
                </div>
            </form>
        </div>
    );
};
export {OpenFixedDeposit};