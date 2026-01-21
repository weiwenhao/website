"use client"

export default function MdxLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="prose max-w-5xl mx-auto px-4 py-8">
            {children}
        </div>
    )
}
