import axios from "axios";

export default function Download() {
  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/download/processed_file.csv", {
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl font-bold">Download Processed File</h2>
      <button onClick={handleDownload} className="bg-blue-500 text-white p-2">Download</button>
    </div>
  );
}
