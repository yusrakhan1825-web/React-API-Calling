
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <header className="navbar">
        <h2>PeopleHub<span>.</span></h2>
        <p>Discover People</p>
      </header>

      <main className="container">
        <section className="hero">
          <span className="tag">USER DIRECTORY</span>
          <h1>Meet Our <span>Community</span></h1>
          <p>Explore people from around the world.</p>
        </section>

        <div className="stats">
          <div>
            <h2>{users.length}</h2>
            <p>Total Users</p>
          </div>
          <div>
            <h2>Global</h2>
            <p>Community</p>
          </div>
        </div>

        <h2 className="section-title">Our Members</h2>

        {loading && <p className="message">Loading users...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <div className="user-grid">
            {users.map((user) => (
              <div className="user-card" key={user.id}>
                <img src={user.image} alt={user.firstName} />

                <h3>{user.firstName} {user.lastName}</h3>

                <p className="email">{user.email}</p>

                <div className="user-info">
                  <span>Age: {user.age}</span>
                  <span>{user.gender}</span>
                </div>

                <p className="company">{user.company.name}</p>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer>
        <p>© 2026 PeopleHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
