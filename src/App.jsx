import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadPanel from "./components/UploadPanel";

function App() {
  return (
      <div className="app-container">
        <Header />

        <main className="main-content">
          <UploadPanel />
        </main>

        <Footer />
      </div>
  );
}

export default App;