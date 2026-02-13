import FileUploader from '@/components/upload/FileUploader'

export default function MaterialsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Upload Study Materials</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <FileUploader />
            </div>
        </div>
    )
}
