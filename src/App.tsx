import { useState, useEffect } from "react";
import "./App.css";
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
      {nasaData &&
        nasaData.map((item: any, index: number) => {
          return (
            <div className="card">
              <ul>
                <li>
                  <img src={item.hdurl} alt={item.title} />
                </li>
                <li>{item.title}</li>
                <li>{item.date}</li>
                <li>{item.explanation}</li>             
                {!likedPosts.includes(index) ? (
                  <button onClick={() => onLikePosts(index)}>Like</button>
                ):<button onClick={() => onRemoveLike(index)}>Unlike</button>}
              </ul>
            </div>
          );
        })}
    </div>
  );
}

export default App;
