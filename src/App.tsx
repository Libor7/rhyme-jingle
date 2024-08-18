import React from "react";

/** COMPONENTS */
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import MainContent from "./components/main-content/MainContent";
import Navigation from "./components/navigation/Navigation";

/** HOOKS */
import useWindowSize from "./hooks/useWindowSize";

/** STYLES */
import styles from "./App.module.css";

function App() {
  const windowWidth = useWindowSize();

  const isSmall = windowWidth < 480;

  return (
    <div className={styles['app-container']}>
      <Header />
      <MainContent />
      {isSmall && <Footer />}
    </div>
  );
}

export default App;
