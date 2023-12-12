import styles from './loading.module.css';

export default function MealsLoading() {
  return <p className={styles.loading}>Fetching meals...</p>;
}
