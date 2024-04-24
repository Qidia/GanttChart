import "@/styles/globals.css";
import React from "react";
import MainLayout from "../Layouts/MainLayout";

/* Корневой элемент страницы */
const App = ({ Component, pageProps }) => {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
};

export default App;
