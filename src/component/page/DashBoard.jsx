import React, { useEffect, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaBook, FaChalkboardTeacher } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import axiosinstance from "../../Hoc/Axios";

function DashBoard() {
  const [dashboard, setDashboard] = useState({});

  const data = [
    {
      name: "Course",
      uv: dashboard.courseNum || 0,
      pv: dashboard.courseNum || 0,
      amt: dashboard.courseNum || 0,
    },
    {
      name: "Category",
      uv: dashboard.categoryNum || 0,
      pv: dashboard.categoryNum || 0,
      amt: dashboard.categoryNum || 0,
    },
    {
      name: "Students",
      uv: dashboard.studentNum || 0,
      pv: dashboard.studentNum || 0,
      amt: dashboard.studentNum || 0,
    },
    {
      name: "Instructor",
      uv: dashboard.instructorNum || 0,
      pv: dashboard.instructorNum || 0,
      amt: dashboard.instructorNum || 0,
    },
  ];

  useEffect(() => {
    axiosinstance
      .get("/dashboard")
      .then((res) => {
        setDashboard(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-20 lg:ml-48">
      <div className="text-2xl font-bold  text-purple-700 font ml-5 mb-5">
        Dashboard
      </div>

      <div className="mx-5 sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-4 sm:gap-5">
        <div className="h-36 w-full bg-red-600 rounded-lg text-white">
          <div className="flex justify-between mx-8 mt-6">
            <div className="text-2xl font-semibold">Course</div>
            <FaBook className="mt-2 text-2xl" />
          </div>
          <div className="text-2xl font-bold ml-8 mt-5">
            {dashboard.courseNum || 0}
          </div>
        </div>

        <div className="h-36 w-full bg-blue-600 rounded-lg text-white">
          <div className="flex justify-between mx-8 mt-6">
            <div className="text-2xl font-semibold">Category</div>
            <BiSolidCategory className="mt-2 text-2xl" />
          </div>
          <div className="text-2xl font-bold ml-8 mt-5">
            {dashboard.categoryNum || 0}
          </div>
        </div>

        <div className="h-36 w-full bg-green-600 rounded-lg text-white">
          <div className="flex justify-between mx-8 mt-6">
            <div className="text-2xl font-semibold">Students</div>
            <PiStudent className="mt-2 text-2xl" />
          </div>
          <div className="text-2xl font-bold ml-8 mt-5">
            {dashboard.studentNum || 0}
          </div>
        </div>

        <div className="h-36 w-full bg-orange-600 rounded-lg text-white">
          <div className="flex justify-between mx-8 mt-6">
            <div className="text-2xl font-semibold">Instructor</div>
            <FaChalkboardTeacher className="mt-2 text-2xl" />
          </div>
          <div className="text-2xl font-bold ml-8 mt-5">
            {dashboard.instructorNum || 0}
          </div>
        </div>
      </div>

      <div className="charts flex flex-col gap-10 lg:flex lg:flex-row">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="pv"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="uv"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashBoard;