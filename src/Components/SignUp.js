import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { useForm } from "react-hook-form";
import { UserContext } from '../App';
import { Link } from 'react-router-dom';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
const SignUp = () => {
    const [loggedInUser, setloggedInUser] = useContext(UserContext);
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {

        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(res => {
                const newUserInfo = { ...loggedInUser }
                newUserInfo.success = true;
                newUserInfo.error = '';
                setloggedInUser(newUserInfo);
                const user = firebase.auth().currentUser;
                user.updateProfile({
                    displayName: data.name 
                }).then(function () {
                    // Update successful.
                }).catch(function (error) {
                    // An error happened.
                });
                console.log(res);
            })
            .catch(error => {
                const newUserInfo = { ...loggedInUser }
                newUserInfo.success = false;
                newUserInfo.error = error.message;
                setloggedInUser(newUserInfo);
            });
    }
    const check = function() {
        if (document.getElementById('password').value ===
          document.getElementById('confirm_password').value) {
          document.getElementById('message').style.color = 'green';
          document.getElementById('message').innerHTML = 'Password matched';
        } else {
          document.getElementById('message').style.color = 'red';
          document.getElementById('message').innerHTML = 'Password not matched';
        }
      };

    return (
        <div className="banner d-flex justify-content-center">
            <form className="w-25" onSubmit={handleSubmit(onSubmit)}>

                <br /><br />
                <h1 className="text-center">Sign Up</h1>

                <input className="form-control" name="name" type="text" ref={register({ required: true })} placeholder="Your Name" />
                {errors.name && <small className="text-danger">This field is required</small>}  <br />

                <input className="form-control" name="email" type="email" ref={register({ required: true, pattern: /\S+@\S+\.\S+/ })} placeholder="Email" />
                {errors.email && <small className="text-danger">Email address is invalid</small>} <br />

                <input className="form-control" onChange={check} name="password" type="password" id="password" ref={register({ required: true, pattern: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/ })} placeholder="Password" />
                {errors.password && <small className="text-danger">Password at least 8 character long & contains a symbol,a number, upper & lower case letters.</small>} <br />

                <input className="form-control" onChange={check} id="confirm_password" name="confirmPassword" type="password" placeholder="Confirm Password" ref={register({ required: true })}/>
                <span id="message"></span> <br />

                <input className="btn btn-danger w-100" type="submit" />
                <Link to="/login"><small>Already have an account?</small></Link>
                <p style={{color:"red"}}>{loggedInUser.error}</p>
                {loggedInUser.success && <p style={{color:"green"}}>Account created! please login.</p>}

            </form>

        </div>
    );
};

export default SignUp;