import React from "react";
// import FileUpload from "./FileUpload";
import FileUpload from "./FileUpload/FileUpload";

function App() {
    return (
        <div>
            <h1 style={{ textAlign: "center" }}>CSV/XLSX Processor</h1>
            <FileUpload />
        </div>
    );
}

export default App;
