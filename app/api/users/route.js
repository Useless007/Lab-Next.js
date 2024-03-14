import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test',
});

export async function GET() {
let sql = "SELECT * FROM table_user"

const [results, fields] = await connection.execute(sql);
    if(results) {
        return Response.json({ results }, { status : 200})
    }
}

export async function POST(request) {
  let {username, password} = await request.json()
  let sql = `INSERT INTO table_user (username, password)
  VALUES (?, `)`;
  
  const [results] = await connection.execute(sql,
    [username, password]);

  if(results) {
    return Response.json("เพิ่มผู้ใช้สำเร็จ", { status : 200 })
  }

}

export async function PUT(request) {
  let { username, id } = await request.json();

  let sql = "UPDATE table_user SET username = ? WHERE id = ?"

  const [results] = await connection.execute(sql, [username, id])

  if(results) {
    return Response.json("อัพเดทข้อมูลสำเร็จ", { status : 200 })
  }
  return Response.json("Server error", { status : 404})
}

export async function DELETE(request) {
  let { id } = await request.json();

  let sql = "DELETE FROM table_user WHERE id = ?"

  const [results] = await connection.execute(sql, [id])

  if(results) {
    return Response.json("ลบข้อมูลสำเร็จ", { status : 200 })
  }

  return Response.json("Server error", { status : 404})
}
  


