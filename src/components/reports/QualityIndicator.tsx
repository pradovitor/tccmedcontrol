
import React from "react";
import { QualityIndicatorProps } from "@/utils/reportUtils";

export const QualityIndicator: React.FC<QualityIndicatorProps> = ({ adherenceRate }) => {
  let bgColor, textColor;
  
  if (adherenceRate >= 90) {
    bgColor = "bg-green-100";
    textColor = "text-green-800";
  } else if (adherenceRate >= 70) {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-800";
  } else {
    bgColor = "bg-red-100";
    textColor = "text-red-800";
  }
  
  return (
    <div className={`flex items-center ${textColor}`}>
      <div className={`w-full bg-gray-200 rounded-full h-4 mr-2`}>
        <div 
          className={`${bgColor} h-4 rounded-full`} 
          style={{ width: `${adherenceRate}%` }}
        ></div>
      </div>
      <span className="font-semibold">{adherenceRate.toFixed(0)}%</span>
    </div>
  );
};
