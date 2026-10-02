import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    department: "",
    year: "",
    event: "",
    skills: [],
    address: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        skills: [...formData.skills, value]
      });
    } else {
      setFormData({
        ...formData,
        skills: formData.skills.filter(
          (skill) => skill !== value
        )
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      gender: "",
      department: "",
      year: "",
      event: "",
      skills: [],
      address: ""
    });

    setSubmitted(false);
  };

  return (
    <div className="page">

      <nav className="navbar">
        <h2>Campus Events</h2>

        <div>
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#register">Register</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <h1>College Event Registration</h1>

        <p>
          Register for exciting college events and showcase
          your skills.
        </p>

        <a href="#register" className="hero-button">
          Register Now
        </a>
      </section>

      <section className="events" id="events">

        <h2>Upcoming Events</h2>

        <div className="event-container">

          <div className="event-card">
            <h3>Hackathon</h3>
            <p>
              Build innovative solutions and compete with
              talented students.
            </p>
          </div>

          <div className="event-card">
            <h3>Paper Presentation</h3>
            <p>
              Present your research ideas and technical
              knowledge.
            </p>
          </div>

          <div className="event-card">
            <h3>Coding Contest</h3>
            <p>
              Test your programming and problem-solving
              skills.
            </p>
          </div>

        </div>

      </section>

      <section className="registration" id="register">

        <div className="form-card">

          <h2>Event Registration</h2>

          <p className="subtitle">
            Fill in your details to register.
          </p>

          {submitted && (
            <div className="success">
              Registration successful!
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />

            <label>Gender</label>

            <div className="options">

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  required
                />
                Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                Female
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                />
                Other
              </label>

            </div>

            <label>Department</label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Department
              </option>

              <option value="CSE">
                CSE
              </option>

              <option value="AI & ML">
                AI & ML
              </option>

              <option value="ECE">
                ECE
              </option>

              <option value="EEE">
                EEE
              </option>

              <option value="MECH">
                MECH
              </option>

              <option value="CIVIL">
                CIVIL
              </option>
            </select>

            <label>Year</label>

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Year
              </option>

              <option value="1st Year">
                1st Year
              </option>

              <option value="2nd Year">
                2nd Year
              </option>

              <option value="3rd Year">
                3rd Year
              </option>

              <option value="4th Year">
                4th Year
              </option>
            </select>

            <label>Choose Event</label>

            <select
              name="event"
              value={formData.event}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Event
              </option>

              <option value="Hackathon">
                Hackathon
              </option>

              <option value="Paper Presentation">
                Paper Presentation
              </option>

              <option value="Coding Contest">
                Coding Contest
              </option>
            </select>

            <label>Skills</label>

            <div className="options">

              <label>
                <input
                  type="checkbox"
                  value="Python"
                  checked={formData.skills.includes("Python")}
                  onChange={handleSkillChange}
                />
                Python
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Java"
                  checked={formData.skills.includes("Java")}
                  onChange={handleSkillChange}
                />
                Java
              </label>

              <label>
                <input
                  type="checkbox"
                  value="C++"
                  checked={formData.skills.includes("C++")}
                  onChange={handleSkillChange}
                />
                C++
              </label>

              <label>
                <input
                  type="checkbox"
                  value="Web Development"
                  checked={formData.skills.includes(
                    "Web Development"
                  )}
                  onChange={handleSkillChange}
                />
                Web Development
              </label>

            </div>

            <label>Address</label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              rows="4"
              required
            ></textarea>

            <div className="buttons">

              <button type="submit">
                Register
              </button>

              <button
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>

            </div>

          </form>

        </div>

      </section>

      <footer id="contact">
        <p>
          © 2026 Campus Events | College Event Registration
        </p>
      </footer>

    </div>
  );
}

export default App;