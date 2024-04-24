import React from "react";

/* Обертка контента основной страницы */
const MainLayout = ({ children }) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
