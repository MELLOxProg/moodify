import { useContext } from "react";
import { getSongs } from "../service/song.api";
import { SongContext } from "../song.context";


export const useSong = () => {
  const context = useContext(SongContext);

  const {loading, setLoading, song, setSong} = context;
  
  async function handleGetSongs({mood}) {
    setLoading(true);
    try {
      const data = await getSongs({ mood });
      setSong(data.song);
    } catch (error) {
      console.error("Error fetching songs:", error);
    } finally {
      setLoading(false);
    }
  }
return ({loading, song, handleGetSongs});
}