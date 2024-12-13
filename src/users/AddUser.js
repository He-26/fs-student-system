// import axios from "axios";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function AddUser() {
//   let navigate = useNavigate();

//   const [user, setUser] = useState({
//     name: "",
//     username: "",
//     email: "",
//   });

//   const { name, username, email } = user;

//   const onInputChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:8080/user", user);
//     if(user.username.length<3){
//       alert("username should be minimum length 3");
//     }
//     navigate("/");
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
//           <h2 className="text-center m-4">Register User</h2>

//           <form onSubmit={(e) => onSubmit(e)}>
//             <div className="mb-3">
//               <label htmlFor="Name" className="form-label">
//                 Name
//               </label>
//               <input
//                 type={"text"}
//                 className="form-control"
//                 placeholder="Enter your name"
//                 name="name"
//                 value={name}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="Username" className="form-label">
//                 Username
//               </label>
//               <input
//                 type={"text"}
//                 className="form-control"
//                 placeholder="Enter your username"
//                 name="username"
//                 value={username}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="Email" className="form-label">
//                 E-mail
//               </label>
//               <input
//                 type={"text"}
//                 className="form-control"
//                 placeholder="Enter your e-mail address"
//                 name="email"
//                 value={email}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>
//             <button type="submit" className="btn btn-outline-primary">
//               Submit
//             </button>
//             <Link className="btn btn-outline-danger mx-2" to="/">
//               Cancel
//             </Link>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { name, username, email } = user;

  const [feedback, setFeedback] = useState({
    name: "",
    username: "",
    email: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Live validation and feedback
    if (name === "name") {
      if (/^[a-zA-Z ]{5,10}$/.test(value)) {
        setFeedback((prev) => ({ ...prev, name: "✅ Valid name" }));
      } else {
        setFeedback((prev) => ({
          ...prev,
          name: "❌ Name should be 5-10 characters and no special characters.",
        }));
      }
    }

    if (name === "username") {
      if (value.length >= 5) {
        setFeedback((prev) => ({ ...prev, username: "✅ Valid username" }));
      } else {
        setFeedback((prev) => ({
          ...prev,
          username: "❌ Username should be at least 5 characters.",
        }));
      }
    }

    if (name === "email") {
      if (/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
        setFeedback((prev) => ({ ...prev, email: "✅ Valid Gmail address" }));
      } else {
        setFeedback((prev) => ({
          ...prev,
          email: "❌ Please enter a valid Gmail address.",
        }));
      }
    }
  };

  const validateInputs = () => {
    const nameRegex = /^[a-zA-Z ]{5,10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!nameRegex.test(name)) {
      alert("Name should be 5-10 characters and contain no special characters.");
      return false;
    }
    if (username.length < 5) {
      alert("Username should be at least 5 characters long.");
      return false;
    }
    if (!emailRegex.test(email)) {
      alert("Email should be a valid Gmail address.");
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    await axios.post("http://localhost:8080/user", user);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
              <small className="text-muted">{feedback.name}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
              <small className="text-muted">{feedback.username}</small>
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your Gmail address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
              <small className="text-muted">{feedback.email}</small>
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
