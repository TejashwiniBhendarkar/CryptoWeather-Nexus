# CryptoWeather Nexus

CryptoWeather Nexus is a real-time dashboard that integrates **cryptocurrency**, **weather**, and **news** APIs to provide up-to-date market trends, weather forecasts, and news updates. The application is built using **Next.js (App Router)**, **Redux Toolkit**, **WebSockets**, and **Tailwind CSS**.

##  Features

- **Weather Dashboard** 
  - Fetches current weather conditions and historical weather data for different cities.
  - Interactive charts using **Recharts** for historical trends.

- **Crypto Dashboard**  
  - Displays live cryptocurrency prices with WebSocket updates (CoinCap API).
  - Detailed price history and market stats for selected coins.

- **News Dashboard** 
  - Fetches real-time cryptocurrency news from **NewsData.io** API.

## 🚀 Tech Stack

- **Frontend**: Next.js (App Router), React, Redux Toolkit, Tailwind CSS, Recharts
- **Backend APIs**: Custom API routes in Next.js for handling weather and news API requests.
- **Data Sources**:
  - **Weather**: OpenWeatherMap API
  - **Cryptocurrency**: CoinGecko & CoinCap API
  - **News**: NewsData.io API
- **Deployment**: Vercel

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```sh
 git clone https://github.com/your-username/CryptoWeather-Nexus.git
 cd CryptoWeather-Nexus
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
NEXT_PUBLIC_COINGECKO_API_KEY=your_coingecko_api_key
NEXT_PUBLIC_NEWSDATA_API_KEY=your_newsdata_api_key
```

### 4️⃣ Run Locally
```sh
npm run dev
```
The app will be available at `http://localhost:3000`

## 🔗 API Routes

### Weather API (`/api/weather`)
Fetches weather data from OpenWeatherMap.
```sh
GET /api/weather?city=London
```

### News API (`/api/news`)
Fetches cryptocurrency news articles from NewsData.io.
```sh
GET /api/news
```

## 🚀 Deployment (Vercel)

To deploy to **Vercel**, run:
```sh
vercel --prod
```

## 📌 Project Structure
```
CryptoWeather-Nexus/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   ├── weather/
│   │   ├── page.jsx
│   │   ├── [city]/page.jsx
│   ├── crypto/
│   │   ├── page.jsx
│   │   ├── [id]/page.jsx
│   ├── news/
│   │   ├── page.jsx
│   ├── api/
│   │   ├── weather.js
│   │   ├── news.js
├── store/
│   ├── features/
│   │   ├── weatherSlice.js
│   │   ├── cryptoSlice.js
│   │   ├── newsSlice.js
├── components/
├── public/
├── styles/
├── .env.local
├── package.json
├── README.md
```

##  Troubleshooting
- **Build Issues**: Check logs with `vercel logs <deployment-url>`.
- **API Errors**: Ensure API keys are correctly set in `.env.local`.




![Screenshot 2025-04-04 211330](https://github.com/user-attachments/assets/b01f2dff-7cfc-4300-be63-eab62c69e447)


