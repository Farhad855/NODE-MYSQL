import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Read = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8081/read/" + id)
      .then((res) => {
        setStudent(res.data[0]), console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="card w-50 mx-auto mt-4">
        <div className="card-header bg-white text-center">
          <h3>Student Detail</h3>
        </div>
        <div className="card-body m-3">
          <span>
            <b>ID </b>: {student.id}
          </span>
          <div>
            <b>Name : </b> {student.name}
          </div>
          <div>
            <b>Email : </b> {student.email}
          </div>
          <div>
            <b>Created Date : </b> {student.created_at}
          </div>
          <hr />
          <div className="text-center">
            <Link to={"/"} className="btn btn-sm btn-success mt-2 me-2 px-4">
              Back
            </Link>
            <Link
              to={`/edit/ ${student.id}`}
              className="btn btn-sm btn-info mt-2 px-4 "
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Read;
