import { useState, useEffect } from "react";
import "./App.css";

function Heart({heartColor}:any) {
  
  return (
    <svg className={heartColor} viewBox="0 0 32 29.6">
      <path
        d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
      />
    </svg>
  );
}
function App() {
  const [nasaData, setNasaData] = useState<undefined | any[]>();
  const [likedPosts, setLikePosts] = useState<number[]>([]);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?count=10&api_key=${process.env.REACT_APP_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNasaData(data);
      })
      .catch((e) => console.log(e));
  }, []);

  const onLikePosts = (index: number) => {
    let newLikePosts = [...likedPosts, index];
    setLikePosts(newLikePosts);
  };
  const onRemoveLike = (index: number) => {
    let newLikePosts = likedPosts.filter((item: any) => item !== index);
    setLikePosts(newLikePosts);
  };

  return (
    <div className="container">
      <h1>spacetagram</h1>
      {nasaData &&
        nasaData.map((item: any, index: number) => {
          return (
            <div className="card">
              <div>
                <img src={item.hdurl} alt={item.title} />
              </div>
              <div className="postHeading">
                <div>{item.title}</div>
                <div>{item.date}</div>
              </div>
              <div className="desc">{item.explanation}</div>
              <div>
                {!likedPosts.includes(index) ? (
                  <button className="liked-btn" onClick={() => onLikePosts(index)}><Heart heartColor='heart'/></button>
                ) : (
                  <button className="liked-btn" onClick={() => onRemoveLike(index)}><Heart heartColor="unlike-heart"/></button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
