import { withFormik, Form, Field } from "formik";
import React, { useEffect, useState } from 'react';
import * as Yup from "yup";
import axios from "axios";
import '../index.css';



const UserForm = ({ errors, touched, values, status }) => {
    const [state, setState] = useState([]);



    useEffect(() => {
        if (status) {


            axios
                .get(`https://randomuser.me/api/?results=12&nat=us`)
                .then(res => {
                    setState(res.data.results);
                    console.log(res.data.results)
                })
                .catch(err => {
                    console.log(err)
                })

        }
    }, [status]);


    return (


        <div>
            <h1>The Friend Zone</h1>
            <h3>Please login below.</h3>
            <br />

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

                <hr />

            </Form>



            {status && status.username && (


<div class="people">

                    <br />



                    {state.map(x => {




                        return (


                              <div class="person">

                                <h3>{x.name.first} {x.name.last}</h3>

                                <img src={x.picture.large} />


                                <p>{x.dob.age} year old {x.gender}</p>

        
                       
                                <p>
                                    
                                    <b>Home Town:</b> <br />
                                
                                {x.location.city}, {x.location.state}</p>

                    


                                <button>Chat with {x.name.first}! </button>

                                <br /> <br /> 

</div>
                        )

                    })}


                </div>

            )}

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
        setStatus(values);
    }
});

const UserFormWithFormik = formikHOC(UserForm);

export default UserFormWithFormik;



