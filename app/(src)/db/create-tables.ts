// migrations.ts
import { getDatabase } from "./get-database";

const tables = {
  id: 1,
  name: "init_schema",
  up: `
        PRAGMA foreign_keys = ON;
        
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        workEmail TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS offices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        location TEXT NOT NULL UNIQUE,
        capacity INTEGER NOT NULL,
        floors INTEGER NOT NULL,
        areas TEXT NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS seatBookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        officeId INTEGER NOT NULL,
        bookingDate TEXT NOT NULL,  -- YYYY-MM-DD
        seatPosition INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (officeId) REFERENCES offices(id) ON DELETE CASCADE
        );`,
};

// might want:
// -- Prevent double-booking the same seat for the same day & office
// CREATE UNIQUE INDEX IF NOT EXISTS ux_seat_unique
//   ON seatBookings (officeId, bookingDate, seatPosition);

// -- Helpful indexes
// CREATE INDEX IF NOT EXISTS ix_seat_bookings_date
//   ON seatBookings (bookingDate);
// CREATE INDEX IF NOT EXISTS ix_seat_bookings_office_date
//   ON seatBookings (officeId, bookingDate);

export async function createTables() {
  const db = await getDatabase();

  await db.execAsync("PRAGMA foreign_keys = ON;");
  await db.runAsync(`CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      appliedAt TEXT NOT NULL
    );
  `);
  // https://www.w3resource.com/sqlite/snippets/working-with-expo-sqlite.php
}

// export async function runMigrations() {
//   const db = await getDatabase();

//   await db.runAsync(`
//     CREATE TABLE IF NOT EXISTS migrations (
//       id INTEGER PRIMARY KEY,
//       name TEXT NOT NULL,
//       appliedAt TEXT NOT NULL
//     );
//   `);

//   const applied = await db.getAllAsync<{ id: number }>(
//     "SELECT id FROM migrations ORDER BY id",
//   );
//   const appliedSet = new Set(applied.map((r) => r.id));

//   for (const m of migrations) {
//     if (appliedSet.has(m.id)) continue;

//     await db.execAsync("BEGIN;");
//     try {
//       await db.execAsync(m.up);
//       await db.runAsync(
//         "INSERT INTO migrations (id, name, appliedAt) VALUES (?, ?, ?)",
//         [m.id, m.name, new Date().toISOString()],
//       );
//       await db.execAsync("COMMIT;");
//     } catch (e) {
//       await db.execAsync("ROLLBACK;");
//       throw e;
//     }
//   }
// }
