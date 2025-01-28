import DashboardSidebar from '@/components/DashboardSidebar'
import React from 'react'
import { Route, } from 'react-router-dom'

function DashboardLayout() {
    return (
        <div>
            <DashboardSidebar />
            
            <Route>
                <Route path='./my-info'  element={<h1>Welcome to dashboard</h1>} />
            </Route>
        </div>
    )
}

export default DashboardLayout