import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/students", value)
      .then((res) => {
        toast.success("Added new student successfully"), navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card shadow" style={{ width: "600px" }}>
          <div className="card-header text-center fw-bold bg-blue-100">
            Add Student
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  onChange={(e) => setValue({ ...value, name: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
