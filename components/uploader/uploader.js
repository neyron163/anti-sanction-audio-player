import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import s from "./uploader.module.css";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "100px 20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export const Uploader = (props) => {
  const [progress, setProgress] = useState("");
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ accept: { ".mp3,audio/*": [] } });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    if (acceptedFiles.length) {
      let formData = new FormData();
      acceptedFiles.forEach((file) => {
        formData.append("music", file, file.name);
      });
      const config = {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: (event) => {
          setProgress(`${Math.round((event.loaded * 100) / event.total)}`);
        },
      };

      axios
        .post("/api/uploads", formData, config)
        .then(({ data: { data } }) => {
          localStorage.setItem("music", JSON.stringify(data));
          props.setMusicList(data);
        });
    }
  }, [acceptedFiles.length]);

  useEffect(() => {
    if (progress === "100") {
      setProgress("");
    }
  }, [progress]);

  useEffect(() => {
    props.setMusicList(JSON.parse(localStorage.getItem("music") || "[]"));
  }, []);

  return (
    <div className={s.container}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p className={s.text}>
          {progress
            ? `Напрягаюсь и загружаю погоди => ${progress}`
            : `Нажимай и загружай свою любимую музыку`}
        </p>
      </div>
    </div>
  );
};
