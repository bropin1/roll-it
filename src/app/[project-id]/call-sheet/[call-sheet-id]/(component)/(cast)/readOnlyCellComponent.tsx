import { MouseEventHandler } from "react";

export default function ReadOnlyCellComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ padding: "0 16px" }}>{children}</div>;
}
