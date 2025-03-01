import React, { useState } from "react";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [processedFile, setProcessedFile] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file!");

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8000/upload/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setProcessedFile(response.data.processed_file);
        } catch (error) {
            alert("File upload failed!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/download/${processedFile}`, {
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", processedFile);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            alert("Download failed!");
            console.error(error);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <input type="file" onChange={handleFileChange} />
            <Button variant="contained" onClick={handleUpload} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Upload & Process"}
            </Button>

            {processedFile && (
                <Button variant="contained" color="success" onClick={handleDownload} style={{ marginLeft: "10px" }}>
                    Download Processed File
                </Button>
            )}
        </div>
    );
};

export default FileUpload;
