import React, { createContext, useState } from 'react'
import A from './A';
// import E from './E';
export const Context = createContext('');
export default function UseContext() {
    const [name,setName]=useState<string>('Quang');
    // dùng props để gửi dữ liệu name(Quang)
    // component E nhận giá trị Quang
  return (
    <div>1tyttytyty
      {/* sinh ra giúp cho việc truyền dữ liệu giữa các component có quan hệ cha con được nhanh hơn, dễ dàng hơn
      không phải truyền thoe kiểu props bình thường.
      - các component phải có quan hệ cha con
      - tạo 1 biến gán = createContext("")
      export biến ra
      - dùng biến này bọc component
      <Biến.Provider value={}>
      - component con muốn nhận data
      import biến đó vào
      useContext(Biến bên trên export)
      */}
      <Context.Provider value={name}>
        <A></A>
      </Context.Provider>
    </div>
  )
}

/* cách để run dev nhanh 
    Ctrl `
    trỏ chuột vào rồi Ctrl C
    mũi tên lên
*/