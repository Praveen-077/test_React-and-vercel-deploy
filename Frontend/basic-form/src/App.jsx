import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [user, setUser] = useState({});
  const [info,setInfo] = useState([]);

  const handleForm = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("test-react-and-vercel-deploy-ej2xyzy1b.vercel.app/userInfo", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.text();
    console.log(data);
    await getUsers();
  };

  const getUsers = async () => {
    const response = await fetch("test-react-and-vercel-deploy-ej2xyzy1b.vercel.app/userInfo", {
      method: "GET",
    });
    const data = await response.json();
    setInfo(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">UserName</label>
          <input type="text" name="userName" id="user" onChange={handleForm} />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleForm}
          />
          <button className="btn btn-primary rounded-pill px-3" type="submit">
            Primary
          </button>
        </form>
      </div>
      <div>
        {info.map((user) => (
          <p key={user._id}>
            {user.userName},{user.password}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
