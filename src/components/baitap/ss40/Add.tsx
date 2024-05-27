import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Employee {
  userName: string;
  dateOfBirth: string;
  email: string;
  address: string;
  status?: 'active' | 'inactive';
}

interface AddProps {
  handleCloseForm: () => void;
  addEmployee: (employee: Employee) => void;
  editEmployee: (employee: Employee) => void;
  selectedEmployee: Employee | null;
}

export default function Add({ handleCloseForm, addEmployee, editEmployee, selectedEmployee }: AddProps) {
  const [formValues, setFormValues] = useState<Employee>({
    userName: '',
    dateOfBirth: '',
    email: '',
    address: '',
    status: 'active',
  });
  const [errors, setErrors] = useState<Partial<Employee>>({});

  useEffect(() => {
    if (selectedEmployee) {
      setFormValues(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    let formErrors: Partial<Employee> = {};
    if (!formValues.userName) formErrors.userName = 'Họ và tên không được để trống.';
    if (!formValues.email) formErrors.email = 'Email không được để trống.';
    else if (!/\S+@\S+\.\S+/.test(formValues.email)) formErrors.email = 'Email không đúng định dạng.';
    if (new Date(formValues.dateOfBirth) > new Date()) formErrors.dateOfBirth = 'Ngày sinh không được lớn hơn ngày hiện tại.';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      if (selectedEmployee) {
        editEmployee(formValues);
      } else {
        addEmployee(formValues);
      }
      handleCloseForm();
    }
  };

  return (
    <div className="overlay">
      <form className="form" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center">
          <h4>{selectedEmployee ? 'Chỉnh sửa nhân viên' : 'Thêm mới nhân viên'}</h4>
          <i className="fa-solid fa-xmark" onClick={handleCloseForm} />
        </div>
        <div>
          <label className="form-label" htmlFor="userName">Họ và tên</label>
          <input
            name='userName'
            onChange={handleChange}
            value={formValues.userName}
            id="userName"
            type="text"
            className="form-control"
          />
          {errors.userName && <div className="form-text error">{errors.userName}</div>}
        </div>
        <div>
          <label className="form-label" htmlFor="dateOfBirth">Ngày sinh</label>
          <input
            name='dateOfBirth'
            onChange={handleChange}
            value={formValues.dateOfBirth}
            id="dateOfBirth"
            type="date"
            className="form-control"
          />
          {errors.dateOfBirth && <div className="form-text error">{errors.dateOfBirth}</div>}
        </div>
        <div>
          <label className="form-label" htmlFor="email">Email</label>
          <input
            name='email'
            onChange={handleChange}
            value={formValues.email}
            id="email"
            type="text"
            className="form-control"
          />
          {errors.email && <div className="form-text error">{errors.email}</div>}
        </div>
        <div>
          <label className="form-label" htmlFor="address">Địa chỉ</label>
          <textarea
            name='address'
            onChange={handleChange}
            value={formValues.address}
            className="form-control"
            id="address"
            rows={3}
          />
        </div>
        <div>
          <button className="w-100 btn btn-primary">{selectedEmployee ? 'Cập nhật' : 'Thêm mới'}</button>
        </div>
      </form>
    </div>
  );
}
