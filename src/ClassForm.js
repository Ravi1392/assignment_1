import React, { Component } from 'react';

class ClassForm extends Component {
    //state and props construct make
    constructor(props) {
        super(props);
        this.state = {
          formClassData: {
            first_name: '',
            last_name: '',
            email: '',
          },
          submittedClassData: [],
          errors: {},
        };
      }
    
      //handle onchange event for input fields
      handleClassChange = (e) => {
        const { name, value } = e.target;
        this.setState({
          formClassData: {
            ...this.state.formClassData,
            [name]: value,
          },
        });
      };

      //check validation for First_name, Last_name, Email
      validateClassForm() {
        const { formClassData } = this.state;
        let formClassErrors = {};
        const namePattern = /^[A-Za-z]+$/;
    
        if (!formClassData.first_name) {
          formClassErrors.first_name = "First name is required";
        } else if (!namePattern.test(formClassData.first_name)) {
          formClassErrors.first_name = "First name cannot contain numbers or special characters";
        }
    
        if (!formClassData.last_name) {
          formClassErrors.last_name = "Last name is required";
        } else if (!namePattern.test(formClassData.last_name)) {
          formClassErrors.last_name = "Last name cannot contain numbers or special characters";
        }
    
        if (!formClassData.email) {
          formClassErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formClassData.email)) {
          formClassErrors.email = "Email address is invalid";
        }
        return formClassErrors;
      }
    
      //Submit event for Form Submit
      handleClassFormSubmit = (e) => {
        e.preventDefault();
        const formClassErrors = this.validateClassForm();
        if (Object.keys(formClassErrors).length === 0) {
            this.setState((prevState) => ({
                submittedClassData: [...prevState.submittedClassData, prevState.formClassData],
                formClassData: {
                    first_name: '',
                    last_name: '',
                    email: '',
                },
                errors: {},
            }));
            console.log('Form submitted successfully');
        } else {
            this.setState({ errors: formClassErrors });
        }
      };
    
      //clear Form Data Event and Error message clear event
      handleClassClear = () => {
        this.setState({
          formClassData: {
            first_name: '',
            last_name: '',
            email: '',
          },
          errors: {},
        });
      };
      //Render Form and Table
      render() {
        const { formClassData, submittedClassData, errors } = this.state;
        return (
            <div>
                <div className="card p-4">
                    <h3>Class Component</h3>
                    <form onSubmit={this.handleClassFormSubmit}>
                        <div className="mb-3 mt-3">
                            <input type="text" name="first_name" onChange={this.handleClassChange} value={formClassData.first_name} className="form-control" placeholder="Enter first name" />
                            {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
                        </div>
                        <div className="mb-3 mt-3">
                            <input type="text" name="last_name" onChange={this.handleClassChange} value={formClassData.last_name} className="form-control" placeholder="Enter last name" />
                            {errors.last_name && <div className="text-danger">{errors.last_name}</div>}
                        </div>
                        <div className="mb-3 mt-3">
                            <input type="text" name="email" onChange={this.handleClassChange} value={formClassData.email} className="form-control" placeholder="Enter email" />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                        
                        <button type="submit" className="btn btn-primary mr-3">Submit</button>
                        <button type="button" onClick={this.handleClassClear} className="btn btn-primary">Clear</button>
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
                            {submittedClassData.length >= 1 ?
                                submittedClassData.map((data, index) => (
                                    data.first_name && data.last_name && data.email ? (
                                        <tr key={index}>
                                            <td>{data.first_name}</td>
                                            <td>{data.last_name}</td>
                                            <td>{data.email}</td>
                                        </tr>
                                    ) : null
                                )) : <tr><td colSpan={3}>Data Loading</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        );
      }
}

export default ClassForm;