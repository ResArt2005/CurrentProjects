import styles from './styles/page.module.css';
import Sidebar from '@/components/Sidebar';
import Chat from '@/components/Chat';

export default function Home() {
  return (
    <div className={styles.layout}>
      <Sidebar className={styles.sidebar} />
      <main className={styles.main}>
        <h1 className={styles.title}>AI Chat Interface</h1>
        <Chat className={styles.chat} />
      </main>
    </div>
  );
}