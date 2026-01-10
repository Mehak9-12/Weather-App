import CityDropdown from "./dropdown";

export default function WeatherCard({ data, hour, apiKey, onSelect, loading, error }) {
  const hourlyData = hour || data?.forecast?.forecastday[0]?.hour;

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border-4 border-sky-300 max-h-[90vh] overflow-y-auto custom-scrollbar relative">
      
      <div className="mb-6 relative z-50">
        <CityDropdown apiKey={apiKey} onSelect={onSelect} />
      </div>

      {/* --- Loading State --- */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-10 animate-pulse text-sky-400">
           <svg className="w-10 h-10 animate-spin mb-2" fill="none" viewBox="0 0 24 24">
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
           </svg>
           <p className="text-sm font-medium">Fetching Forecast...</p>
        </div>
      )}

      {/* --- Error State --- */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-center text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* --- Weather Data (Only renders if data exists & not loading) --- */}
      {!loading && data && (
        <>
          {/* Location & Date */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              {data.location.name}
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              {data.location.region}, {data.location.country}
            </p>
            <p className="text-xs font-semibold text-sky-500 uppercase tracking-widest mt-1">
              {new Date(data.location.localtime).toDateString()}
            </p>
          </div>

          {/* ... previous code (Location & Date) ... */}

{/* Weather Main */}
<div className="flex items-center justify-between gap-2 my-6 p-4 bg-sky-50/50 rounded-2xl border border-sky-100 shadow-sm">
  <div className="relative flex-shrink-0">
    <div className="absolute inset-0 bg-sky-200 blur-xl opacity-40 rounded-full"></div>
    <img
      src={`https:${data.current.condition.icon}`}
      alt={data.current.condition.text}
      className="w-16 h-16 relative z-10"
    />
     <h2 className="text-xl font-semibold text-slate-700 leading-tight">
      {data.current.condition.text}
    </h2>
  </div>

  <div className="pl-2 text-right">
    <h1 className="text-5xl font-black text-slate-800 tracking-tighter flex items-start justify-end">
      {Math.round(data.current.temp_c)}
      <span className="text-2xl font-bold text-sky-500 mt-1">°</span>
    </h1>
  </div>
</div>
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-px bg-slate-200 rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
            {[
              { label: "Cloudy", val: `${data.current.cloud}%`, icon: "☁️" },
              { label: "Wind", val: `${data.current.wind_kph} km/h`, icon: "💨" },
              { label: "Humidity", val: `${data.current.humidity}%`, icon: "💧" },
              { label: "Pressure", val: `${data.current.pressure_mb}`, icon: "🌬️" },
              { label: "Visibility", val: `${data.current.vis_km} km`, icon: "👁️" },
              { label: "UV Index", val: data.current.uv, icon: "☀️" },
            ].map((stat, i) => (
              <div key={i} className="bg-sky-50 p-3 flex flex-col items-center justify-center hover:bg-sky-100 transition-colors">
                <span className="text-lg mb-1 grayscale opacity-80">{stat.icon}</span>
                <p className="text-sm font-bold text-slate-700">{stat.val}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Astro Info */}
          <div className="flex justify-between mt-6 px-4 py-3 bg-white border border-slate-100 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="text-orange-400 text-lg">🌅</span>
              <div>
                <p className="text-[10px] text-slate-400 uppercase">Sunrise</p>
                {data.forecast.forecastday[0].astro.sunrise}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 text-right">
              <div>
                 <p className="text-[10px] text-slate-400 uppercase">Sunset</p>
                 {data.forecast.forecastday[0].astro.sunset}
              </div>
              <span className="text-indigo-400 text-lg">🌇</span>
            </div>
          </div>

          {/* Hourly Forecast */}
          {hourlyData && hourlyData.length > 0 && (
            <div className="mt-6">
              <h3 className="text-left text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1">
                Today's Trend
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                {hourlyData.slice(0, 24).map((hourItem, index) => (
                  <div
                    key={index}
                    className="min-w-[70px] bg-slate-50 hover:bg-sky-100 transition-all rounded-xl p-3 text-center border border-slate-100 shadow-sm flex-shrink-0 group"
                  >
                    <p className="text-[10px] text-slate-400 font-semibold mb-1">
                      {hourItem.time.split(" ")[1]}
                    </p>
                    <img
                      src={`https:${hourItem.condition.icon}`}
                      alt=""
                      className="w-10 h-10 mx-auto transform group-hover:scale-110 transition-transform"
                    />
                    <p className="text-sm font-bold text-slate-700 mt-1">
                      {Math.round(hourItem.temp_c)}°
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}