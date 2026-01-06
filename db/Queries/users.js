import db from "#db/client";

export async function createUser(
  customer_id,
  employee_id,
  email,
  password_hash,
  role
) {
  const sql = `
    INSERT INTO users
        (customer_id, employee_id, email, password_hash, role)
    VALUE
        ($1, $2, $3, $4, $5)
    RETURNING *;
    `;
  const {
    rows: [newUser],
  } = await db.query(sql, [
    customer_id,
    employee_id,
    email,
    password_hash,
    role,
  ]);
  return newUser;
}
