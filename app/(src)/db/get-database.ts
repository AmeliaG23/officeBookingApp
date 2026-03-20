import { openDatabaseAsync, SQLiteDatabase } from "expo-sqlite";

let databasePromise: Promise<SQLiteDatabase> | null = null;

export const getDatabase = async (): Promise<SQLiteDatabase> => {
  if (!databasePromise) {
    databasePromise = openDatabaseAsync("office-booking-app.db");
  }
  return databasePromise;
};
// (https://docs.expo.dev/versions/latest/sdk/sqlite/)
