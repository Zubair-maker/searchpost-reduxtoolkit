import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPost } from "../redux/Reducer/searchPostSlice";
import Spinner from "./utils/Spinner";

const FetchPost = () => {
  const [id, setId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, post, error } = useSelector((state) => state.searchPost);

  const handlePost = () => {
    if (!id) {
      window.alert("please type valid Id");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };
  
  return (
    <>
      <div className="container col-10 mt-4">
        <div className="mb-4">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Fecth Post
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="search post"
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handlePost}>
          Fech Post
        </button>
        &nbsp;
        <button
          className="btn btn-danger"
          onClick={() => navigate("/createpost")}
        >
          Create Post
        </button>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
           <Spinner/>
        </div>
      ) : (
        <>
          <div
            className="container card text-bg-info  mb-3 mt-3"
            style={{ maxWidth: "50rem" }}
          >
            <div className="card-header text-white pl-1" style={{ height: "50px" }}>
              {post.length >0 && post[0].title}
            </div>
            <div className="card-body" style={{ height: "150px" }}>
              <p className="card-text p-2 ft-2">
                {post.length >0 &&  post[0].body}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FetchPost;
