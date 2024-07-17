import React, {useState} from 'react';

const FunctionalForm = () =>  {
    //Make State For Form data Management
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });

    //create States Hook for formSubmit and Error
    const [submittedData, setSubmittedData] = useState([]);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    //Form Validation
    const validateForm = () => {
        let formErrors = {};
        const namePattern = /^[A-Za-z]+$/;

        if (!formData.first_name) {
            formErrors.first_name = "First name is required";
        } else if (!namePattern.test(formData.first_name)) {
            formErrors.first_name = "First name cannot contain numbers or special characters";
        }

        if (!formData.last_name) {
            formErrors.last_name = "Last name is required";
        } else if (!namePattern.test(formData.last_name)) {
            formErrors.last_name = "Last name cannot contain numbers or special characters";
        }

        if (!formData.email) {
            formErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = "Email address is invalid";
        }
        return formErrors;
    };
    
    //Form Submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            setSubmittedData([...submittedData, formData]);
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
            });
            setErrors({});
            console.log('Form submitted successfully');
        } else {
            setErrors(formErrors);
        }
    };
    
    //Clear Form Data
    const handleClear = () => {
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
        });
        setErrors({});
    };

    return (
        <div>
            <div className="card p-4">
                <h3>Functional Component</h3>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3 mt-3">
                        <input type="text" name="first_name" onChange={handleChange} value={formData.first_name} className="form-control" placeholder="Enter first name" />
                        {errors.first_name && <span className="text-danger">{errors.first_name}</span>}
                    </div>
                    <div className="mb-3 mt-3">
                        <input type="text" name="last_name" onChange={handleChange} value={formData.last_name} className="form-control" placeholder="Enter last name" />
                        {errors.last_name && <span className="text-danger">{errors.last_name}</span>}
                    </div>
                    <div className="mb-3 mt-3">
                        {/* <input type="email" name="email" onChange={handleChange} value={formData.email} className="form-control" placeholder="Enter email" /> */}
                        <input type="text" name="email" onChange={handleChange} value={formData.email} className="form-control" placeholder="Enter email" />
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    
                    <button type="submit" className="btn btn-primary mr-3">Submit</button>
                    <button type="submit" onClick={handleClear} className="btn btn-primary">Clear</button>
                </form>
                <div className="container mt-3">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submittedData.length >= 1 ?
                            submittedData.map((data, index) => (
                                 data.first_name && data.last_name && data.email ? (
                                    <tr key={index}>
                                        <td>{data.first_name}</td>
                                        <td>{data.last_name}</td>
                                        <td>{data.email}</td>
                                    </tr>
                                ) : null
                            )) : <tr>
                            <td colSpan={3}>Data Loading</td>
                        </tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default FunctionalForm;