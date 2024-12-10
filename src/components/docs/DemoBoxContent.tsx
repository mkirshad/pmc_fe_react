import type { ReactNode } from 'react'

type DemoBoxContentProps = {
    children?: ReactNode | string
    className?: string
    onClick?: () => void; // Add the onClick handler
}

const DemoBoxContent = ({ children, className, onClick }: DemoBoxContentProps) => {
    return (
        <div
            className={`p-2 rounded-lg text-center font-semibold text-white ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default DemoBoxContent
