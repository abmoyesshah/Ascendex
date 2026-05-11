import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "./Card";

// ---------- helper functions (unchanged) ----------
const getStrengthValue = (metric) => {
  if (!metric) return 0;
  const match = metric.match(/(\d+)\/(\d+)/);
  if (match) {
    const done = parseInt(match[1]);
    const total = parseInt(match[2]);
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }
  return 0;
};

const abbreviateText = (text, maxLength = 12) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length > 2) return words.map(w => w.charAt(0).toUpperCase()).join("");
  return text.length > maxLength ? text.substring(0, maxLength - 2) + ".." : text;
};

const CustomTooltip = ({ active, payload, type }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="bg-white p-2 sm:p-3 border border-gray-200 rounded-lg shadow-lg min-w-[200px] sm:min-w-[250px]">
      <p className="font-semibold text-xs sm:text-sm text-gray-800">{item.fullTitle || item.title}</p>
      <p className="text-[10px] sm:text-xs text-gray-600 mt-1">{item.detail}</p>
      {type === "issue" && item.pages && (
        <p className="text-[10px] sm:text-xs text-red-600 mt-1">Pages: {item.pages}</p>
      )}
    </div>
  );
};

const calculateChartValue = (rawValue) => {
  const normalizedValue = Math.min(100, Math.max(0, rawValue));
  if (normalizedValue <= 33) return 10 + Math.round((normalizedValue / 33) * 23);
  else if (normalizedValue <= 66) return 34 + Math.round(((normalizedValue - 33) / 33) * 32);
  else return 67 + Math.round(((normalizedValue - 66) / 34) * 33);
};

// ---------- ChartCard component ----------
export const ChartCard = ({ title, subtitle, count, data, type, color }) => {
  const processedData = React.useMemo(() => {
    return data.slice(0, 10).map((item) => {
      let rawValue =
        type === "strength"
          ? getStrengthValue(item.metric)
          : Math.min(100, Math.round(((item.pages || 0) / 10) * 100));
      return {
        ...item,
        rawValue,
        value: calculateChartValue(rawValue),
        displayName: abbreviateText(item.title, 10),
        fullTitle: item.title,
      };
    });
  }, [data, type]);

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] sm:text-xs text-slate-400">{title}</div>
          <div className="text-sm sm:text-lg font-semibold text-slate-800">{subtitle}</div>
        </div>
        <div className="text-[10px] sm:text-xs text-slate-400">{count} total</div>
      </div>
      <div style={{ width: "100%", height: 220 }} className="mt-3 sm:mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData} margin={{ top: 15, right: 5, left: 0, bottom: 15 }}>
            <defs>
              <linearGradient id={`${type}Gradient`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                <stop offset="100%" stopColor={color} stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 2" vertical={false} opacity={0.05} stroke="#e5e7eb" />
            <XAxis dataKey="displayName" axisLine={false} tickLine={false} fontSize={8} interval={0} tick={{ fill: "#4b5563" }} />
            <YAxis axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 33, 66, 100]} tickFormatter={(v, i) => ["Low", "Mid", "High", ""][i] || ""} fontSize={9} tick={{ fill: "#374151" }} width={30} />
            <Tooltip content={<CustomTooltip type={type} />} />
            <Bar dataKey="value" fill={`url(#${type}Gradient)`} radius={[6, 6, 0, 0]} barSize={16} animationDuration={600} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// const CARD_BG = "bg-white/90";

// function Card({ children, className = "" }) {
//   return <div className={`${CARD_BG} rounded-2xl p-3 sm:p-4 md:p-6 shadow-md transition-transform hover:scale-[1.017] ${className}`}>{children}</div>;
// }

// const getStrengthValue = (metric) => {
//   if (!metric) return 0;
//   const match = metric.match(/(\d+)\/(\d+)/);
//   if (match) { const done = parseInt(match[1]); const total = parseInt(match[2]); return total > 0 ? Math.round((done / total) * 100) : 0; }
//   return 0;
// };

// const abbreviateText = (text, maxLength = 12) => {
//   if (!text) return '';
//   const words = text.split(' ');
//   if (words.length > 2) return words.map(w => w.charAt(0).toUpperCase()).join('');
//   return text.length > maxLength ? text.substring(0, maxLength - 2) + '..' : text;
// };

// const CustomTooltip = ({ active, payload, type }) => {
//   if (!active || !payload?.length) return null;
//   const item = payload[0].payload;
//   return (
//     <div className="bg-white p-2 sm:p-3 border border-gray-200 rounded-lg shadow-lg min-w-[200px] sm:min-w-[250px]">
//       <p className="font-semibold text-xs sm:text-sm text-gray-800">{item.fullTitle || item.title}</p>
//       <p className="text-[10px] sm:text-xs text-gray-600 mt-1">{item.detail}</p>
//       {type === "issue" && item.pages && <p className="text-[10px] sm:text-xs text-red-600 mt-1">Pages: {item.pages}</p>}
//     </div>
//   );
// };

// const calculateChartValue = (rawValue) => {
//   const normalizedValue = Math.min(100, Math.max(0, rawValue));
//   if (normalizedValue <= 33) return 10 + Math.round((normalizedValue / 33) * 23);
//   else if (normalizedValue <= 66) return 34 + Math.round(((normalizedValue - 33) / 33) * 32);
//   else return 67 + Math.round(((normalizedValue - 66) / 34) * 33);
// };

// export const ChartCard = ({ title, subtitle, count, data, type, color }) => {
//   const processedData = React.useMemo(() => {
//     return data.slice(0, 10).map((item) => {
//       let rawValue = type === "strength" ? getStrengthValue(item.metric) : Math.min(100, Math.round(((item.pages || 0) / 10) * 100));
//       return { ...item, rawValue, value: calculateChartValue(rawValue), displayName: abbreviateText(item.title, 10), fullTitle: item.title };
//     });
//   }, [data, type]);

//   return (
//     <Card>
//       <div className="flex items-center justify-between">
//         <div>
//           <div className="text-[10px] sm:text-xs text-slate-400">{title}</div>
//           <div className="text-sm sm:text-lg font-semibold text-slate-800">{subtitle}</div>
//         </div>
//         <div className="text-[10px] sm:text-xs text-slate-400">{count} total</div>
//       </div>
//       <div style={{ width: "100%", height: 220 }} className="mt-3 sm:mt-4">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={processedData} margin={{ top: 15, right: 5, left: 0, bottom: 15 }}>
//             <defs>
//               <linearGradient id={`${type}Gradient`} x1="0" x2="0" y1="0" y2="1">
//                 <stop offset="0%" stopColor={color} stopOpacity={0.9} />
//                 <stop offset="100%" stopColor={color} stopOpacity={0.8} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid strokeDasharray="2 2" vertical={false} opacity={0.05} stroke="#e5e7eb" />
//             <XAxis dataKey="displayName" axisLine={false} tickLine={false} fontSize={8} interval={0} tick={{ fill: "#4b5563" }} />
//             <YAxis axisLine={false} tickLine={false} domain={[0, 100]} ticks={[0, 33, 66, 100]} tickFormatter={(v, i) => ["Low", "Mid", "High", ""][i] || ""} fontSize={9} tick={{ fill: "#374151" }} width={30} />
//             <Tooltip content={<CustomTooltip type={type} />} />
//             <Bar dataKey="value" fill={`url(#${type}Gradient)`} radius={[6, 6, 0, 0]} barSize={16} animationDuration={600} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>
//   );
// };
