import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { CompanyInformation } from "./pages/CompanyInformation";
import { EmployeeInformation } from "./pages/EmployeeInformation";
import { Home } from "./pages/Home";
import SeeEmployeeInformation from "./pages/SeeEmployeeInformation";
import SeeCompanyInformation from "./pages/SeeCompanyInformation";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, path, key, icon, children) {
  return {
    key,
    path,
    icon,
    children,
    label,
  };
}
const items = [
  // getItem("Company", "1", <PieChartOutlined />),
  // getItem("Employee", "2", <UserOutlined />),
  // getItem("Company", "sub1", <UserOutlined />, [
  getItem("All Companies", "all-companies", "1", <UserOutlined />),
  // getItem("Register Company", "company", "2", <UserOutlined />),
  // ]),
  // getItem("Employee", "sub2", <TeamOutlined />, [
  getItem("All Employees", "all-employees", "3", <UserOutlined />),
  // getItem("Register Employee", "employee", "4", <UserOutlined />),
  // ]),
  // getItem("Files", "9", <FileOutlined />),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
          className=" sticky top-0 left-0 h-screen"
        >
          <div className="demo-logo-vertical h-16">hi</div>
          {/* <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        /> */}
          <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
            {items.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout className=" flex flex-col h-screen">
          <div className=" h-16"></div>
          <div className=" px-4 pb-4 overflow-y-scroll overflow-x-hidden">
            <Routes>
              <Route
                exact
                path="/"
                element={<Navigate to="/company" replace={true} />}
              />
              <Route exact path="/company" element={<CompanyInformation />} />
              <Route exact path="/employee" element={<EmployeeInformation />} />
              <Route
                exact
                path="/all-companies"
                element={<SeeCompanyInformation />}
              />
              <Route
                exact
                path="/all-employees"
                element={<SeeEmployeeInformation />}
              />
            </Routes>
          </div>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
