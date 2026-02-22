interface FilterLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function FilterLayout({ children, sidebar }: FilterLayoutProps) {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}
