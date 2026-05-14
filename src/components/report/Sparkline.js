import { AreaChart, Area, ResponsiveContainer } from "recharts";

export default function Sparkline({ series, color = "#2563eb" }) {
  return (
    <div style={{ width: 120, height: 46 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series}>
          <defs>
            <linearGradient id="sparkGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area dataKey="y" type="monotone" stroke={color} fill="url(#sparkGradient)" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}