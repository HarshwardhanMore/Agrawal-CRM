import React from "react";
import { Button, Form, Input, Space } from "antd";
import { createData } from "../services/service";
import { message } from "antd";
const SubmitButton = ({ form }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);
  React.useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(
        () => {
          setSubmittable(true);
        },
        () => {
          setSubmittable(false);
        }
      );
  }, [values]);
  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const CompanyInformation = () => {
  const [form] = Form.useForm();
  const onFinish = async (value) => {
    console.log(value);
    const response = await createData("companies", value);
    if (response.status == 200) {
      form.resetFields();
      message.success("Employee Information Registered!");
    } else {
      message.error("Unable to Register Employee Information!");
    }
    console.log("response : ", response);
  };
  return (
    <div>
      <div>
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            name="company_name"
            label="Company Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="company_information"
            label="Company Information"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="company_address"
            label="Company Address"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item>
            <Space>
              <SubmitButton form={form} />
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export { CompanyInformation };
