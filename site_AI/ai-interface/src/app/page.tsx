import Chat from '@/components/Chat';
import styles from './styles/page.module.css';

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chat Interface</h1>
      <Chat />
      <button className={styles.myButton}>test button</button>
    </main>
  );
}