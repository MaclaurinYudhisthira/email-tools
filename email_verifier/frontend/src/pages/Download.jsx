import axios from "axios";

export default function Download() {
  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/download/processed_a.xlsx", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "processed_file.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert(error.response?.data?.detail || "Download failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen coolinput">
      <h2 className="text-xl font-bold">Download Processed File</h2>
      <button onClick={handleDownload} className="bg-blue-500 text-white p-2 ">Download</button>
    </div>
  );
}

// import { useState } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

// export default function Upload({ isAuthenticated,handleLogout }) {
//   const [file, setFile] = useState(null);
//   const [resultFiles, setResultFiles] = useState([]);

//   const handleUpload = async () => {
//     if (!file) return alert("Please select a file");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post("http://localhost:8000/upload/", formData, {
//         headers: { Authorization: `Bearer ${token}` },
//         responseType: "blob",
//       });

//       let fileName = "downloaded_file";
//       const contentDisposition = response.headers.get("Content-Disposition");
//       if (contentDisposition) {
//         const match = contentDisposition.match(/filename="?([^"]+)"?/);
//         if (match) {
//           fileName = match[1];
//         }
//       }
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", fileName);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       alert(error.response?.data?.detail || "Upload failed");
//     }
//   };

//   return (
//     <>
//       <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
//       <div className="coolinput mail_section a_section ">
//         <div>
//           <div className="formdiv invisible-bg">
//           <h1 className="text-xl font-bold">Result Files</h1>
//           <div style={{minHeight:"10vh", alignContent:"middle"}}>
//             <p>Result files will show up here</p>
//           </div>
//           </div>
//         </div>
//         <div className="formdiv invisible-bg">
//           <h1 className="text-xl font-bold">Upload CSV/XLSX</h1>
//           <div className="input-box">
//             <input type="file" onChange={(e) => setFile(e.target.files[0])} className="border p-2 input" />
//           </div>
//           <div className="button">
//           <button onClick={handleUpload} className="bg-blue-500 text-white p-2 mt-2">Upload</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }