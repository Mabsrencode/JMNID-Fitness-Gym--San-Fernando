import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import VerifyButton from "../../components/CustomButtons/VerifyButton";
import DeclineButton from "../../components/CustomButtons/DeclineButton";
const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get("/client/all-users");
            const data = response?.data || [];
            const filteredData = data.map((item) => ({
                username: item.username,
                email: item.email,
                fullName: `${item.firstName} ${item.lastName}`,
                accountId: item._id,
                role: item.role,
                status: item.membership_status,
                action: item._id,
            }));
            setRowData(filteredData);
            setColDefs([
                { field: "username", headerName: "Username" },
                { field: "email", headerName: "Email" },
                { field: "fullName", headerName: "Full Name" },
                { field: "accountId", headerName: "Account ID" },
                { field: "role", headerName: "Role" },
                { field: "status", headerName: "Status" },
                {
                    field: "action",
                    headerName: "Action",
                    cellRenderer: (params) => (
                        <div style={{ display: "flex", gap: "10px" }}>
                            <VerifyButton
                                _id={params.data.action}
                                status={params.data.status}
                                handleFunction={fetchUsers}
                            />
                            <DeclineButton
                                _id={params.data.action}
                                status={params.data.status}
                                handleFunction={fetchUsers}
                            />
                        </div>
                    ),
                },
            ]);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);
    return (
        <div className="ag-theme-quartz h-[85vh]">
            <AgGridReact
                pagination
                rowData={rowData}
                columnDefs={colDefs}
                loading={loading}
            />
        </div>
    );
};

export default Dashboard;
