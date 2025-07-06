import React, { ReactNode } from 'react'

interface SidebarProps {
    width: string
    children: ReactNode
}
function Sidebar({ width = "300px", children }: SidebarProps) {
    return (
        <div style={{ width }} >
            {children}
        </div>
    )
}

export default Sidebar
