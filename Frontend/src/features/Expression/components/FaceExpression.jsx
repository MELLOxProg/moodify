import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

const moodQuotes = {
  "Happy 😄": "You’re glowing. Let’s find the beat.",
  "Sad 😢": "It’s okay. Let the music speak.",
  "Surprised 😲": "Plot twist detected. Soundtrack loading...",
  "Neutral": "Show us how you feel, and we’ll find the music for it.",
  "Detecting...": "Detecting your mood...",
};

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");
  const [quote, setQuote] = useState(moodQuotes["Detecting..."]);

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleClick() {
    const detectedExpression = detect({ landmarkerRef, videoRef, setExpression });
    const nextExpression = detectedExpression || expression;
    const nextQuote = moodQuotes[nextExpression] || moodQuotes["Neutral"];

    setExpression(nextExpression);
    setQuote(nextQuote);
    onClick(nextExpression);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        style={{ width: "400px", borderRadius: "12px" }}
        playsInline
      />
      <h2>{expression}</h2>
      <button className="button" onClick={handleClick}>Detect expression</button>
      <p
        style={{
          marginTop: "12px",
          fontSize: "0.95rem",
          color: "#dfe7ff",
          maxWidth: "480px",
          marginInline: "auto",
          minHeight: "24px",
        }}
      >
        {quote}
      </p>
    </div>
  );
}
