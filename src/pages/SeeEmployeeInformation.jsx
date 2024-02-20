import React, { useEffect, useState } from "react";
import { getAllData } from "../services/service";
import { Card } from "antd";
import { Badge } from "antd";
import * as XLSX from "xlsx";
import { DownloadOutlined } from '@ant-design/icons';

const SeeEmployeeInformation = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllData("employees");
        console.log(response?.data);
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "employee_data.xlsx";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className=" h-16">
        <button
          className=" absolute top-8 right-8 z-10 bg-white border-transparent shadow-md rounded-full px-2 aspect-square cursor-pointer"
          onClick={downloadExcel}
        >
          <DownloadOutlined className=" text-xl" />
        </button>
      </div>
      <div>
        {data.map((i) => {
          return (
            <Card title={i?.full_name} className=" mb-2">
              <span className=" text-base font-semibold">{i?.domain}</span>{" "}
              &nbsp;
              {/* <Badge
                className="site-badge-count-109"
                style={{
                  backgroundColor: "#52c41a",
                }}
                count={i?.years_of_experience}
              /> */}
              <span className=" px-2 text-xs rounded-full bg-green-700 text-white">
                {i?.years_of_experience} Years+
              </span>
              <div className=" text-sm">
                {" "}
                <span className=" font-semibold">Skills: </span>
                {i?.skills}
              </div>
              <span className=" text-xs bg-black text-white border px-2 rounded-full">
                {i?.mobile_number}
              </span>{" "}
              &nbsp;&nbsp;
              <span className=" text-xs bg-black text-white border px-2 rounded-full">
                {i?.email}
              </span>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SeeEmployeeInformation;
