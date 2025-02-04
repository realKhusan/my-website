"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { fetchUserContributions } from "../../../utils/github-api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import dayjs from "dayjs";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface GitHubActivityCalendarProps {
  token: string;
  username: string;
}

const colorLevels = ["#13171A", "#0e4429", "#006d32", "#26a641", "#39d353"];
const monthNames = [
  "Yan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Iyn",
  "Iyl",
  "Avg",
  "Sen",
  "Okt",
  "Noy",
  "Dek",
];

const GitHubActivityCalendar: React.FC<GitHubActivityCalendarProps> = ({
  token,
  username,
}) => {
  const [calendar, setCalendar] = useState<ContributionCalendar | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchUserContributions(token, username, selectedYear)
      .then(setCalendar)
      .catch((err) => setError(err.message));
  }, [token, username, selectedYear]);

  if (error) {
    return <div className="text-red-500">Xatolik: {error}</div>;
  }

  if (!calendar) {
    return <div>Yuklanmoqda...</div>;
  }

  const getColor = (count: number) => {
    if (count === 0) return colorLevels[0];
    if (count < 2) return colorLevels[1];
    if (count < 3) return colorLevels[2];
    if (count < 4) return colorLevels[3];
    return colorLevels[4];
  };

  const renderMonths = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const monthWidth = Math.floor(calendar.weeks.length / 12);
      months.push(
        <div
          key={i}
          className="text-center"
          style={{ width: `${monthWidth * 15}px` }}
        >
          {monthNames[i]}
        </div>
      );
    }
    return <div className="flex justify-between mb-2">{months}</div>;
  };

  const renderCalendar = () => {
    return (
      <div className="flex">
        <div>
          {renderMonths()}
          <div className="flex">
            {calendar.weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col">
                {week.contributionDays.map((day) => (
                  <div
                    key={day.date}
                    className="w-3 aspect-square m-0.5 rounded-[2px]"
                    style={{ backgroundColor: getColor(day.contributionCount) }}
                    title={`${day.contributionCount} ta hissa ${day.date} sanasida`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderLegend = () => {
    return (
      <div className="flex items-center mt-4">
        <span className="mr-2 text-sm">Less</span>
        {colorLevels.map((color, index) => (
          <div
            key={index}
            className="w-3 h-3 mr-1 rounded-[2px]"
            style={{ backgroundColor: color }}
          />
        ))}
        <span className="ml-2 text-sm">More</span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl border bg-black p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">GitHub activity calendar</h2>
        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => setSelectedYear(Number.parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Yilni tanlang" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(2)].map((_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-x-auto">{renderCalendar()}</div>
      <div className="flex justify-between">
        <div className="mt-4">
          {calendar.totalContributions} contributions in {dayjs().year()}
        </div>
        {renderLegend()}
      </div>
    </div>
  );
};

export default GitHubActivityCalendar;
