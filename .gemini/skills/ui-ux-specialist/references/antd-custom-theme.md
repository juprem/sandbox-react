# Ant Design Custom Theme

## ConfigProvider Setup

```tsx
import { ConfigProvider, theme } from "antd";

export const ThemeProvider = ({ children }) => (
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm, // Or default
      token: {
        colorPrimary: "#1a73e8",
        borderRadius: 8,
        fontFamily: "Inter, sans-serif",
      },
      components: {
        Button: {
          colorPrimary: "#1a73e8",
          algorithm: true,
        },
      },
    }}
  >
    {children}
  </ConfigProvider>
);
```

## Responsive Grid

```tsx
import { Row, Col } from "antd";

export const Layout = () => (
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} lg={8}>
      Card 1
    </Col>
    <Col xs={24} sm={12} lg={8}>
      Card 2
    </Col>
    <Col xs={24} sm={12} lg={8}>
      Card 3
    </Col>
  </Row>
);
```
