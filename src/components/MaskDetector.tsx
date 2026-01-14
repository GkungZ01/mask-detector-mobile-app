import { useEffect, useRef, useState, useCallback } from "react";
import * as tmImage from "@teachablemachine/image";
import "./MaskDetector.css";

interface Prediction {
  className: string;
  probability: number;
}

const MODEL_URL = "/model/";

const MaskDetector = () => {
  const webcamContainerRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [webcam, setWebcam] = useState<tmImage.Webcam | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loopRef = useRef<boolean>(false);

  // Load the model
  useEffect(() => {
    const loadModel = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const modelURL = MODEL_URL + "model.json";
        const metadataURL = MODEL_URL + "metadata.json";

        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        setIsLoading(false);
      } catch (err) {
        console.error("Error loading model:", err);
        setError("ไม่สามารถโหลดโมเดลได้ กรุณาตรวจสอบไฟล์โมเดล");
        setIsLoading(false);
      }
    };

    loadModel();
  }, []);

  // Prediction loop
  const loop = useCallback(async () => {
    if (!loopRef.current || !webcam || !model) return;

    try {
      webcam.update();
      const prediction = await model.predict(webcam.canvas);
      setPredictions(prediction);

      if (loopRef.current) {
        window.requestAnimationFrame(loop);
      }
    } catch (e) {
      console.log("Prediction loop stopped");
    }
  }, [webcam, model]);

  // Start/Stop webcam
  const toggleWebcam = async () => {
    if (isRunning) {
      // Stop webcam
      loopRef.current = false;
      setIsRunning(false);
      setPredictions([]);

      if (webcam) {
        try {
          webcam.stop();
        } catch (e) {
          console.log("Webcam already stopped");
        }
        setWebcam(null);
      }

      // Clear webcam canvas
      if (webcamContainerRef.current) {
        webcamContainerRef.current.innerHTML = "";
      }
    } else {
      // Start webcam
      try {
        const flip = true;
        const newWebcam = new tmImage.Webcam(400, 400, flip);
        await newWebcam.setup();
        await newWebcam.play();

        if (webcamContainerRef.current) {
          webcamContainerRef.current.innerHTML = "";
          webcamContainerRef.current.appendChild(newWebcam.canvas);
        }

        setWebcam(newWebcam);
        setIsRunning(true);
        loopRef.current = true;
      } catch (err) {
        console.error("Error starting webcam:", err);
        setError("ไม่สามารถเข้าถึงกล้องได้ กรุณาอนุญาตการใช้กล้อง");
      }
    }
  };

  // Start prediction loop when webcam is ready
  useEffect(() => {
    if (webcam && model && isRunning) {
      loopRef.current = true;
      loop();
    }
  }, [webcam, model, isRunning, loop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      loopRef.current = false;
    };
  }, []);

  // Stop webcam when component unmounts or webcam changes
  useEffect(() => {
    return () => {
      if (webcam) {
        try {
          webcam.stop();
        } catch (e) {
          console.log("Webcam cleanup");
        }
      }
    };
  }, [webcam]);

  // Stop webcam when app goes to background or tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && webcam && isRunning) {
        // App went to background - stop webcam
        loopRef.current = false;
        setIsRunning(false);
        setPredictions([]);

        try {
          webcam.stop();
        } catch (e) {
          console.log("Webcam stopped on background");
        }
        setWebcam(null);

        if (webcamContainerRef.current) {
          webcamContainerRef.current.innerHTML = "";
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [webcam, isRunning]);

  return (
    <div className="mask-detector">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>Mask Detector</h1>
          <p>ระบบตรวจจับหน้ากากอนามัย</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Camera Section */}
        <div className="camera-section">
          <div className="camera-container">
            {isLoading && (
              <div className="loading-overlay">
                <div className="spinner"></div>
                <p>กำลังโหลดโมเดล AI...</p>
              </div>
            )}

            {error && (
              <div className="error-overlay">
                <span className="error-icon">❌</span>
                <p>{error}</p>
              </div>
            )}

            {!isRunning && !isLoading && !error && (
              <div className="placeholder-overlay">
                <span className="camera-icon">📹</span>
                <p>กดปุ่มด้านล่างเพื่อเริ่มต้น</p>
              </div>
            )}

            <div ref={webcamContainerRef} className="webcam-canvas"></div>
          </div>

          {/* Control Button */}
          <button className={`control-button ${isRunning ? "stop" : "start"}`} onClick={toggleWebcam} disabled={isLoading || !!error}>
            {isRunning ? (
              <>
                <span className="btn-icon">⏹️</span>
                หยุดกล้อง
              </>
            ) : (
              <>
                <span className="btn-icon">▶️</span>
                เริ่มตรวจจับ
              </>
            )}
          </button>
        </div>

        {/* Prediction Results */}
        {predictions.length > 0 && (
          <div className="predictions-section">
            <h3>📊 ผลการวิเคราะห์</h3>
            <div className="predictions-grid">
              {predictions.map((pred, index) => (
                <div key={index} className={`prediction-card ${pred.probability > 0.6 ? "high" : ""}`}>
                  <div className="prediction-header">
                    <span className="prediction-label">
                      {pred.className.toLowerCase().includes("mask") &&
                      !pred.className.toLowerCase().includes("nomask") &&
                      !pred.className.toLowerCase().includes("no mask")
                        ? "😷"
                        : "😐"}{" "}
                      {pred.className}
                    </span>
                    <span className="prediction-percentage">{(pred.probability * 100).toFixed(1)}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${pred.probability * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MaskDetector;
