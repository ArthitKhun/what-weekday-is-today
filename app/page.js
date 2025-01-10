"use client";

import { Alert, Button, Card, Divider, Form, Input, Typography } from "antd";
import { useState } from "react";

import { calculateDayOfWeek, isValidDate } from "@/app/utils";

const { Title } = Typography;

export default function Home() {
  const [weekday, setWeekday] = useState("");
  const [error, setError] = useState("");

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    setError("");
    setWeekday("");
    console.log("Form values:", values);

    // Validate the date before calculating
    if (!isValidDate(values.year, values.month, values.day)) {
      setError("Invalid Date! Please check the day, month, and year.");
      // reset last result

      return;
    } else {
      setWeekday(calculateDayOfWeek(values.year, values.month, values.day));
    }
  };

  return (
    <Card
      title={<Title level={3}>What Weekday is Today?</Title>}
      style={{ maxWidth: 400, margin: "60px auto", padding: 16 }}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item>
          {error && <Alert message={error} type="error" showIcon />}
        </Form.Item>
        <Form.Item
          label="Day"
          name="day"
          rules={[
            {
              required: true,
              message: "Please input Day!",
            },
            {
              validator: (_, value) => {
                if (value < 1 || value > 31) {
                  return Promise.reject(new Error("Invalid day!"));
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="Please input day" type="number" />
        </Form.Item>
        <Form.Item
          label="Month"
          name="month"
          rules={[
            {
              required: true,
              message: "Please input Month!",
            },
            {
              validator: (_, value) => {
                if (value < 1 || value > 12) {
                  return Promise.reject(
                    new Error("Month must be between 1 and 12!"),
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="Please input month" type="number" />
        </Form.Item>
        <Form.Item
          label="Year"
          name="year"
          rules={[
            {
              required: true,
              message: "Please input Year!",
            },
            {
              validator: (_, value) => {
                if (value < 1900) {
                  return Promise.reject(
                    new Error("Year must be 1900 or later!"),
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="Please input year" type="number" />
        </Form.Item>
        <Form.Item style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit" block size="large">
            Find Weekday
          </Button>
        </Form.Item>
      </Form>

      {weekday && (
        <div style={{ marginTop: 16 }}>
          <Divider />
          <Alert
            description={
              <div>
                Result: <strong>{weekday}</strong>
              </div>
            }
            type="success"
            showIcon
          />
        </div>
      )}
    </Card>
  );
}
