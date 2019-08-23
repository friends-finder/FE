import './App.css';
import { withFormik, Form, Field } from "formik";
import React, { useState } from 'react';


const UserForm = ({ errors, touched, values, status }) => {
    const [state, setState] = useState([]);
    console.log(state)
    useEffect(() => {
        if (status) {
            setUsers([...state, status]);
        }
    }, [status]);


    return ( <div>
        <h1>Friend Finder Login</h1>
    
        <Form>
            <Field
                className="field"
                component="input"
                type="text"
                name="name"
                placeholder="username"
            />
            {touched.name && errors.name && (
                <p className="error">{errors.name}</p>
            )}
            <br /> <br />
            <Field
                    className="field"
                    component="input"
                    type="password"
                    name="password"
                    placeholder="password"
                />
                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}
                <br />  <br />

                <button
                    type="submit"
                >
                    Onboard User
                </button>

                
            </Form>
            </div>
    )
    const formikHOC = withFormik({
        mapPropsToValues({ name, password }) {
            return {
                name: name || "",
                password: role || ""
            };
        },
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .required("username required"),
            password: Yup.string()
                .required("password required."),
        }),
        handleSubmit(values, { setStatus, resetForm }) {
            axios
                .post("https://reqres.in/api/users", values)
                .then(res => {
                    console.log("handleSubmit: then: res: ", res);
                    setStatus(res.data);
                    resetForm();
                })
                .catch(err => console.error("handleSubmit: catch: err: ", err));
        }
    });
    
    }
    const UserFormWithFormik = formikHOC(UserForm);
    export default UserForm;