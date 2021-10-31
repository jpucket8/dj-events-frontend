import { useState } from "react";
import { API_URL } from "@config/index";
import Spinner from "./spinner";

import styles from "@styles/form.module.css";

export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", evtId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
      setLoading(false);
    }
  };

  const handleFileChange = e => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={loading ? "disabled btn btn-upload" : "btn btn-upload"}>
          {loading ? <Spinner size="sm" /> : ""} Upload
        </button>
      </form>
    </div>
  );
}
