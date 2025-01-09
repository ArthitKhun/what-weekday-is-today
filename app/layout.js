import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata = {
  title: "What Weekday is Today?",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
