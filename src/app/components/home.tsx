"use client";
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import { MaskPage } from "./mask-page";
import { Path } from "../constant";
import ChatPage from "./chat-page";
import SideBar from "./sidebar";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <Router>
    <div className={styles.container}>
      <SideBar />

      <div className={styles["window-content"]} >
        <Routes>
          <Route path={Path.Home} element={<MaskPage />} />
          <Route path={Path.Chat} element={<ChatPage />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}
