
const handleChange = (e) => {
        const { name, value } = e.target;
        setFd({
            ...fd,
            [name]: value,
            maturityDate: new Date(new Date().setMonth(new Date().getMonth() + parseInt(fd.depositPeriod))).toISOString().split('T')[0]
        });
    };


