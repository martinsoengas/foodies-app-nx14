import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const uploadImage = async (imageFile) => {
  const storageRef = ref(storage, 'images/' + imageFile.uri);
  try {
    const blob = new Blob([imageFile], { type: imageFile.type });

    await uploadBytes(storageRef, blob);
    console.log('Image uploaded');
  } catch (error) {
    console.error('Error to upload image', error);
  }
};

const getImageUrl = async (filePath) => {
  const storage = getStorage();
  const storageRef = ref(storage, 'images/' + filePath);
  try {
    const url = await getDownloadURL(storageRef);

    return url;
  } catch (error) {
    console.error('Error to get image', error);
  }
};

export { uploadImage, getImageUrl };
