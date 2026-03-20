import { getDatabase } from "./get-database";

export const sampleData = async () => {
  const db = await getDatabase();
  await db.execAsync(`BEGIN;`);

  try {
    await db.runAsync(`
    INSERT INTO users (username, workEmail, password) VALUES
    ('Amelia', 'amelia@example.com', 'password123');
  `);

    await db.runAsync(`
    INSERT INTO offices (name, location, capacity) VALUES
    ('Norwich', 200, 3, 'North Wing, South Wing, East Wing');
  `);

    await db.execAsync(`COMMIT;`);
  } catch (error) {
    // If an error occurs, the rollback stops any changes made during attempting to add sample data
    await db.execAsync(`ROLLBACK;`);
    console.error("Error inserting sample data-", error);
    throw error;
  }
};
