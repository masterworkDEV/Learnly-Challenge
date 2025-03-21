import React, { useEffect, useState, useContext } from "react";
import DataContext from "../Context/DataContext";

const SetProfile = ({}) => {
  const {
    headerState,
    setHeaderState,
    setUserName,
    setUserProfilePicture,
    setUserGender,
  } = useContext(DataContext);
  const [user, setUser] = useState("");
  const [gender, setGender] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [slide, setSlide] = useState(1);

  useEffect(() => {
    setHeaderState(false);
  }, [headerState]);

  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (slide === 1) {
      setSlide(2);
    } else if (slide === 2) {
      setSlide(3);
    } else if (slide === 3) {
      setUserName(user);
      setUserGender(gender);
      setUserProfilePicture(profilePicture);
      localStorage.setItem("username", JSON.stringify(user));
      localStorage.setItem("gender", JSON.stringify(gender));
      localStorage.setItem("profilePicture", JSON.stringify(profilePicture));
      window.location.href = "/user-profile";
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="profile">
      <div className="logo">
        <span className="logo container">
          <h1 className="text">LEARN</h1>
          <h2 className="nola">Nola</h2>
        </span>
      </div>

      <form onSubmit={handleFormSubmission} className="enter-profile-defails">
        {slide === 1 && (
          <div>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              name="name"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="John Doe..."
              required
            />
          </div>
        )}

        {slide === 2 && (
          <div>
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}

        {slide === 3 && (
          <div>
            <label htmlFor="picture">Choose Profile Picture</label>
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={handlePictureChange}
              required
            />
            {profilePicture && (
              <img
                src={profilePicture}
                alt="Profile Preview"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            )}
          </div>
        )}

        <button type="submit">{slide === 3 ? "Finish" : "Next"}</button>
      </form>
    </main>
  );
};

export default SetProfile;
