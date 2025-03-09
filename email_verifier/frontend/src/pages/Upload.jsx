import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Upload({ isAuthenticated, handleLogout }) {
  const [file, setFile] = useState(null);
  const [resultFiles, setResultFiles] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");
    axios.get(`http://localhost:8000/result_files?email=${email}`, {
      headers: { "x-access-token": `${token}` },
    }).then(response => {
      setResultFiles(dataresponse.data);
    })
      .catch(error => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });


  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email)

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8000/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status == 200) {
        const data = await response.data;
        setResultFiles([...resultFiles, data.file_name]);
      }

    } catch (error) {
      alert(error.response?.data?.detail || "Upload failed");
    }
  };

  return (
    <>
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <div className="coolinput mail_section a_section ">
        <div>
          <div className="formdiv invisible-bg">
            <h1 className="text-xl font-bold">Result Files</h1>
            <div style={{ minHeight: "10vh", alignContent: "middle" }}>
              {resultFiles.length > 0 ? (
                <ul>
                  {
                    resultFiles.map((item, index) => (
                      <li key={index}>
                        <div className="bg-white col-2-auto-grid-between br-2" >
                          <p>{item.result_file_name}</p>
                          <button onClick={() => { alert("Downloading") }} style={{ width: "8vw" }}>Download</button>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              ) : (
                <p>Result files will show up here</p>
              )
              }

            </div>
          </div>
        </div>
        <div className="formdiv invisible-bg">
          <h1 className="text-xl font-bold">Upload CSV/XLSX</h1>
          <div className="input-box">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border p-2 input" />
          </div>
          <div className="button">
            <button onClick={handleUpload} className="bg-blue-500 text-white p-2 mt-2">Upload</button>
          </div>
        </div>
      </div>
    </>
  );
}