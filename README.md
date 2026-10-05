# SantraScan (संत्रा स्कॅन) 🍊
### AI-Powered Orange Sapling Quality Assessment & Knowledge Center (Build Bridge)

> **Nagpur RISE Agri Innovation Cohort**  
> AI-based physical inspection, disease diagnostics, biometric QR passports, and regional agro-advisory for citrus nurseries across Vidarbha.

---

## 📌 Project Overview
SantraScan addresses planting material failure and disease dissemination (Citrus Greening / Huanglongbing, Phytophthora Gummosis, Leaf Miner, Zinc Chlorosis) in citrus nurseries across Nagpur, Amravati, Wardha, and Central India.

### Key Capabilities:
- **Vision Quality Scoring**: Analyzes graft union integrity, canopy chlorosis, foliar lesions, and stem caliper.
- **Dynamic Real-Time Ingestion**: Live telemetry feed of nursery batch scans with automatic quality grading (Suitable, Questionable, Reject).
- **Orange Book (संत्रा मार्गदर्शिका)**: Trilingual (English, Hindi, Marathi) citrus pathology guide and pest management protocols based on ICAR-CCRI standards.
- **Biometric QR Passports**: Tamper-evident cryptographic sapling batches issued to certified nurseries.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v18+)
- Python (3.10+)

### 1. Installation
Clone the repository:
```bash
git clone https://github.com/ANANDMOHOD17/Santra_scan.git
cd Santra_scan
```

Install frontend dependencies:
```bash
npm install
cd frontend && npm install && cd ..
```

Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
cd ..
```

### 2. Run Locally
Run both frontend and backend concurrently with a single command from the project root:
```bash
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## ☁️ Deployment Guide

### Option 1: Render (Recommended for Backend)
1. Link your GitHub repository `https://github.com/ANANDMOHOD17/Santra_scan.git` on [Render](https://render.com).
2. Create a new **Web Service**.
3. Set **Root Directory**: `backend`
4. Set **Build Command**: `pip install -r requirements.txt`
5. Set **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Option 2: Vercel (Recommended for Frontend)
1. Import repository on [Vercel](https://vercel.com).
2. Set **Root Directory**: `frontend`
3. Set **Framework Preset**: `Vite`
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add Environment Variable: `VITE_API_URL=<your-render-backend-url>`
