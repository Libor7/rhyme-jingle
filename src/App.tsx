/** COMPONENTS */
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";
import MainContent from "./components/layout/main-content/MainContent";

/** HOOKS */
import useWindowSize from "./hooks/useWindowSize";

/** LIBRARIES */
import React from "react";

/** STYLES */
import styles from "./App.module.css";

function App() {
  const windowWidth = useWindowSize();

  const isSmall = windowWidth <= 480;

  return (
    <div className={styles['app-container']}>
      <Header />
      <MainContent />
      {isSmall && <Footer />}
    </div>
  );
}

export default App;
