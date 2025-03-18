import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const TambahTugas = () => {
    const [employees, setEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState('')
    const [taskName, setTaskName] = useState('')
    const [dueDate, setDueDate] = useState('')

    const router = useRouter() // Inisialisasi useRouter

    useEffect(() => {
        fetchEmployees() //ambil data employees ketika on mounted
    }, [])

    // function get all data employees
    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/employees") //api get all data employees
            setEmployees(response.data)
        } catch (error) {
            console.error("Error fetching employees:", error)
        }
    }
    //function get  all data employees end 

    // function tambah tugas baru
    const handleSimpan = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8000/api/tasks", {
                employees_id: selectedEmployee,
                task_name: taskName,
                due_date: dueDate
            }) //api tambah tugas baru
            // Arahkan ke halaman TaskList dengan query parameter
            router.push('/?taskAdded=true') //direct ke halaman utama
        } catch (error) {
            console.log("Error saving task:", error)//tampilkan pesan error di console
        }
    }
    // function tambah tugas baru end

    return (
        <div className="container mt-5">
            <h2>Tambah Tugas</h2>

            {/* Form tambah tugas baru */}
            <form className='mt-4' onSubmit={handleSimpan}>
                <div className="mb-3">
                    <label htmlFor="employeeName" className="form-label">Nama Karyawan</label>
                    <select
                        id="employeeName"
                        className="form-select"
                        required
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                    >
                        <option value="">Pilih Karyawan</option>
                        {employees.map((em) => (
                            <option key={em.id} value={em.id}>{em.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="taskName" className="form-label">Nama Tugas</label>
                    <input
                        type="text"
                        id="taskName"
                        className="form-control"
                        placeholder="Masukkan nama tugas"
                        required
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        className="form-control"
                        required
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-success">Simpan</button>
            </form>
            {/* form tambah tugas baru end */}
        </div>
    )
}

export default TambahTugas