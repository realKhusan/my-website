"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { fetchUserContributions } from "../../../utils/github-api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import dayjs from "dayjs";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface GitHubActivityCalendarProps {
  token: string;
  username: string;
}

const colorLevels = ["#13171A", "#0e4429", "#006d32", "#26a641", "#39d353"];
const weekDays = ["Yak", "Mon", "Sesh", "Wed", "Pay", "Fri", "Shan"];
const renderLegend = () => {
  return (
    <div className="flex items-center gap-1 text-xs text-gray-500">
      <span>Less</span>
      {colorLevels.map((color, index) => (
        <div
          key={index}
          className="w-[10px] h-[10px] rounded-[2px]"
          style={{ backgroundColor: color }}
        />
      ))}
      <span>More</span>
    </div>
  );
};

const GitHubActivityCalendar: React.FC<GitHubActivityCalendarProps> = ({
  token,
  username,
}) => {
  const [calendar, setCalendar] = useState<ContributionDay[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    fetchUserContributions(token, username, currentYear)
      .then((data) => {
        const today = dayjs();
        const startDate = today.subtract(3, "month").startOf("week");
        const endDate = today;

        const days: ContributionDay[] = [];
        let currentDate = startDate;

        while (
          currentDate.isBefore(endDate) ||
          currentDate.isSame(endDate, "day")
        ) {
          const contributionDay = data.weeks
            .flatMap(
              (week: { contributionDays: ContributionDay[] }) =>
                week.contributionDays
            )
            .find(
              (day: ContributionDay) =>
                day.date === currentDate.format("YYYY-MM-DD")
            );

          days.push({
            date: currentDate.format("YYYY-MM-DD"),
            contributionCount: contributionDay
              ? contributionDay.contributionCount
              : 0,
          });

          currentDate = currentDate.add(1, "day");
        }

        setCalendar(days);
      })
      .catch((err) => setError(err.message));
  }, [token, username]);

  const renderMonths = () => {
    const months = Array.from(
      new Set(calendar.map((day) => dayjs(day.date).format("MMM")))
    );
    const monthPositions = months.map((month) => {
      const firstDay = calendar.findIndex(
        (day) => dayjs(day.date).format("MMM") === month
      );
      return { month, position: Math.floor(firstDay / 7) * 13 };
    });

    return (
      <div className="flex mb-2 relative h-4">
        {monthPositions.map(({ month, position }) => (
          <div
            key={month}
            className="absolute text-xs text-gray-500"
            style={{ left: `${position}px` }}
          >
            {month}
          </div>
        ))}
      </div>
    );
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (calendar.length === 0) {
    return (
      <div className="animate-pulse">
        <div className="w-full max-w-2xl border backdrop-blur-2xl bg-black/10 p-4 rounded-lg">
          <div className="mt-4 text-[12px]">
            <div className="flex">
              <div className="flex flex-col gap-[3px] mr-2">
                {weekDays.map((day, index) => (
                  <div
                    key={day}
                    className="h-[10px] text-xs mt-[3px] text-gray-500 leading-[10px]"
                  >
                    {index % 2 == 1 ? day : ""}
                  </div>
                ))}
              </div>
              <div className="grid grid-flow-col gap-[3px] grid-rows-7">
                {Array.from({ length: 97 }).map((_, index) => {
                  return (
                    <div
                      key={index}
                      className="size-[12px] rounded-[2px] m-[1px] bg-[#13171A]"
                    />
                  );
                })}
              </div>
            </div>
            <div className=" mt-4 text-[12px]">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>0 contributions in the last 3 months</div>
                  </TooltipTrigger>
                  <TooltipContent>{renderLegend()}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getColor = (count: number) => {
    if (count === 0) return colorLevels[0];
    if (count < 2) return colorLevels[1];
    if (count < 4) return colorLevels[2];
    if (count < 8) return colorLevels[3];
    return colorLevels[4];
  };

  const renderCalendar = () => {
    const weeks = Math.ceil(calendar.length / 7);

    return (
      <div className="flex">
        <div className="flex flex-col gap-[3px] mr-2">
          {weekDays.map((day, index) => (
            <div
              key={day}
              className="h-[10px] text-xs mt-[3px] text-gray-500 leading-[10px]"
            >
              {index % 2 == 1 ? day : ""}
            </div>
          ))}
        </div>
        <div className="grid grid-flow-col gap-[3px] grid-rows-7">
          {Array.from({ length: weeks * 7 }).map((_, index) => {
            const day = calendar[index];
            return day ? (
              <TooltipProvider key={day.date}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="size-[12px] rounded-[2px] m-[1px]  "
                      style={{
                        backgroundColor: getColor(day.contributionCount),
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {day.contributionCount} contribution on{" "}
                      {dayjs(day.date).format("MMMM D")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <div key={index} className="w-[10px] h-[10px]" />
            );
          })}
        </div>
      </div>
    );
  };

  const totalContributions = calendar.reduce(
    (sum, day) => sum + day.contributionCount,
    0
  );

  return (
    <div className="w-full max-w-2xl border backdrop-blur-2xl bg-black/10 p-4 rounded-lg">
      {renderMonths()}
      {renderCalendar()}
      <div className=" mt-4 text-[12px]">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>{totalContributions} contributions in the last 3 months</div>
            </TooltipTrigger>
            <TooltipContent>{renderLegend()}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default GitHubActivityCalendar;
