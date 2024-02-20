import React, { useEffect, useState } from "react";
import { getAllData } from "../services/service";
import { Card } from "antd";
import * as XLSX from "xlsx";

const SeeCompanyInformation = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllData("companies");
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
    a.download = "company_data.xlsx";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={downloadExcel}>Download Excel</button>
      <div>
        {data.map((i) => {
          return (
            <Card title={i?.company_name} className=" mb-2">
              <div className=" text-base">{i?.company_information}</div>
              <div className=" text-sm">
                {" "}
                <span className=" font-semibold">Address: </span>
                {i?.company_address}
              </div>
              <span className=" text-xs bg-black text-white border px-2 rounded-full">
                {i?.phone_number}
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

export default SeeCompanyInformation;
