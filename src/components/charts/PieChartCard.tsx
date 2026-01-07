/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

interface PieChartCardProps {
    title: string;
    data: {
        name: string;
        value: number;
    }[];
}

const PieChartCard = ({ title, data }: PieChartCardProps) => {
    const renderLabel = (entry: any) => {
        const total = data.reduce((sum, item) => sum + item.value, 0);
        const percentage = total > 0 ? ((entry.value / total) * 100).toFixed(1) : '0';
        return `${percentage}%`;
    };

    return (
        <div className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        label={renderLabel}
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                stroke="#fff"
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => [value, 'Count']}
                        labelFormatter={(name) => `Category: ${name}`}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value, entry: any) => (
                            <span className="text-sm text-gray-700">
                                {value} ({entry.payload.value})
                            </span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartCard;