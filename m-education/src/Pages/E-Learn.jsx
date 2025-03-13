import { useEffect, useState } from "react";
import Header from "../Components/Home/Header";

import axios from "axios";
import YouTube from "react-youtube";

function Elearn() {
  const [videos, setVideos] = useState([]);
  const API = "AIzaSyB0ym_IPaYlmwYxAdid-3D-7XF2ga4AyUc";

  useEffect(() => {
    const videoIds = "9OA757v4FAM,kqtD5dpn9C8,zOjov-2OZ0E, pTnEG_WGd2Q";
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIds}&key=${API}`;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setVideos(response.data.items);
        console.log(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [API]);

  const opts = {
    playerVars: {
      autoplay: 0,
      height: "300",
      width: "300",
    },
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main className="e-learn">
        <form>
          <label htmlFor="search">Search Videos</label>
          <input type="text" placeholder="Search Videos" />
          <button>Search</button>
        </form>
        <article className="video-container">
          <ul>
            {videos.map((video) => (
              <li key={video.id} className="video-list">
                <YouTube videoId={video.id} opts={opts} className="video" />
                <p>{video.snippet.title}</p>
              </li>
            ))}
          </ul>
        </article>
      </main>
    </>
  );
}

export default Elearn;
