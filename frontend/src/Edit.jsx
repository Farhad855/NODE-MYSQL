import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [value, setValue] = useState({
    name: "",
    email: "",
  });

  const [student, setStudent] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/students/" + id)
      .then((res) => {
        console.log(res),
          setValue({
            ...value,
            name: res.data[0].name,
            email: res.data[0].email,
          });
      })
      .catch((err) => console.log(err));
  }, []);

  const updateStudent = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:8081/students/" + id, value)
      .then((res) => {
        toast.success("Student Updated Successfully");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card shadow" style={{ width: "600px" }}>
          <div className="card-header text-center fw-bold bg-blue-100">
            Edit Student
          </div>

          <div className="card-body">
            <form onSubmit={updateStudent}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  value={value.name}
                  onChange={(e) => setValue({ ...value, name: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={value.email}
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
