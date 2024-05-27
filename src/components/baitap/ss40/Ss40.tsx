import React, { useState, useEffect, ChangeEvent } from 'react';
import Add from './Add';
import Modal from './Modal';

interface Employee {
  userName: string;
  dateOfBirth: string;
  email: string;
  address: string;
  status: 'active' | 'inactive';
}

export default function Ss40() {
  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; message: string; handleConfirm: () => void; }>();
  const [employees, setEmployees] = useState<Employee[]>(JSON.parse(localStorage.getItem('employees') || '[]'));
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>(employees);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
    setFilteredEmployees(employees.filter(emp => emp.email.includes(searchTerm)));
  }, [employees, searchTerm]);

  const handleShowForm = () => {
    setSelectedEmployee(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const addEmployee = (employee: Employee) => {
    setEmployees([...employees, employee]);
  };

  const editEmployee = (updatedEmployee: Employee) => {
    setEmployees(employees.map(emp => emp.email === updatedEmployee.email ? updatedEmployee : emp));
  };

  const handleDelete = (employee: Employee) => {
    setModalContent({
      title: 'Cảnh báo',
      message: 'Bạn có chắc chắn muốn xóa tài khoản này?',
      handleConfirm: () => {
        setEmployees(employees.filter(emp => emp.email !== employee.email));
        setShowModal(false);
      },
    });
    setShowModal(true);
  };

  const handleBlock = (employee: Employee) => {
    setModalContent({
      title: 'Cảnh báo',
      message: `Bạn có chắc chắn muốn ${employee.status === 'active' ? 'chặn' : 'bỏ chặn'} tài khoản này?`,
      handleConfirm: () => {
        setEmployees(employees.map(emp => emp.email === employee.email ? { ...emp, status: emp.status === 'active' ? 'inactive' : 'active' } : emp));
        setShowModal(false);
      },
    });
    setShowModal(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {showForm && <Add handleCloseForm={handleCloseForm} addEmployee={addEmployee} editEmployee={editEmployee} selectedEmployee={selectedEmployee} />}
      {showModal && modalContent && <Modal {...modalContent} handleClose={() => setShowModal(false)} />}

      <div className="w-[80%] m-auto mt-4 h-[100vh]">
        <main className="main">
          <header className="d-flex justify-content-between mb-3">
            <h3>Nhân viên</h3>
            <button onClick={handleShowForm} className="btn btn-primary">Thêm mới nhân viên</button>
          </header>
          <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
            <input
              style={{ width: 350 }}
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo email"
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="fa-solid fa-arrows-rotate" title="Refresh" onClick={() => setSearchTerm('')} />
          </div>
          {/* Danh sách nhân viên */}
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{employee.userName}</td>
                  <td>{employee.dateOfBirth}</td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{employee.status === 'active' ? 'Hoạt động' : 'Bị chặn'}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => handleEdit(employee)}>Chỉnh sửa</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(employee)}>Xóa</button>
                    <button className="btn btn-secondary" onClick={() => handleBlock(employee)}>
                      {employee.status === 'active' ? 'Chặn' : 'Bỏ chặn'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
}
