import { useContext } from "react";
import { getSongs } from "../service/song.api";
import { SongContext } from "../song.context";

export const useSong = () => {
  const context = useContext(SongContext);

  const {
    loading,
    setLoading,
    song,
    setSong,
    songs,
    setSongs,
    currentIndex,
    setCurrentIndex,
  } = context;

  async function handleGetSongs({ mood }) {
    setLoading(true);
    try {
      const data = await getSongs({ mood });
      const moodSongs = data.songs || [];

      setSongs(moodSongs);
      setCurrentIndex(0);
      setSong(moodSongs[0] || null);
    } catch (error) {
      console.error("Error fetching songs:", error);
      setSongs([]);
      setCurrentIndex(0);
      setSong(null);
    } finally {
      setLoading(false);
    }
  }

  function goToNextSong() {
    if (!songs.length) return;

    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    setSong(songs[nextIndex]);
  }

  function goToPreviousSong() {
    if (!songs.length) return;

    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(previousIndex);
    setSong(songs[previousIndex]);
  }

  return {
    loading,
    song,
    songs,
    currentIndex,
    handleGetSongs,
    goToNextSong,
    goToPreviousSong,
  };
};