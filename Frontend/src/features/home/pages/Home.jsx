import React from "react";
import { useNavigate } from "react-router-dom";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hooks/useSong";
import Navbar from "../../shared/components/Navbar";
import { logout } from "../../auth/services/auth.api";

const Home = () => {
  const { handleGetSongs } = useSong();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <Navbar />

      <button className="button logout-btn" onClick={onLogout} aria-label="Logout">
        Logout
      </button>

      <FaceExpression
        onClick={(expression) => {
          handleGetSongs({ mood: expression });
        }}
      />
      <Player />
    </>
  );
};

export default Home;
