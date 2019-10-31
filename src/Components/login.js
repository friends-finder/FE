import { withFormik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";
import "../App.css";

const StyledHeading = styled.h1`
  font-size: 50px;
  font-family: 'Staatliches', cursive;
  letter-spacing: 2px;
  line-height: 50px;
`;

const StyledText = styled.h3`
  font-size: 30px;
  color: #e5c687;
  line-height: 50px;
`;

const Header = styled.div`
  background-image: url("images/index-header.jpg");
`;

const UserForm = ({ errors, touched, values, status }) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    if (status) {
      axios
        .get(`https://randomuser.me/api/?results=8&nat=us`)
        .then(res => {
          setState(res.data.results);
          console.log(res.data.results);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [status]);

  return (
    <div class="container">
      <Header>
        <img
          class="HeaderImg"
          src="https://friendfinderui.netlify.com/img/index-header.jpg"
        ></img>
      </Header>
      <StyledHeading>The Friend Zone</StyledHeading>
      Our app allows YOU to match with local people and make new friends!
      <br /> <br />
      <StyledText>Sign Up Below:</StyledText>
      <br />
      <Form className="theform">
        What is your name: <br />
        <br />
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
        <br /> <br /><br />
        What most describes you? <br />
        <br />
        <Field component="select" className="field" name="type">
          <option>-Select-</option>
          <option value="Extrovert">Fun/Outgoing (Extroverted)</option>
          <option value="Introvert">Home Body (Introverted)</option>
          <option value="Both">A little bit of both</option>
        </Field>
        {touched.type && errors.type && <p className="error">{errors.type}</p>}
        <br /> <br /><br />
        Create a Password: <br />
        <br />
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
        <br /> <br /><br />
        <button className="create" type="submit">
          Create Account
        </button>
      </Form>
      {status && status.username && (
        <>
          <div className="welcome"> Welcome {status.username}! </div>

          <div>
            These people were matched to you according to your personality.
          </div>

          <div class="people">
            {console.log(state.picture)}

            {state.map(x => {
              return (
                <div class="person">
                  <h3>
                    {x.name.first} {x.name.last}
                  </h3>
                  <img src={x.picture.large} />
                  <p>
                    {x.dob.age} year old {x.gender}
                  </p>
                  <p>
                    <b>Home Town:</b> <br />
                    {x.location.city}, {x.location.state}
                  </p>
                  <div className>
                    {" "}
                    <button>✅ Yes! </button> <button>❌ No </button>{" "}
                  </div>
                  <br /> <br />
                  <br /> <br />
                </div>
              );
            })}
            <>
              <div className="events">
                <br /> <br /> <br />
                <h1>Recent Events</h1>
                <p>
                  You have no recent events. Once you've attended your first
                  event you'll be able to post photos and unlock the status
                  feature!{" "}
                </p>
              </div>
            </>
          </div>
        </>
      )}
    </div>
  );
};

const formikHOC = withFormik({
  mapPropsToValues({ username, password, type }) {
    return {
      username: username || "",
      password: password || "",
      type: type || ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("username required"),

    password: Yup.string().required("password required")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    setStatus(values);
  }
});

const UserFormWithFormik = formikHOC(UserForm);

export default UserFormWithFormik;
