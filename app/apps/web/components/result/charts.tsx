"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export interface ChartData {
  disease: string;
  sequence1: number;
  sequence2: number;
  sequence3: number;
  sequence4: number;
}

const SimilarityBarChart = ({ data }: { data: ChartData[] }) => {
  if (!data.length) return <p>You do not have access permission.</p>;
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="disease" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sequence1" fill="#8884d8" />
        <Bar dataKey="sequence2" fill="#82ca9d" />
        <Bar dataKey="sequence3" fill="#ffc658" />
        <Bar dataKey="sequence4" fill="#ff7300" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SimilarityPieChart = ({ data }: { data: ChartData[] }) => {
  const pieData = data.map((item) => ({
    name: item.disease,
    value: item.sequence1 + item.sequence2 + item.sequence3 + item.sequence4,
  }));
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart width={400} height={400}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export function Charts({ data }: { data: ChartData[] }) {
  return (
    <Card className="w-full p-4">
      <div className="mb-2">
        <h2 className="text-xl font-bold">Rare disease similarity analysis</h2>
        <div className="flex">
          <div className="w-1/2 pr-2">
            <SimilarityBarChart data={data} />
          </div>
          <div className="w-1/2 pl-2">
            <SimilarityPieChart data={data} />
          </div>
        </div>
      </div>
    </Card>
  );
}
