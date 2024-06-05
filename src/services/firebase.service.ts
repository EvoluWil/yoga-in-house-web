import { auth, storage } from '@/config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';

type UploadFileDto = {
  file: File;
  collectionId: string;
  destination: string;
  type: string;
};

class FirebaseService {
  async uploadFile(data: UploadFileDto) {
    try {
      const email = process.env.NEXT_PUBLIC_FIREBASE_EMAIL as string;
      const password = process.env.NEXT_PUBLIC_FIREBASE_PASSWORD as string;
      await signInWithEmailAndPassword(auth, email, password);

      const { file, collectionId, destination, type } = data;
      const extName = file.name.split('.').pop();
      const fileName = `${destination}/${collectionId}/${type}.${extName}`;
      const storageRef = ref(storage, fileName);

      const arrayBuffer = await this.readFileAsArrayBuffer(file);
      await uploadBytes(storageRef, new Uint8Array(arrayBuffer));

      return fileName;
    } catch (error) {
      console.error('Error uploading file', error);
      toast.error(
        'Falha ao fazer upload do vídeo. Tente novamente mais tarde!',
      );
    }
  }

  private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as ArrayBuffer);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsArrayBuffer(file);
    });
  }
}

export const firebaseService = new FirebaseService();
