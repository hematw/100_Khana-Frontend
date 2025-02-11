import { AppSidebar } from '@/components/app-sidebar'
import { Route, } from 'react-router-dom'

function DashboardLayout() {
    return (
        <div>
            <AppSidebar />

            <Route>
                <Route path='./my-info' element={<h1>Welcome to dashboard</h1>} />
            </Route>
        </div>
    )
}

export default DashboardLayout