import React, { useEffect, useState } from "react";
import axios from "axios";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    axios.get("/audit-logs").then(res => setLogs(res.data));
  }, []);
  return (
    <table>
      <thead>
        <tr><th>User</th><th>Record</th><th>Action</th><th>Timestamp</th></tr>
      </thead>
      <tbody>
        {logs.map(l => (
          <tr key={l.id}>
            <td>{l.userId}</td>
            <td>{l.recordId}</td>
            <td>{l.action}</td>
            <td>{l.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default AuditLogs;
