export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
      </div>
      
      {/* Content Skeleton */}
      <div className="p-6">
        {/* Category Tag */}
        <div className="w-20 h-4 bg-gray-200 rounded-full mb-3"></div>
        
        {/* Product Name */}
        <div className="h-6 bg-gray-200 rounded-lg mb-3 w-3/4"></div>
        
        {/* Description Lines */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        
        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-20"></div>
          <div className="h-10 bg-gray-200 rounded-full w-24"></div>
        </div>
        
        {/* Stats */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}