import { withFormik, Form, Field } from "formik";
import React, { useEffect, useState } from 'react';
import * as Yup from "yup";
import axios from "axios";



const UserForm = ({ errors, touched, values, status }) => {
    const [state, setState] = useState([]);
    console.log(state)
    useEffect(() => {
        if (status) {
            setState([...state, status]);
        }
    }, [status]);


    return ( 
    
    
    <div>
        <h1>Friend Finder Login</h1>
    
        <Form>
            <Field
                className="field"
                component="input"
                type="text"
                name="username"
                placeholder="username"
            />
            {touched.username && errors.username && (
                <p className="error">{errors.username}</p>
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
                    Login
                </button>

                
            </Form>
            {state.map(user  => (<div><p key={user.id}><h2>Welcome</h2></p> </div> ))} 
            </div> 
           
    ) 
    


                }




                const formikHOC = withFormik({
                    mapPropsToValues({ username, password }) {
                        return {
                            username: username || "",
                            password: password || ""
                        };
                    },
                    validationSchema: Yup.object().shape({
                        username: Yup.string()
                            .required("username required"),
        
                        password: Yup.string()
                            .required("password required")
                    }),
                
                    handleSubmit(values, { setStatus, resetForm }) {
                        axios
                            .post("https://reqres.in/api/ffusers", values)
                            .then(res => {
                                console.log("handleSubmit: then: res: ", res);
                                setStatus(res.data);
                                resetForm();
                            })
                            .catch(err => console.error("handleSubmit: catch: err: ", err));
                    }
                });
                
                const UserFormWithFormik = formikHOC(UserForm);
                
                export default UserFormWithFormik;
                



