import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function Contact() {
  const [message, setMessage] = useState("");
  const [owner, setOwner] = useState(null);
  const [searchParams, setSearhParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, "users", params.ownerId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOwner(docSnap.data());
      } else {
        toast.error("Could not find owner data.");
      }
    };

    getOwner();
  }, [params.ownerId]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Owner</p>
      </header>

      {owner !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {owner?.name}</p>
          </div>

          <form className="messageFrom">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={onChange}
                rows='20'
                columns='30'
              ></textarea>
            </div>
            <a
              href={`mailto:${owner.email}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
