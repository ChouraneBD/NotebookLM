import Link from 'next/link'

interface ActivityItem {
    id: string
    title: string
    date: string
    score: number
    status: 'Completed' | 'In Progress'
}

interface ActivityTableProps {
    activities: ActivityItem[]
}

export default function ActivityTable({ activities }: ActivityTableProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Recent Exams</h3>
                <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Exam Title</th>
                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Score</th>
                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {activities.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No activity yet.</td>
                            </tr>
                        ) : activities.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="font-medium text-gray-800 block">{item.title}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{item.date}</td>
                                <td className={`px-6 py-4 font-bold ${item.score >= 80 ? 'text-green-600' : item.score >= 50 ? 'text-orange-500' : 'text-red-500'
                                    }`}>
                                    {item.score}%
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <Link href={`/exam/${item.id}/results`} className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                                        View Results
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
