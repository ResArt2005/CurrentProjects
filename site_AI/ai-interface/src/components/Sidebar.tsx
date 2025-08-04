import styles from '../app/styles/page.module.css';

export default function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={className}>
      <div className={styles['sidebar-header']}>Chat History</div>
      {/* В будущем тут будет список чатов */}
    </aside>
  );
}
