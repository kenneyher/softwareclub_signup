import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Render DB requires SSL
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, year } = req.body;

  if (!name || !email || !phone || !year) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const client = await pool.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        year TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await client.query(
      "INSERT INTO students (name, email, phone, year) VALUES ($1, $2, $3, $4)",
      [name, email, phone, year]
    );

    client.release();

    return res.status(200).json({ success: true, message: "Student added!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Database error" });
  }
}
