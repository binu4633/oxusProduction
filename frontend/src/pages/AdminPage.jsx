import React from 'react'
import AdminBase from '../components/admin/AdminBase'
function AdminPage() {
  const style={
    minHeight:'100vh',
    backgroundColor:'var(--bg-1)'
  }
  return (
    <div style={style}>
     <AdminBase />
    </div>
  )
}

export default AdminPage
