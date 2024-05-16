
const handleChange = (e) => {
    const { name, value } = e.target;
    setFd(prevFd => ({
        ...prevFd,
        [name]: value,
        maturityDate: value ? new Date(new Date(prevFd.startDate).setMonth(new Date(prevFd.startDate).getMonth() + parseInt(value))).toISOString().split('T')[0] : ''
    }));
};


