import Link from 'next/link';

const tags = ['all', 'todo', 'work', 'personal', 'meeting', 'shopping'];

export default function SidebarDefault() {
  return (
    <aside>
      <nav>
        <ul>
          {tags.map(tag => (
            <li key={tag}>
              <Link href={`/notes/filter/${tag}`}>
                {tag === 'all'
                  ? 'All notes'
                  : tag.charAt(0).toUpperCase() + tag.slice(1)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
