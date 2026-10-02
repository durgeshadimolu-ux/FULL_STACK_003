import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    country: "",
    languages: []
  });

  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        languages: [...formData.languages, value]
      });
    } else {
      setFormData({
        ...formData,
        languages: formData.languages.filter(
          (language) => language !== value
        )
      });
    }
  };

  const getStudents = async () => {
    try {
      const response = await fetch("http://localhost:5000/students");
      const data = await response.json();

      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editId
        ? `http://localhost:5000/students/${editId}`
        : "http://localhost:5000/students";

      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(
          editId
            ? "Student updated successfully"
            : "Registration successful"
        );

        handleReset();
        getStudents();
      } else {
        setMessage(data.message || "Operation failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const handleEdit = (student) => {
    setEditId(student._id);

    setFormData({
      name: student.name,
      email: student.email,
      password: student.password,
      gender: student.gender,
      country: student.country,
      languages: student.languages
    });

    setMessage("Editing student...");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/students/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Student deleted successfully");
        getStudents();
      } else {
        setMessage(data.message || "Delete failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      gender: "",
      country: "",
      languages: []
    });

    setEditId(null);
  };

  return (
    <div className="container">

      <h1>Student Registration</h1>

      {message && (
        <div className="message">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <label>Name:</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email:</label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Gender:</label>

        <div className="radio-group">

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

        </div>

        <label>Country:</label>

        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
        </select>

        <label>Languages:</label>

        <div className="checkbox-group">

          <label>
            <input
              type="checkbox"
              value="English"
              checked={formData.languages.includes("English")}
              onChange={handleLanguageChange}
            />
            English
          </label>

          <label>
            <input
              type="checkbox"
              value="Telugu"
              checked={formData.languages.includes("Telugu")}
              onChange={handleLanguageChange}
            />
            Telugu
          </label>

          <label>
            <input
              type="checkbox"
              value="Hindi"
              checked={formData.languages.includes("Hindi")}
              onChange={handleLanguageChange}
            />
            Hindi
          </label>

        </div>

        <div className="buttons">

          <button type="submit">
            {editId ? "Update" : "Register"}
          </button>

          <button
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>

        </div>

      </form>

      <h2>Registered Students</h2>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Country</th>
            <th>Languages</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (
            <tr key={student._id}>

              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.password}</td>
              <td>{student.gender}</td>
              <td>{student.country}</td>
              <td>{student.languages.join(", ")}</td>

              <td>

                <button
                  type="button"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(student._id)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;