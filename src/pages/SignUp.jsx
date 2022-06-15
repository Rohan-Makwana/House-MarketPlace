//comment  logic is similar for login and profile pages
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import OAuth from "../components/OAuth";
import ArrowRightIcon from "../assets/svg/keyboardArrowRightIcon.svg?component";
import visbilityIcon from "../assets/svg/visibilityIcon.svg";

function Signup() {
  //state to hold boolean for the show password icon which on true will change the type of password input from password to text
  const [showPassword, setShowPassword] = useState(false);

  //state to hold the form data i.e name, password & email
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  //destructuring formData from state to access the properties individually
  const { name, email, password } = formData;

  const navigate = useNavigate();

  //this function on change in input i.e when something is typed will update the formdata state
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  //this function on submitting form will add new user to firestore db & firebase authentication
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      //initializing auth
      const auth = getAuth();

      //passing auth, user credentials to fb function to create user in authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //getting the user created above
      const user = userCredential.user;
      //updating profile of current user created by adding his name from form data
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      //copying formData state into a new copy variable to send it to firestore db
      const formDataCopy = { ...formData };
      //deleting password field form the new copy
      delete formDataCopy.password;
      //adding a timestamp field to the copy to be stored in db
      formDataCopy.timestamp = serverTimestamp();
      //calling setDoc funtion of firestore to store the new user document data in users collection in firestore
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      //navigating to explore page after the above is finished
      toast.success("Successfully Signed Up!");
      navigate("/");
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type="name"
            className="nameInput"
            id="name"
            placeholder="Name"
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            className="emailInput"
            id="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              id="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />

            <img
              src={visbilityIcon}
              alt="show passowrd"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="white" width="34px" height="34px" />
            </button>
          </div>
        </form>

        <OAuth/>

        <Link to="/login" className="registerLink">
          Already have an account? Login.
        </Link>
      </div>
    </>
  );
}

export default Signup;
