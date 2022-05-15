import axios from "axios";
import s from "./musicList.module.css";
import classNames from "classnames";
import img from "./icon.jpg";
import deleteIcon from "./delete.png";

export const MusicList = ({
  setMusicList,
  musicList,
  currentMusic,
  setMusic,
}) => {
  const deleteMusicFromServer = (name) => {
    axios
      .delete("/api/delete", {
        data: {
          name,
        },
      })
      .then(({ data: { data } }) => {
        localStorage.setItem("music", JSON.stringify(data));
        setMusicList(data);
      });
  };

  return (
    <div className={s.container}>
      {musicList.map((name) => (
        <div className={s.flex}>
          <div
            key={name}
            className={s.containerItem}
            onClick={() => setMusic(name)}
          >
            <img src={img.src} alt="icon" className={s.icon} />
            <button
              className={classNames(s.item, {
                [s.activeItem]: name === currentMusic,
              })}
            >
              {name}
            </button>
          </div>
          <button
            onClick={() => deleteMusicFromServer(name)}
            className={s.deleteContainer}
          >
            <img src={deleteIcon.src} alt="delete" className={s.delete} />
          </button>
        </div>
      ))}
    </div>
  );
};
