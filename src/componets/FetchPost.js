import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deletePost,
  editPost,
  getPost,
  updatePost,
} from "../redux/Reducer/searchPostSlice";
import Spinner from "./utils/Spinner";

const FetchPost = () => {
  const [id, setId] = useState("");
  const [textEdit, setTextEdit] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, post, edit, body } = useSelector(
    (state) => state.searchPost
  );

  const handlePost = () => {
    if (!id) {
      window.alert("please type valid Id");
    } else {
      dispatch(getPost({ id }));
      setId("");
    }
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
    window.location.reload();
    window.alert("Post deleted!!");
  };

  useEffect(() => {
    if (body) {
      setTextEdit(body);
    }
  }, [body]);

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
              {post.length > 0 && post[0].title}
            </div>
            <div className="card-body" style={{ height: "150px" }}>
              {edit ? (
                <>
                  <label className="form-label">Body:</label>
                  <textarea
                    type="text"
                    className="form-control mb-2"
                    value={textEdit}
                    onChange={(e) => setTextEdit(e.target.value)}
                    placeholder="Add Post description"
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      dispatch(
                        editPost({
                          id: post[0].id,
                          title: post[0].title,
                          body: textEdit,
                        })
                      );
                      dispatch(updatePost({ edit: false, body: "" }));
                    }}
                  >
                    Save
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      dispatch(updatePost({ edit: false, body: "" }))
                    }
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p className="card-text">{post.length > 0 && post[0].body}</p>
                </>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-evenly mb-4 ">
            {!edit && (
              <>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(post[0].id)}
                >
                  Delete Post
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() =>
                    dispatch(updatePost({ edit: true, body: post[0].body }))
                  }
                >
                  Edit Post
                </button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default FetchPost;
