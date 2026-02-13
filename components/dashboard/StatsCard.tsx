import React from 'react'

interface StatsCardProps {
    title: string
    value: string | number
    icon?: React.ReactNode
    trend?: string
    trendColor?: string // e.g., text-green-600
    className?: string
}

export default function StatsCard({ title, value, icon, trend, trendColor, className }: StatsCardProps) {
    return (
        <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 ${className}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                    <p className={`text-3xl font-bold mt-2 ${trendColor || 'text-gray-800'}`}>{value}</p>
                </div>
                {icon && <div className="p-2 bg-gray-50 rounded-lg text-gray-400">{icon}</div>}
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    <span className={`${trendColor} font-medium`}>{trend}</span>
                    <span className="text-gray-400 ml-2">vs last month</span>
                </div>
            )}
        </div>
    )
}
