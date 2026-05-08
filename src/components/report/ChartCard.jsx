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

/* ---------- styling constants ---------- */
const CARD_BG = "bg-white/90";

/* ---------- helper small components ---------- */
function Card({ children, className = "" }) {
  return (
    <div
      className={`${CARD_BG} rounded-2xl p-4 md:p-6 shadow-md transition-transform transform hover:scale-[1.017] ${className}`}
    >
      {children}
    </div>
  );
}

// Helper functions
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

const getSeverityColor = (severity) => {
  const colors = {
    critical: "text-red-700",
    high: "text-orange-600",
    medium: "text-yellow-600",
    low: "text-blue-600",
  };
  return colors[severity] || "text-yellow-600";
};

// Enhanced abbreviations dictionary with more common terms
const abbreviations = {
  // Your original abbreviations
  'Optimized': 'Opt',
  'Optimization': 'Opt',
  'Description': 'Desc',
  'Descriptions': 'Desc',
  'Responsive': 'Resp',
  'Structure': 'Struct',
  'Structured': 'Struct',
  'Canonical': 'Canon',
  'Linking': 'Link',
  'Loading': 'Load',
  'Internal': 'Int',
  'External': 'Ext',
  'Proper': 'Prop',
  'Quality': 'Qual',
  'Keyword': 'KW',
  'Keywords': 'KW',
  'Tags': 'Tags',
  'Tag': 'Tag',
  'Meta': 'Meta',
  'Content': 'Cnt',
  'Pages': 'Pgs',
  'Page': 'Pg',
  'Mobile': 'Mob',
  'Fast': 'Fast',
  'Image': 'Img',
  'Images': 'Imgs',
  'H1': 'H1',
  'H2': 'H2',
  'H3': 'H3',
  'Title': 'Ttl',
  'Titles': 'Ttls',
  
  // Additional abbreviations for your problematic terms
  'Thin': 'Thin',
  'Poor': 'Poor',
  'Low': 'Low',
  'Missing': 'Miss',
  'Schema': 'Schm',
  'Markup': 'Mrk',
  'Headings': 'Hdg',
  'Heading': 'Hdg',
  'Headers': 'Hdr',
  'Header': 'Hdr',
  'Readability': 'Rdbl',
  'Text': 'Txt',
  'HTML': 'HTML',
  'Ratio': 'Rat',
  'Fast': 'Fast',
  'Properly': 'Prop',
  'Proper': 'Prop',
  'Metadata': 'Meta',
  'Mobile': 'Mob',
  'Responsive': 'Resp',
  'Images': 'Img',
  'Optimized': 'Opt',
};

// Common word removal (articles, prepositions)
const removeWords = ['the', 'a', 'an', 'and', 'with', 'for', 'to', 'of', 'in', 'on', 'at', 'by'];

