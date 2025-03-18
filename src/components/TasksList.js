import { useState, useEffect } from "react"
import axios from "axios"
import Link from 'next/link'
import { useRouter } from 'next/router' // Import useRouter

const TaskList = () => {
    const [tasks, setTasks] = useState([]) // State untuk menyimpan daftar tugas
    const [notification, setNotification] = useState('') // State untuk notifikasi
    const router = useRouter() // Inisialisasi useRouter

    useEffect(() => {
        fetchTasks()

        // Cek query parameter untuk notifikasi
        if (router.query.taskAdded) {
            showNotification('Tugas baru berhasil ditambahkan!')
        }
    }, [router.query]) // Tambahkan router.query sebagai dependensi


    // function get all data tasks
    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/tasks") //api get all data tasks
            setTasks(response.data)
        } catch (error) {
            console.error("Error fetching tasks:", error) //tampilkan pesan error di console
        }
    }
    // function get all data tasks end

    // Fungsi untuk menampilkan notifikasi
    const showNotification = (message) => {
        setNotification(message)
        setTimeout(() => {
            setNotification('') // Reset notifikasi setelah 3 detik
        }, 3000)
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Daftar Tugas</h2>
                <Link href="/tambahTugas" className="btn btn-success">+ Tambah Tugas</Link>
            </div>

            {/* munculkan notofikasi jika ada data yg berhasil di tambahkan */}
            {notification && (
                <div className="alert alert-success" role="alert">
                    {notification}
                </div>
            )}
            {/* munculkan notofikasi jika ada data yg berhasil di tambahkan end*/}

            {/* tabel daftar tugas */}
            <table className="table text-center">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">Nama Karyawan</th>
                        <th scope="col">Task Name</th>
                        <th scope="col">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    {/* tamppikan data daftar tugas */}
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.employee_name}</td>
                                <td>{task.task_name}</td>
                                <td>{task.due_date}</td>
                            </tr>
                        ))
                    ) : (
                        // tampilkan loading saat sedang dalam proses pengambilan data
                        <tr>
                            <td colSpan="3" className="text-center">
                                Loading...
                            </td>
                        </tr>
                        // tampilkan loading saat sedang dalam proses pengambilan data end
                    )}
                    {/* tamppikan data daftar tugas end*/}
                </tbody>
            </table>
            {/* table daftar tugas end */}
        </div>
    )
}

export default TaskList