import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
const Dashboard = () => {
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(false)
    const [rowData, setRowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true)
                const data = await axios.get('/users/all-users')?.data;
                setUsers(data)
            } catch (error) {

            } finally {
                setLoading(false);
            }
        }
        fetchUsers()
    }, [])
    return (
        <div
            className="ag-theme-quartz" // applying the Data Grid theme
            style={{ height: 500 }} // the Data Grid will fill the size of the parent container
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}

export default Dashboard