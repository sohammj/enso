export default function GalleryPage() {
  const imgs = [1,2,3,1,2,3]
  return (
    <div className="section">
      <div className="container">
        <h1 className="h1">Gallery</h1>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {imgs.map((n,i) => (
            <img 
              key={i} 
              src={`/gallery/placeholder-${n}.jpg`}  // Fixed: backticks instead of /
              alt={`Gallery ${i+1}`}  // Fixed: backticks instead of /
              className="w-full h-auto rounded-lg"
            />
          ))}
        </div>
      </div>
    </div>
  )
}