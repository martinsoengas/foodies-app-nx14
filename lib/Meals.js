import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { uploadImage } from '@/lib/FirebaseStorage';

const db = sql('meals.db');

export async function getMeals() {
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  const extension = meal.image.name.substring(meal.image.name.lastIndexOf('.'));
  meal.image.uri = meal.image.size + '_' + meal.image.lastModified + extension;

  await uploadImage(meal.image);

  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  meal.image = meal.image.uri;

  db.prepare(
    `INSERT INTO meals (title, slug, summary, instructions, image, creator, creator_email) VALUES (@title, @slug, @summary, @instructions, @image, @creator, @creator_email)`
  ).run(meal);
}
