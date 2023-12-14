import Link from 'next/link';
import Image from 'next/image';

import styles from './mealItem.module.css';
import { getImageUrl } from '@/lib/FirebaseStorage';

async function FirebaseImage({ image, title }) {
  const imageUrl = await getImageUrl(image);

  return (
    <Image
      src={imageUrl}
      alt={title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority
    />
  );
}

export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={styles.meal}>
      <header>
        <div className={styles.image}>
          <FirebaseImage image={image} title={title} />
        </div>
        <div className={styles.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={styles.content}>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
