import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadPanel from "./components/UploadPanel";


function App() {
    const [processCount, setProcessCount] = useState(null);

    return (
      <div className="app-container">
        <Header />

          <main className="main-content">
              <UploadPanel onProcessCountUpdate={setProcessCount} />
          </main>

          <Footer count={processCount} />
      </div>
  );
}

export default App;