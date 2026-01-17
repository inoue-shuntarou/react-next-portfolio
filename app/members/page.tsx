import Image from 'next/image';
import { getMembersList } from '@/app/_libs/microcms';
import { MEMBERS_LIST_LIMIT } from '@/app/_constants';
import styles from './page.module.css';

export default async function Page() {
  const data = await getMembersList({ limit: MEMBERS_LIST_LIMIT });
  return (
    <div className={styles.container}>
      {data.contents.length === 0 ? (
        <p className={styles.empty}>自己紹介が登録されていません。</p>
      ) : (
        <ul>
          {data.contents.map((item) => (
            <li key={item.id} className={styles.list}>
              <Image
                src={item.thumbnail?.url ?? '/no-image.png'}
                alt=""
                width={item.thumbnail?.width ?? 1200}
                height={item.thumbnail?.height ?? 630}
                className={styles.image}
              />
              <dl>
                <dt className={styles.name}>{item.title}</dt>
                <dd className={styles.position}>{item.description}</dd>
                <dd className={styles.profile}>{item.content}</dd>
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
