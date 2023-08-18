import { Newsinterface } from 'src/interface/news.interface';

export const FirestoreDatabaseProvider = 'firestoredb';
export const FirestoreOptionsProvider = 'firestoreOptions';
export const FirestoreCollectionProviders: string[] = [
  Newsinterface.collectionName,
];
