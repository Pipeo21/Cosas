
export function Tabs({ defaultValue, children, className }) {
  return <div className={className}>{children}</div>;
}
export function TabsList({ children, className }) {
  return <div className={className}>{children}</div>;
}
export function TabsTrigger({ children, value }) {
  return <button data-value={value}>{children}</button>;
}
export function TabsContent({ children, value }) {
  return <div data-value={value}>{children}</div>;
}
