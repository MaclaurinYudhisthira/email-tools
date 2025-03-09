import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Upload({ isAuthenticated, handleLogout }) {
  const [file, setFile] = useState(null);
  const [resultFiles, setResultFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  useEffect(() => {

    axios.get(`http://localhost:8000/result_files?email=${email}`, {
      headers: { "x-access-token": `${token}` },
    }).then(response => {
      setResultFiles(response.data);
    })
      .catch(error => {
        console.error("Error fetching data:", error);
      });


  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email)

    try {
      setLoading(true)
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "x-access-token": `${token}` },
      });

      if (response.status == 200) {
        const data = await response.data;
        setResultFiles([data, ...resultFiles]);
      }
      setLoading(false)
    } catch (error) {
      alert(error.response?.data?.detail || "Upload failed");
      setLoading(false)
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/download/?file_id=${id}`, {
        headers: { "x-access-token": `${token}` },
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
      alert(error.response?.data?.detail || "Download failed");
    }
  }

  return (
    <>
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />


      {loading && (
        <div style={styles.loaderOverlay}>
          <div style={styles.loader}></div>
        </div>
      )}

      <div className="coolinput mail_section a_section ">
        <div>
          <div className="formdiv invisible-bg">
            <h1 className="text-xl font-bold">Result Files</h1>
            <div style={{ minHeight: "10vh", alignContent: "middle", maxHeight: "39.3vh", overflowY: "auto", overflowX: "hidden" }}>
              {resultFiles.length > 0 ? (
                <ul>
                  {
                    resultFiles.map((item, index) => (
                      <li key={item.id}>
                        <div className="bg-white col-2-auto-grid-between br-2 m-2" >
                          <p>{item.result_file_name}</p>
                          <button onClick={() => { handleDownload(item.id) }} style={{ width: "8vw" }}>Download</button>
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

// Loader Styles
const styles = {
  loaderOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark semi-transparent background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Ensure it's on top
  },
  loader: {
    width: "50px",
    height: "50px",
    border: "6px solid #fff",
    borderTopColor: "transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// CSS Animation for Loader
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet); 