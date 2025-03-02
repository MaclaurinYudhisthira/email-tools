import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8000/upload/", formData, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      let fileName = "downloaded_file";
      const contentDisposition = response.headers.get("Content-Disposition");
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match) {
          fileName = match[1];
        }
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(error.response?.data?.detail || "Upload failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen coolinput">
      <h2 className="text-xl font-bold">Upload CSV/XLSX</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border p-2 input" />
      <button onClick={handleUpload} className="bg-blue-500 text-white p-2 mt-2">Upload</button>
    </div>
  );
}
