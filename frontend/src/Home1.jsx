import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import "./App.css";
import { Link } from "react-router-dom";

function Home1() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    loadStudent();
  }, []);
  function loadStudent() {
    axios
      .get("http://localhost:8081/students")
      .then((res) => {
        setStudents(res.data);
        console.log("data fetched");
      })
      .catch((err) => console.log(err));
  }

  function deleteStudent(id) {
    axios
      .delete("http://localhost:8081/students/" + id)
      .then((res) => {
        toast.success("Student deleted successfully");
        loadStudent();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card shadow" style={{ width: "800px" }}>
          <div className="card-body"></div>
          <div className="table-responsive mx-3">
            <h2>Student list</h2>
            <div className="d-flex justify-content-end">
              <Link to={"/create"} className="btn btn-sm btn-success">
                Add +
              </Link>
            </div>

            <hr />
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="justify-content-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => {
                  return (
                    <tr key={index}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td className="justify-content-end">
                        <Link
                          to={`/read/${student.id}`}
                          className="btn btn-success btn-sm me-2"
                        >
                          Read
                        </Link>
                        <Link
                          to={`/edit/${student.id}`}
                          className="btn btn-primary me-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() =>
                            confirm("are you sure ")
                              ? deleteStudent(student.id)
                              : reurn
                          }
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home1;
