import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, deleteUser } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import googleIcon from "../assets/svg/googleIcon.svg";
import { toast } from "react-toastify";

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user already exists in firestore
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      //if user doesn't exists
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
      toast.success(
        `Successfully Signed ${location.pathname === "/login" ? "In" : "Up"}!`
      );
    } catch (error) {
        toast.error("Something went wrong with Google Authentication.");
    }
  };

  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === "/login" ? "in" : "up"} with</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="google" />
      </button>
    </div>
  );
}

export default OAuth;
