import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Report() {
    const [reports, setReports] = useState([]);
    const [message, setMessage] = useState("");
    const { getToken } = useContext(AuthContext);

    function loadReport() {
        const jwt = getToken();
        if (jwt) {
            fetch('http://localhost:3000/reports', {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Report konnte nicht geladen werden");
                } else {
                    return res.json();
                }
            })
            .then(data => {
                setMessage('');
                setReports(data);
            })
        } else {
            setMessage('Du musst eingeloggt sein.');
        }

        
    }

    return (
        <>
            <button onClick={loadReport}>Lade Reportdaten</button>
            <div>{message}</div>
            {
                reports.map(report => <div key={report.id}>{report.title}</div>)
            }
        </>
    )
}