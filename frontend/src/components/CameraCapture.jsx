import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Camera, 
  SwitchCamera, 
  RotateCcw, 
  Check, 
  Upload, 
  AlertCircle,
  HelpCircle,
  Eye
} from 'lucide-react';

export default function CameraCapture({ onPhotosReady }) {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0); // 0, 1, 2, 3
  const [photos, setPhotos] = useState({
    whole_plant: null,
    leaf_closeup: null,
    graft_joint: null,
    fruit_shoot: null
  });

  const [previews, setPreviews] = useState({
    whole_plant: null,
    leaf_closeup: null,
    graft_joint: null,
    fruit_shoot: null
  });

  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState('environment'); // 'environment' (back) or 'user' (front)
  const [cameraError, setCameraError] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const steps = [
    {
      key: 'whole_plant',
      title: t('scan.capture_view_1'),
      hint: t('scan.capture_view_1_hint'),
      guideShape: 'box'
    },
    {
      key: 'leaf_closeup',
      title: t('scan.capture_view_2'),
      hint: t('scan.capture_view_2_hint'),
      guideShape: 'grid'
    },
    {
      key: 'graft_joint',
      title: t('scan.capture_view_3'),
      hint: t('scan.capture_view_3_hint'),
      guideShape: 'circle'
    },
    {
      key: 'fruit_shoot',
      title: t('scan.capture_view_4'),
      hint: t('scan.capture_view_4_hint'),
      guideShape: 'target'
    }
  ];

  const currentStep = steps[activeStep];

  // Start real device camera (FR5)
  const startCamera = async (mode = facingMode) => {
    setCameraError(null);
    if (streamRef.current) {
      stopCamera();
    }

    try {
      const constraints = {
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err) {
      console.warn("Camera access failed or unavailable:", err);
      setCameraError("Camera unavailable or permission denied. You can select photos from storage below.");
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const flipCamera = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Capture current video frame to canvas
  const captureFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const file = new File([blob], `${currentStep.key}.jpg`, { type: 'image/jpeg' });
      const previewUrl = URL.createObjectURL(blob);

      setPhotos(prev => ({ ...prev, [currentStep.key]: file }));
      setPreviews(prev => ({ ...prev, [currentStep.key]: previewUrl }));

      // Automatically advance step if not last
      if (activeStep < steps.length - 1) {
        setActiveStep(prev => prev + 1);
      }
    }, 'image/jpeg', 0.88);
  };

  // File upload fallback
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPhotos(prev => ({ ...prev, [currentStep.key]: file }));
    setPreviews(prev => ({ ...prev, [currentStep.key]: previewUrl }));

    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const retakePhoto = (key, stepIdx) => {
    setPhotos(prev => ({ ...prev, [key]: null }));
    setPreviews(prev => ({ ...prev, [key]: null }));
    setActiveStep(stepIdx);
    if (!cameraActive) {
      startCamera();
    }
  };

  const allCaptured = photos.whole_plant && photos.leaf_closeup && photos.graft_joint && photos.fruit_shoot;

  useEffect(() => {
    if (allCaptured) {
      onPhotosReady(photos);
    }
  }, [photos, allCaptured]);

  return (
    <div className="space-y-4">
      {/* 4 Steps Indicator Bar */}
      <div className="grid grid-cols-4 gap-2">
        {steps.map((st, idx) => {
          const isDone = !!photos[st.key];
          const isCurrent = activeStep === idx;
          return (
            <button
              key={st.key}
              onClick={() => setActiveStep(idx)}
              className={`p-2 rounded-xl text-center border transition-all flex flex-col items-center ${
                isDone
                  ? 'bg-leaf/10 border-leaf/30 text-leaf'
                  : isCurrent
                  ? 'bg-orange/10 border-orange text-orange-deep font-bold ring-2 ring-orange/30'
                  : 'bg-white border-ink/10 text-muted opacity-80'
              }`}
            >
              <div className="flex items-center space-x-1 text-xs mb-1">
                {isDone ? (
                  <Check className="w-3.5 h-3.5 text-leaf font-bold" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-ink/10 text-ink text-[10px] flex items-center justify-center font-bold">
                    {idx + 1}
                  </span>
                )}
                <span className="font-semibold truncate max-w-[60px] sm:max-w-none">
                  {idx === 0 ? 'Whole' : idx === 1 ? 'Leaf' : idx === 2 ? 'Graft' : 'Shoot'}
                </span>
              </div>
              <div className="w-full h-1 rounded-full bg-ink/10 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    isDone ? 'bg-leaf w-full' : isCurrent ? 'bg-orange w-1/2' : 'w-0'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Viewfinder / Photo Area */}
      <div className="relative rounded-3xl overflow-hidden bg-ink/90 border-2 border-ink/20 aspect-[4/3] sm:aspect-video flex items-center justify-center shadow-paper-lg">
        {previews[currentStep.key] ? (
          // Captured Preview
          <div className="relative w-full h-full">
            <img
              src={previews[currentStep.key]}
              alt={currentStep.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-leaf flex items-center space-x-1.5 shadow">
              <Check className="w-3.5 h-3.5" />
              <span>Captured: {currentStep.title}</span>
            </div>

            <button
              onClick={() => retakePhoto(currentStep.key, activeStep)}
              className="absolute bottom-4 right-4 bg-white/95 text-ink hover:bg-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-paper flex items-center space-x-1.5 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4 text-orange-deep" />
              <span>{t('scan.retake')}</span>
            </button>
          </div>
        ) : cameraActive ? (
          // Live Video Feed with Framing Overlay
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              playsInline
              autoPlay
              muted
              className="w-full h-full object-cover"
            />

            {/* Camera Overlay Guide (PRD Section 11: Liquid glass on camera overlay) */}
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-between p-4">
              <div className="liquid-glass-dark px-3 py-1.5 rounded-full text-white text-xs font-medium flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-verdict-reject animate-ping" />
                <span>{currentStep.title}</span>
              </div>

              {/* Guiding Target */}
              {currentStep.guideShape === 'circle' && (
                <div className="w-44 h-44 rounded-full border-2 border-dashed border-white/80 flex items-center justify-center">
                  <span className="text-[11px] text-white/90 bg-black/40 px-2 py-0.5 rounded">
                    Bud Union Interface (15-20cm)
                  </span>
                </div>
              )}
              {currentStep.guideShape === 'grid' && (
                <div className="w-48 h-48 border-2 border-white/70 grid grid-cols-2 grid-rows-2">
                  <div className="border-r border-b border-white/40" />
                  <div className="border-b border-white/40" />
                  <div className="border-r border-white/40" />
                  <div />
                </div>
              )}
              {currentStep.guideShape === 'box' && (
                <div className="w-56 h-72 border-2 border-dashed border-white/80 rounded-2xl flex items-center justify-center">
                  <span className="text-[11px] text-white/90 bg-black/40 px-2 py-0.5 rounded">
                    Whole Sapling in Polybag
                  </span>
                </div>
              )}

              <p className="liquid-glass-dark px-4 py-1.5 rounded-xl text-white/90 text-xs text-center max-w-sm">
                {currentStep.hint}
              </p>
            </div>

            {/* Shutter & Camera Controls */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center space-x-6 z-20">
              <button
                type="button"
                onClick={flipCamera}
                className="w-11 h-11 rounded-full liquid-glass-dark text-white flex items-center justify-center active:scale-95 transition-all"
                title={t('scan.switch_camera')}
              >
                <SwitchCamera className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={captureFrame}
                className="w-16 h-16 rounded-full bg-white border-4 border-orange p-1 shadow-glass active:scale-90 transition-transform flex items-center justify-center group"
                title={t('scan.capture_photo')}
              >
                <div className="w-full h-full rounded-full bg-orange-deep group-hover:bg-orange transition-colors flex items-center justify-center">
                  <Camera className="w-7 h-7 text-white" />
                </div>
              </button>

              <button
                type="button"
                onClick={stopCamera}
                className="w-11 h-11 rounded-full liquid-glass-dark text-white text-xs flex items-center justify-center active:scale-95 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          // Inactive / Start Camera Prompt
          <div className="p-6 text-center text-white max-w-sm flex flex-col items-center">
            <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 text-orange">
              <Camera className="w-8 h-8" />
            </div>

            <h4 className="font-serif font-bold text-lg mb-1">{currentStep.title}</h4>
            <p className="text-white/70 text-xs mb-5 leading-relaxed">{currentStep.hint}</p>

            <button
              type="button"
              onClick={() => startCamera()}
              className="w-full py-3 bg-leaf hover:bg-leaf-fresh text-white font-serif font-bold text-sm rounded-2xl shadow-paper active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <Camera className="w-4 h-4" />
              <span>{t('scan.start_camera')}</span>
            </button>

            {/* Storage File Upload Alternative */}
            <div className="mt-3 w-full">
              <label className="w-full py-2.5 bg-white/10 hover:bg-white/20 text-white/90 text-xs font-semibold rounded-2xl border border-white/20 flex items-center justify-center space-x-2 cursor-pointer transition-all">
                <Upload className="w-3.5 h-3.5" />
                <span>{t('scan.upload_fallback')}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {cameraError && (
              <div className="mt-3 flex items-center space-x-1.5 text-orange-mango text-xs text-left">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{cameraError}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4 Small Thumbnails Overview */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-1">
        {steps.map((st, idx) => (
          <div
            key={st.key}
            onClick={() => setActiveStep(idx)}
            className={`w-20 h-16 rounded-2xl border-2 overflow-hidden flex-shrink-0 cursor-pointer relative transition-all ${
              activeStep === idx ? 'border-orange ring-2 ring-orange/30' : 'border-ink/10 opacity-70'
            }`}
          >
            {previews[st.key] ? (
              <img src={previews[st.key]} alt="" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-chalk/80 flex flex-col items-center justify-center text-[10px] text-muted p-1 text-center font-medium">
                <span>View {idx + 1}</span>
                <span className="text-[9px] text-ink/40">Empty</span>
              </div>
            )}
            {previews[st.key] && (
              <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-leaf text-white flex items-center justify-center">
                <Check className="w-2.5 h-2.5 font-bold" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
