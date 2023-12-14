import Image from 'next/image';
import styles from './page.module.css';
import { getMeal } from '@/lib/Meals';
import { notFound } from 'next/navigation';
import { getImageUrl } from '@/lib/FirebaseStorage';

async function FirebaseImage({ image }) {
  const imageUrl = await getImageUrl(image);

  return (
    <Image
      src={imageUrl}
      alt="Meal image"
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority
    />
  );
}

export default function Meal({ params }) {
  const meal = getMeal(params.meal);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');
  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <FirebaseImage image={meal.image} />
        </div>
        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={styles.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