// Smart abbreviation function - enhanced
const abbreviateText = (text, maxLength = 14) => {
  if (!text) return '';
  
  // Special cases for common patterns
  const specialCases = {
    'Missing H1 Headers': 'Miss H1 Hdr',
    'Thin Content': 'Thin Cnt',
    'Poor Readability': 'Poor Rdbl',
    'Low Text to HTML Ratio': 'Low Txt/HTML',
    'Missing Schema Markup': 'Miss Schm Mrk',
    'Optimized Title Tags': 'Opt Ttl Tags',
    'Proper Meta Descriptions': 'Prop Meta Desc',
    'Mobile Responsive': 'Mob Resp',
    'Proper H1 Structure': 'Prop H1 Struct',
    'Image Optimization': 'Img Opt',
    'Fast Loading Pages': 'Fast Load Pgs',
    'Keyword Optimization': 'KW Opt',
  };
  
  // Check for special cases first
  if (specialCases[text]) {
    return specialCases[text];
  }
  
  // Handle specific patterns
  if (text.includes('Missing H1')) return 'Miss H1 Hdr';
  if (text.includes('Thin Content')) return 'Thin Cnt';
  if (text.includes('Poor Readability')) return 'Poor Rdbl';
  if (text.includes('Low Text to HTML')) return 'Low Txt/HTML';
  if (text.includes('Missing Schema')) return 'Miss Schm';
  if (text.includes('Text to HTML')) return 'Txt/HTML Rat';
  if (text.includes('Schema Markup')) return 'Schm Mrk';
  if (text.includes('Title Tags')) return 'Ttl Tags';
  if (text.includes('Meta Description')) return 'Meta Desc';
  if (text.includes('Meta Descriptions')) return 'Meta Desc';
  
  // Split text into words
  const words = text.split(' ');
  
  // Filter out common words and apply abbreviations
  const processedWords = words
    .filter(word => {
      const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      return !removeWords.includes(cleanWord);
    })
    .map(word => {
      const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
      
      // Check for exact match
      if (abbreviations[cleanWord]) {
        return abbreviations[cleanWord];
      }
      
      // Check for plural version
      if (cleanWord.endsWith('s') && abbreviations[cleanWord.slice(0, -1)]) {
        return abbreviations[cleanWord.slice(0, -1)];
      }
      
      // Check for match ignoring case
      const lowerWord = cleanWord.toLowerCase();
      for (const [key, value] of Object.entries(abbreviations)) {
        if (key.toLowerCase() === lowerWord) {
          return value;
        }
      }
      
      // Keep short words as is
      if (cleanWord.length <= 3) return cleanWord;
      
      // Abbreviate long words (take first 3-4 letters)
      return cleanWord.length > 4 ? cleanWord.substring(0, 4) : cleanWord;
    });
  
  let result = processedWords.join(' ');
  
  // If still too long, use more aggressive abbreviation
  if (result.length > maxLength) {
    // Take first letter of each word (for longer phrases)
    if (processedWords.length > 2) {
      result = processedWords.map(w => w.charAt(0)).join('');
    } else {
      // Just truncate with ellipsis
      return `${result.substring(0, maxLength - 2)}..`;
    }
  }
  
  return result;
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, type }) => {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;
  const isStrength = type === "strength";

  return (
    <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg min-w-[250px]">
      <p
        className={`font-semibold text-sm ${
          isStrength ? "text-green-800" : "text-red-800"
        }`}
      >
        {item.fullTitle || item.title}
      </p>
      <p className="text-xs text-gray-600 mt-1">{item.detail}</p>

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-500">
          {isStrength ? "Impact:" : "Severity:"}
        </span>
        <span
          className={`text-xs font-semibold capitalize ${
            isStrength ? "text-green-600" : getSeverityColor(item.severity)
          }`}
        >
          {isStrength ? item.impact || "medium" : item.severity || "medium"}
        </span>
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-500">Metric:</span>
        <span
          className={`text-xs font-semibold ${
            isStrength ? "text-blue-600" : "text-red-600"
          }`}
        >
          {isStrength ? item.metric || "N/A" : `${item.pages || 0} pages`}
        </span>
      </div>

      {!isStrength && item?.fix && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs font-medium text-green-700">💡 Fix:</p>
          <p className="text-xs text-gray-600 mt-1">{item.fix}</p>
        </div>
      )}
    </div>
  );
};

// Calculate value with better distribution across Low/Medium/High
const calculateChartValue = (rawValue, type) => {
  const normalizedValue = Math.min(100, Math.max(0, rawValue));
  
  if (normalizedValue <= 33) {
    return 10 + Math.round((normalizedValue / 33) * 23);
  } else if (normalizedValue <= 66) {
    return 34 + Math.round(((normalizedValue - 33) / 33) * 32);
  } else {
    return 67 + Math.round(((normalizedValue - 66) / 34) * 33);
  }
};

// Main ChartCard Component
export const ChartCard = ({
  title,
  subtitle,
  count,
  data,
  type,
  color,
}) => {
  const processedData = React.useMemo(() => {
    const limitedData = data.slice(0, 10);
    
    return limitedData.map((item) => {
      let rawValue;
      
      if (type === "strength") {
        rawValue = getStrengthValue(item.metric);
      } else {
        const affectedPages = item.pages || 0;
        const mockTotalPages = 10;
        rawValue = Math.min(100, Math.round((affectedPages / mockTotalPages) * 100));
      }
      
      return {
        ...item,
        rawValue,
        value: calculateChartValue(rawValue, type),
        displayName: abbreviateText(item.title, 12), // Even shorter max length
        fullTitle: item.title,
      };
    });
  }, [data, type]);

  const yAxisTicks = [0, 33, 66, 100];
  const yAxisLabels = ["Low", "Mid", "High", ""];

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-400">{title}</div>
          <div className="text-lg font-semibold text-slate-800">{subtitle}</div>
        </div>
        <div className="text-xs text-slate-400">{count} total</div>
      </div>

      <div style={{ width: "100%", height: 250 }} className="mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{ top: 20, right: 5, left: 0, bottom: 15 }}
          >
            <defs>
              <linearGradient
                id={`${type}Gradient`}
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                <stop offset="100%" stopColor={color} stopOpacity={0.8} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="2 2"
              vertical={false}
              opacity={0.05}
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="displayName"
              axisLine={false}
              tickLine={false}
              textAnchor="middle"
              height={35}
              fontSize={9.5} // Smaller font
              interval={0}
              tick={{ fill: "#4b5563", dy: 2 }}
              minTickGap={1}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              ticks={yAxisTicks}
              tickFormatter={(value, index) => yAxisLabels[index] || ""}
              fontSize={10}
              fontWeight={500}
              tick={{ fill: "#374151" }}
              width={35}
            />

            <Tooltip content={<CustomTooltip type={type} />} />

            <Bar
              dataKey="value"
              fill={`url(#${type}Gradient)`}
              radius={[8, 8, 0, 0]}
              barSize={20}
              animationDuration={600}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
