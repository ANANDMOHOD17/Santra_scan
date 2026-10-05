import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

const RealtimeContext = createContext();

const MOCK_NURSERIES = [
  { name: "Hatla Certified Nursery", taluka: "Katol", district: "Nagpur" },
  { name: "Kalmeshwar High-Tech Citrus Station", taluka: "Kalmeshwar", district: "Nagpur" },
  { name: "Warud Model Mother Orchard", taluka: "Warud", district: "Amravati" },
  { name: "Saoner Krishi Vikas Nursery", taluka: "Saoner", district: "Nagpur" },
  { name: "Morshi Citrus Agro Nursery", taluka: "Morshi", district: "Amravati" },
  { name: "ICAR-CCRI Nagpur Experimental Nursery", taluka: "Nagpur", district: "Nagpur" }
];

const MOCK_VARIETIES = ["Nagpur Mandarin (Santra)", "Mosambi (Sweet Orange)", "Acid Lime (Kagzi Nimboo)"];

export const RealtimeProvider = ({ children }) => {
  const { demoMode, user } = useAuth();

  const [realtimeScans, setRealtimeScans] = useState([]);
  const [latestEvent, setLatestEvent] = useState(null);
  const [toastEvent, setToastEvent] = useState(null);
  const [autoStream, setAutoStream] = useState(true);
  const [liveStats, setLiveStats] = useState({
    totalDelta: 0,
    suitableDelta: 0,
    questionableDelta: 0,
    rejectDelta: 0
  });

  const streamIntervalRef = useRef(null);
  const isGeneratingRef = useRef(false);

  // Generate a live scan either through API or offline local fallback
  const triggerLiveScan = async () => {
    if (isGeneratingRef.current) return;
    isGeneratingRef.current = true;

    try {
      let scanData = null;

      try {
        const res = await fetch('/api/analytics/simulate-realtime-scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        if (res.ok) {
          const json = await res.json();
          if (json.scan) scanData = json.scan;
        }
      } catch (err) {
        // Fallback to local simulation if server is offline
      }

      if (!scanData) {
        // Authentic client-side synthetic scan
        const nursery = MOCK_NURSERIES[Math.floor(Math.random() * MOCK_NURSERIES.length)];
        const roll = Math.random();
        let verdict = 'suitable';
        let condition = 'Healthy Vigour (निरोगी)';
        let confidence = (92.5 + Math.random() * 6).toFixed(1);

        if (roll < 0.70) {
          verdict = 'suitable';
          condition = 'Healthy Vigour (निरोगी)';
        } else if (roll < 0.88) {
          verdict = 'questionable';
          const qList = [
            'Zinc Deficiency (जस्त कमतरता)',
            'Minor Graft Indentation (कलम जोड दोष)',
            'Leaf Miner Damage (नागअळी प्रादुर्भाव)'
          ];
          condition = qList[Math.floor(Math.random() * qList.length)];
          confidence = (84.0 + Math.random() * 7.5).toFixed(1);
        } else {
          verdict = 'reject';
          const rList = [
            'Citrus Canker Lesions (संत्रा खैरा)',
            'Gummosis / Bark Splitting (डिंक्या रोग)',
            'Rootstock Sprout / Inverted Graft'
          ];
          condition = rList[Math.floor(Math.random() * rList.length)];
          confidence = (88.0 + Math.random() * 8).toFixed(1);
        }

        const dateStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const scanUid = `SCN-LIVE-${Math.floor(1000 + Math.random() * 9000)}`;

        scanData = {
          id: Date.now(),
          scan_uid: scanUid,
          nursery_name: nursery.name,
          taluka: nursery.taluka,
          district: nursery.district,
          variety: MOCK_VARIETIES[Math.floor(Math.random() * MOCK_VARIETIES.length)],
          verdict,
          primary_condition: condition,
          confidence: parseFloat(confidence),
          created_at: `Just now (${dateStr})`
        };
      }

      // Update state
      setRealtimeScans(prev => [scanData, ...prev.slice(0, 19)]);
      setLatestEvent(scanData);
      setToastEvent(scanData);

      // Increment live deltas
      setLiveStats(prev => ({
        totalDelta: prev.totalDelta + 1,
        suitableDelta: prev.suitableDelta + (scanData.verdict === 'suitable' || scanData.verdict === 'healthy_looking' ? 1 : 0),
        questionableDelta: prev.questionableDelta + (scanData.verdict === 'questionable' || scanData.verdict === 'warning_signs' ? 1 : 0),
        rejectDelta: prev.rejectDelta + (scanData.verdict === 'reject' || scanData.verdict === 'significant_concern' ? 1 : 0)
      }));

      // Dismiss toast banner after 4.5 seconds
      setTimeout(() => {
        setToastEvent(current => (current?.id === scanData.id ? null : current));
      }, 4500);

    } finally {
      isGeneratingRef.current = false;
    }
  };

  // Background auto-streaming interval (only in demo mode and when autoStream is enabled)
  useEffect(() => {
    if (!demoMode || !autoStream) {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
      return;
    }

    // Run first scan after 3.5 seconds of login/opening
    const initialTimer = setTimeout(() => {
      triggerLiveScan();
    }, 3500);

    // Then stream a new scan every 8 to 11 seconds
    streamIntervalRef.current = setInterval(() => {
      triggerLiveScan();
    }, 8500);

    return () => {
      clearTimeout(initialTimer);
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, [demoMode, autoStream]);

  const toggleAutoStream = () => {
    setAutoStream(prev => !prev);
  };

  return (
    <RealtimeContext.Provider value={{
      realtimeScans,
      latestEvent,
      toastEvent,
      dismissToast: () => setToastEvent(null),
      autoStream,
      toggleAutoStream,
      triggerLiveScan,
      liveStats
    }}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = () => useContext(RealtimeContext);
