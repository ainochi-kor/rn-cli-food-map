import {Restrant} from '../types/firebase.api.types';
import database from '@react-native-firebase/database';

export const saveNewRestrant = async (newRestrant: Restrant) => {
  const db = database().ref('/restrant');
  const saveItem = {
    ...newRestrant,
  };

  await db.push().set({...saveItem});
};

export const getRestrantList = async (): Promise<Restrant[]> => {
  const db = database().ref('/restrant');
  const snapshotValue = await db.once('value').then(snapshot => {
    return snapshot.val();
  });

  return Object.keys(snapshotValue).map(key => snapshotValue[key]);
};
