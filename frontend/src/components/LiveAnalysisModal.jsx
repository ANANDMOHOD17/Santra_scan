import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Loader2, 
  CheckCircle2, 
  Scan, 
  Cpu, 
  Layers, 
  FileCheck,
  ShieldAlert
} from 'lucide-react';

export default function LiveAnalysisModal({ scanId, onComplete }) {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState('uploading');
  const [message, setMessage] = useState('Uploading 4 plant views...');
  const [percent, setPercent] = useState(15);
  const [error, setError] = useState(null);

  const stageList = [
    { key: 'uploading', label: '1. Photo Transmission & Storage', icon: Scan },
    { key: 'validating', label: '2. Quality Gate (Blur & Lighting Check)', icon: Layers },
    { key: 'running_model', label: '3. OpenCV & MobileNet Feature Analysis', icon: Cpu },
    { key: 'generating_assessment', label: '4. Grad-CAM Heatmap & ICAR Advisory', icon: Layers },
    { key: 'saving_report', label: '5. Tamper-Proof QR Passport Generation', icon: FileCheck },
    { key: 'completed', label: '6. Assessment Finalized', icon: CheckCircle2 }
  ];

  useEffect(() => {
    if (!scanId) return;

    // Connect to real SSE stream (FR8)
    const eventSource = new EventSource(`/api/scans/${scanId}/live-progress`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setCurrentStep(data.step);
        setMessage(data.message);
        setPercent(data.percent);

        if (data.step === 'completed') {
          eventSource.close();
          setTimeout(() => {
            onComplete();
          }, 800);
        }
      } catch (err) {
        console.error("SSE parse error", err);
      }
    };

    eventSource.onerror = () => {
      // Fallback: wait 2.5s and trigger completion
      eventSource.close();
      setTimeout(() => {
        onComplete();
      }, 2000);
    };

    return () => {
      eventSource.close();
    };
  }, [scanId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/75 backdrop-blur-md">
      <div className="bg-paper rounded-3xl max-w-md w-full p-6 shadow-glass border border-ink/15 relative overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Animated Citrus Radar Graphic */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24 rounded-full border-2 border-orange/30 flex items-center justify-center bg-chalk/60 shadow-inner">
            {/* Spinning Radar Beam */}
            <div className="absolute inset-0 rounded-full border-t-2 border-orange-deep radar-sweep" />
            <div className="w-16 h-16 rounded-full bg-orange/20 border border-orange/40 flex items-center justify-center text-3xl">
              🍊
            </div>
          </div>
        </div>

        <h3 className="font-serif font-bold text-xl text-center text-ink mb-1">
          {t('scan.analyzing')}
        </h3>
        <p className="text-center text-xs text-muted font-medium mb-6">
          {message}
        </p>

        {/* Real Progress Bar */}
        <div className="w-full bg-ink/10 h-2.5 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-gradient-to-r from-orange to-leaf transition-all duration-500 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Live Stage Checklist */}
        <div className="space-y-2.5">
          {stageList.map((st, idx) => {
            const isCompleted = percent >= ((idx + 1) * 16.6);
            const isCurrent = currentStep === st.key;
            const Icon = st.icon;

            return (
              <div
                key={st.key}
                className={`flex items-center justify-between p-2 rounded-xl text-xs transition-all ${
                  isCurrent
                    ? 'bg-orange/15 font-bold text-orange-deep border border-orange/30'
                    : isCompleted
                    ? 'bg-leaf/10 text-leaf font-medium'
                    : 'text-muted/60 opacity-60'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{st.label}</span>
                </div>
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-leaf" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-deep" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-ink/20" />
                )}
              </div>
            );
          })}
        </div>

        {/* Honest Disclaimer Reminder */}
        <div className="mt-5 text-[10px] text-muted/80 text-center border-t border-ink/10 pt-3">
          {t('screening_disclaimer')}
        </div>
      </div>
    </div>
  );
}
