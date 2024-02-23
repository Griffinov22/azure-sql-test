import { useEffect, useState } from "react";
import Axios from "axios";

const PostArchive = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_BASE_URL}/posts`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setError(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);

  const errorMessage = (
    <div className="w-100">
      <p className="text-center text-danger fw-bold" style={{ maxWidth: "none" }}>
        There was an error getting the posts. Try again later
      </p>
    </div>
  );

  return (
    <div className="container">
      <h1>Archive Posts</h1>
      {error ? (
        errorMessage
      ) : (
        <div className="archive-grid">
          {posts.map((obj, ind) => {
            return (
              <div key={ind} className="card">
                <img
                  className="card-img-top"
                  style={{ width: "200px", height: "225px", objectFit: "cover" }}
                  src={
                    obj.pictureData
                      ? `data:image/${obj.pictureData.extension};base64,${obj.pictureData.data}`
                      : "https://placehold.co/200x100"
                  }
                  alt="Card image cap"
                />
                <div className="card-body">
                  <h5 className="card-title mb-4">{obj.title}</h5>
                  <a href="#" className="btn btn-primary">
                    See Full Post
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostArchive;
