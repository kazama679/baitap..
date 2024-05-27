import React, { useState, useEffect } from 'react';

export default function Ss39() {
  const [jobs, setJobs] = useState(JSON.parse(localStorage.getItem('jobs')) || []);
  const [inputValue, setInputValue] = useState('');
  const [editingJob, setEditingJob] = useState(null);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  const handleAddJob = () => {
    if (!inputValue) {
      setError('Tên công việc không được để trống!');
      return;
    }
    if (jobs.some(job => job.name === inputValue)) {
      setError('Tên công việc không được trùng!');
      return;
    }
    setJobs([...jobs, { name: inputValue, completed: false }]);
    setInputValue('');
    setError('');
  };

  const handleEditJob = () => {
    if (!inputValue) {
      setError('Tên công việc không được để trống!');
      return;
    }
    if (jobs.some(job => job.name === inputValue && job !== editingJob)) {
      setError('Tên công việc không được trùng!');
      return;
    }
    setJobs(jobs.map(job => job === editingJob ? { ...job, name: inputValue } : job));
    setInputValue('');
    setEditingJob(null);
    setError('');
  };

  const handleDeleteJob = () => {
    setJobs(jobs.filter(job => job.name !== jobToDelete.name));
    setShowDeleteModal(false);
    setJobToDelete(null);
  };

  const toggleCompletion = (name) => {
    setJobs(jobs.map(job => job.name === name ? { ...job, completed: !job.completed } : job));
  };

  const filteredJobs = jobs.filter(job => {
    if (filter === 'completed') return job.completed;
    if (filter === 'incomplete') return !job.completed;
    return true;
  });

  return (
    <div>
      <h3 className='h3'>Danh sách công việc</h3>
      <div className='all-jobs'>
        <input
          className='input-job'
          type="text"
          placeholder='Nhập tên công việc'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className='button-job'
          onClick={editingJob ? handleEditJob : handleAddJob}
        >
          {editingJob ? 'Sửa' : 'Thêm'}
        </button>
        {error && <div className='name-job'>{error}</div>}
        <div className='span-all'>
          <span className='span span-all-job' onClick={() => setFilter('all')}>TẤT CẢ</span>
          <span className='span span-yes-job' onClick={() => setFilter('completed')}>ĐÃ HOÀN THÀNH</span>
          <span className='span span-no-job' onClick={() => setFilter('incomplete')}>CHƯA HOÀN THÀNH</span>
        </div>
        <div className='box-jobs'>
          {filteredJobs.map((job, index) => (
            <div key={index} className='div-jobs'>
              <div className='div-jobs div-jobs-child1'>
                <input
                  type="checkbox"
                  checked={job.completed}
                  onChange={() => toggleCompletion(job.name)}
                />
                <div className={`job ${job.completed ? 'completed' : ''}`}>
                  {job.name}
                </div>
              </div>
              <div className='div-jobs div-jobs-child2'>
                <div onClick={() => {
                  setInputValue(job.name);
                  setEditingJob(job);
                }}><i className="fa-solid fa-pen"></i></div>
                <div onClick={() => {
                  setShowDeleteModal(true);
                  setJobToDelete(job);
                }}><i className="fa-solid fa-trash"></i></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showDeleteModal && (
        <div className='overlay'>
          <div className='modal-custom'>
            <div className='modal-title'>
              <h4>Xác nhận xóa</h4>
              <i className="fa-solid fa-xmark" onClick={() => setShowDeleteModal(false)}></i>
            </div>
            <div className='modal-body-custom'>
              Bạn có chắc chắn muốn xóa công việc này không?
            </div>
            <div className='modal-footer-custom'>
              <button className='button' onClick={() => setShowDeleteModal(false)}>Hủy</button>
              <button className='button button-delete' onClick={handleDeleteJob}>Xác nhận</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}