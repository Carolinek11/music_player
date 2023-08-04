import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faPlay,
  faPause,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [musicPath, setMusicPath] = useState("");
  // const [index, setIndex] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, serCurrentTime] = useState(0);
  const [progressWidth, setProgressWidth] = useState("0px");
  const audioRef = useRef();
  const musics = [
    {
      id: 1,
      path: "../Public/music/track-1.mp4",
      title: "Without You - G-Dragon & Rose",
    },
    {
      id: 2,
      path: "../Public/music/track-2.mp4",
      title: "Shut Down - Blackpink",
    },
    { id: 3, path: "../Public/music/track-3.mp4", title: "Jericho - Iniko" },
    { id: 4, path: "../Public/music/track-4.mp4", title: "Money - Lisa" },
  ];

  const trackItemClickHandler = (music) => {
    setMusicPath(music.path);
    setIsPlaying(true);
  };

  const playClickHandler = () => {
    setIsPlaying((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const pauseClickHandler = () => {
    setIsPlaying((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.play();
    }
    if (currentTime === 0) {
      setMusicPath(musics[0].path);
    }
  };

  const handleLoadedData = (e) => {
    const audioElement = e.target;
    setDuration(audioElement.duration);
  };

  const timeUpdateHandler = () => {
    serCurrentTime(audioRef.current.currentTime);
    const newProgressWidth = `${
      (400 / Math.floor(duration)).toString() * currentTime
    }px`;
    setProgressWidth(newProgressWidth);
  };

  const prevBtnClickHandler = () => {
    if (audioRef.current.play()) {
      setIsPlaying(true);
    }
    if (currentTime === 0) {
      setMusicPath(musics[0].path);
      return;
    }
    const pathToFind = musicPath;
    let index = musics.findIndex((music) => music.path === pathToFind);
    if (index === 0) {
      index = musics.length;
      setMusicPath(() => musics[index - 1].path);
    } else {
      setMusicPath(() => musics[index - 1].path);
    }
  };

  const nextBtnClickHandler = () => {
    if (audioRef.current.pause()) {
      setIsPlaying(false);
    }
    const pathToFind = musicPath;
    const lastIndex = musics.length - 1;
    let index = musics.findIndex((music) => music.path === pathToFind);
    if (index === lastIndex) {
      index = 0;
      setMusicPath(() => musics[index].path);
    } else {
      setMusicPath(() => musics[index + 1].path);
    }
  };

  return (
    <div className="container">
      {musics.map((music) => {
        return (
          <div className="playListContainer" key={music.id}>
            <div
              className="TrackItem"
              onClick={() => trackItemClickHandler(music)}
            >
              {music.id}. {music.title}
            </div>
          </div>
        );
      })}
      <audio
        src={musicPath}
        autoPlay
        ref={audioRef}
        onLoadedData={handleLoadedData}
        onTimeUpdate={timeUpdateHandler}
      >
        Your Browser Doesn't support audio element
      </audio>
      <div className="audioTime">
        {`${Math.floor(currentTime / 60)
          .toString()
          .padStart(2, "0")}:${Math.floor(currentTime % 60)
          .toString()
          .padStart(2, "0")}`}
        /
        {`${Math.floor(duration / 60)
          .toString()
          .padStart(2, "0")}:${Math.floor(duration % 60)
          .toString()
          .padStart(2, "0")}`}
      </div>
      <div className="progressBar">
        <div
          className="currentProgress"
          style={{
            width: `${progressWidth}`,
            // width: "300px",
          }}
        ></div>
      </div>
      <div className="icons">
        <FontAwesomeIcon
          icon={faBackwardStep}
          className="icon"
          onClick={prevBtnClickHandler}
        />
        {isPlaying ? (
          <FontAwesomeIcon
            icon={faPause}
            className="icon clickIcon"
            onClick={playClickHandler}
          />
        ) : (
          <FontAwesomeIcon
            icon={faPlay}
            className="icon clickIcon"
            onClick={pauseClickHandler}
          />
        )}

        <FontAwesomeIcon
          icon={faForwardStep}
          className="icon"
          onClick={nextBtnClickHandler}
        />
      </div>
    </div>
  );
}

export default App;
