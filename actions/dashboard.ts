'use server'

import { createClient } from '@/utils/supabase/server'

export async function getDashboardStats() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Use authorized user or fallback to mock for dev
    const userId = user?.id || '00000000-0000-0000-0000-000000000000'

    // Fetch exams for the user
    const { data: exams } = await supabase
        .from('exams')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    // 4. Construct Return Object
    const safeExams = exams || []

    // Calculate Weekly Average
    const completedExams = safeExams.filter(e => e.status === 'completed' && e.score !== null)
    const totalScore = completedExams.reduce((acc, curr) => acc + (curr.score || 0), 0)
    const weeklyAverage = completedExams.length > 0 ? Math.round(totalScore / completedExams.length) : 0

    // --- Analytics: Performance History (Last 7 Days) ---
    const performanceHistory = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - (6 - i))
        const dateStr = d.toLocaleDateString()

        // Find exams for this day
        const dayExams = completedExams.filter(e =>
            new Date(e.created_at || new Date().toISOString()).toLocaleDateString() === dateStr
        )

        const dayAvg = dayExams.length > 0
            ? Math.round(dayExams.reduce((acc, curr) => acc + (curr.score || 0), 0) / dayExams.length)
            : 0

        return {
            date: dateStr,
            dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
            score: dayAvg,
            count: dayExams.length
        }
    })

    // --- Analytics: Top/Weak Subjects (Inferred from Title) ---
    // Group by "Topic" (simplified as everything before " - " or just the title)
    const topicStats: Record<string, { total: number; count: number }> = {}

    completedExams.forEach(e => {
        // Simple heuristic: Take first 3 words or split by colon/hyphen
        // E.g., "Practice Exam: Biology.pdf" -> "Biology"
        let topic = e.title.replace('Practice Exam: ', '').split('.')[0] // Remove extension

        if (!topicStats[topic]) topicStats[topic] = { total: 0, count: 0 }
        topicStats[topic].total += (e.score || 0)
        topicStats[topic].count += 1
    })

    const topics = Object.entries(topicStats).map(([name, data]) => ({
        name,
        average: Math.round(data.total / data.count),
        count: data.count
    })).sort((a, b) => b.average - a.average)

    const topSubject = topics.length > 0 ? topics[0] : null
    const weakSubject = topics.length > 0 ? topics[topics.length - 1] : null

    // Format Recent Activity
    const recentActivity = safeExams.slice(0, 5).map(exam => ({
        id: exam.id,
        title: exam.title || `Exam ${exam.id.slice(0, 4)}`,
        subject: 'General', // Could infer from title too
        date: new Date(exam.created_at || new Date().toISOString()).toLocaleDateString(),
        score: exam.score,
        status: exam.status
    }))

    // Fetch Profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

    // Fetch Notifications
    const { data: notifications } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5)

    return {
        profile,
        notifications: notifications || [],
        weeklyAverage,
        examsTaken: safeExams.length,
        recentActivity,
        performanceHistory,
        topSubject,
        weakSubject
    }
}

export async function getTestHistory() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Use authorized user or fallback to mock for dev
    const userId = user?.id || '00000000-0000-0000-0000-000000000000'

    // Fetch ALL exams for the user
    const { data: exams, error } = await supabase
        .from('exams')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching test history:', error)
        return []
    }

    return exams || []
}
