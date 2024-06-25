import React, { useState, useEffect } from 'react'
import PageTitle from '../../../components/PageTitle'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { message, Table } from "antd";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { deleteExamById, getAllExams } from '../../../apicalls/exams';


function Exams() {

    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const dispatch = useDispatch();

    const getExamsData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await getAllExams();
        dispatch(HideLoading());
        if (response.success) {
          setExams(response.data);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    };

    const deleteExam = async (examId) => {
      try {
        dispatch(ShowLoading());
        const response = await deleteExamById({
          examId,
        });
        dispatch(HideLoading());
        if (response.success) {
          message.success(response.message);
          getExamsData();
        } else {
          message.error(response.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
      }
    };

    const columns = [
      {
        title: 'Exam Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
      },
      {
        title: 'Total Marks',
        dataIndex: 'totalMarks',
        key: 'totalMarks',
      },
      {
        title: 'Passing Marks',
        dataIndex: 'passingMarks',
        key: 'passingMarks',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: (text, record) => (
          <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteExam(record._id)}
          ></i>
        </div>
        ),
      },
    ];
  

    useEffect(() => {
      getExamsData();
    }, []);  

  return (
    <div>
      <div className="flex justify-between mt-2 items-end">
        <PageTitle title="Exams" />

        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => navigate("/admin/exams/add")}
        >
          <i className="ri-add-line"></i>
          Add Exam
        </button>
      </div>
      <div className="divider"></div>

  <Table columns={columns} dataSource={exams} />
    </div>
  )
}

export default Exams
