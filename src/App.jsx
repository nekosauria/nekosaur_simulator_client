import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadPanel from "./components/UploadPanel";
import { getCount } from "./services/api";

function App() {
    const [processCount, setProcessCount] = useState(null);
    const [styleRefImagePaths, setStyleRefImagePaths] = useState([]);

    useEffect(() => {
        getCount()
            .then(data => {
                setProcessCount(data.image_process_count);
                setStyleRefImagePaths(data.style_ref_image_paths);
            })
            .catch(() => {});
    }, []);

    return (
      <div className="app-container">
        <Header />

          <main className="main-content">
              <UploadPanel onProcessCountUpdate={setProcessCount} styleRefImagePaths={styleRefImagePaths} />
          </main>

          <Footer count={processCount} />
      </div>
  );
}

export default App;