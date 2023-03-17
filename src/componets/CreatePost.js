import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost} from "../redux/Reducer/searchPostSlice";
import Spinner from "./utils/Spinner";

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [show, setShow] = useState(false)

  const dispatch = useDispatch();
  const {loading, post} = useSelector((state)=> state.searchPost)
  
  const { title, body } = formData;

  const handlePost = (e) => {
    e.preventDefault();
    dispatch(createPost({ formData }));
    setFormData({ title: "", body: "" });
    setShow(true)
  };

  return (
    <>
      <div className="container col-10">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Write a Title"
              value={title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Body:
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              type="text"
              rows={3}
              value={body}
              onChange={(e) =>
                setFormData({ ...formData, body: e.target.value })
              }
              placeholder="Write a Body"
            />
          </div>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            GO TO Home
          </button>
          &nbsp;
          <button
            className="btn btn-success"
            type="submit"
            onClick={handlePost}
          >
            Submit
          </button>
        </form>
      </div>
      {show &&  loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div
            className="container card text-bg-info  mb-3 mt-3"
            style={{ maxWidth: "50rem" }}
          >
            <div
              className="card-header text-white pl-1"
              style={{ height: "50px" }}
            >
              {post[0].title}
            </div>
            <div className="card-body" style={{ height: "150px" }}>
              <p className="card-text p-2">{ post[0].body}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreatePost;
