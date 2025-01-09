"use client";
import { useState } from 'react';
import { calculateDayOfWeek } from '@/app/utils';
import { Button, Alert, Form, Input, Card, Divider } from 'antd';

export default function Home() {
  const [weekday, setWeekday] = useState('');

  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Success:', values);
    
    setWeekday(calculateDayOfWeek(values.year, values.month, values.day));
  };

  return (
      <Card 
        title="What Weekday is Today ?"
        style={{ maxWidth: 400, margin: '60px auto', padding: 16, }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item label="Day" name="day" rules={[
            {
              required: true,
              message: 'Please input Day!',
            },
            {
              validator: (_, value) => {
                // ตรวจสอบว่าค่าที่กรอกอยู่ระหว่าง 1–31 หรือไม่
                if (value < 1 || value > 31) {
                  return Promise.reject(new Error('Day must be between 1 and 31!'));
                }
                // ผ่านการตรวจสอบแล้ว
                return Promise.resolve();
              },
            },
          ]}>
            <Input placeholder="please input day" type="number"  />
          </Form.Item>
          <Form.Item label="Month" name="month" rules={[
            {
              required: true,
              message: 'Please input Month!',
            },
            {
              validator: (_, value) => {
                // ตรวจสอบว่าค่าที่กรอกอยู่ระหว่าง 1–31 หรือไม่
                if (value < 1 || value > 12) {
                  return Promise.reject(new Error('Month must be between 1 and 12!'));
                }
                // ผ่านการตรวจสอบแล้ว
                return Promise.resolve();
              },
            },
          ]}>
            <Input placeholder="please input month" type="number" />
          </Form.Item>
          <Form.Item label="Year" name="year" rules={[
            {
              required: true,
              message: 'Please input Year!',
            },
          ]}>
            <Input placeholder="please input year" type="number" />
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
              description={<div>Result: <strong>{weekday}</strong></div>}
              type="success"
              showIcon
            />
          </div>
        )}
      </Card>
  );
}
