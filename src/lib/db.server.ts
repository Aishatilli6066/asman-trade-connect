import pg from "pg";
const { Pool } = pg;

// Singleton pool to avoid exhausting connections during hot reload
declare global {
  // eslint-disable-next-line no-var
  var _insightsPool: pg.Pool | undefined;
}

function getPool(): pg.Pool {
  if (!globalThis._insightsPool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set.");
    globalThis._insightsPool = new Pool({ connectionString: url, max: 10 });
  }
  return globalThis._insightsPool;
}

export async function dbQuery<T = Record<string, unknown>>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const result = await getPool().query(text, params);
  return result.rows as T[];
}
