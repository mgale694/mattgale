import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  getAllPhotos, 
  groupPhotosByDate, 
  groupPhotosByCamera, 
  groupPhotosByLocation,
  type PhotoMetadata 
} from "@/lib/photography";
import { Calendar, Camera, MapPin, Palette, X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/photography/$sectionId")({
  loader: async ({ params }) => {
    const photos = await getAllPhotos();
    const { sectionId } = params;
    
    // Parse section parameter: "type-value" (e.g., "date-2025-2", "camera-NikonF3", "location-Japan")
    const [sectionType, ...sectionValueParts] = sectionId.split('-');
    const sectionValue = sectionValueParts.join('-');
    
    let sectionPhotos: PhotoMetadata[] = [];
    let sectionTitle = '';
    
    switch (sectionType) {
      case 'date':
        const [year, month] = sectionValue.split('-');
        const dateGroups = groupPhotosByDate(photos);
        const dateGroup = dateGroups.find(g => g.year === parseInt(year) && g.month === parseInt(month));
        if (dateGroup) {
          sectionPhotos = dateGroup.photos;
          sectionTitle = `${dateGroup.monthName} ${dateGroup.year}`;
        }
        break;
        
      case 'camera':
        const cameraGroups = groupPhotosByCamera(photos);
        const cameraGroup = cameraGroups.find(g => g.cameraType === sectionValue);
        if (cameraGroup) {
          sectionPhotos = cameraGroup.photos;
          sectionTitle = sectionValue;
        }
        break;
        
      case 'location':
        const locationGroups = groupPhotosByLocation(photos);
        const locationGroup = locationGroups.find(g => g.location === sectionValue);
        if (locationGroup) {
          sectionPhotos = locationGroup.photos;
          sectionTitle = sectionValue;
        }
        break;
        
      default:
        throw new Error('Invalid section type');
    }
    
    return {
      photos: sectionPhotos,
      title: sectionTitle,
      type: sectionType
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: [
        {
          title: `${loaderData.title} - Photography | Matt Gale`,
        },
        {
          name: "description",
          content: `View all ${loaderData.photos.length} photos from ${loaderData.title} in Matt Gale's photography portfolio.`,
        },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://matthewgale.co.uk/photography/${loaderData.type}-${encodeURIComponent(loaderData.title)}`,
        },
      ],
    };
  },
  component: SectionComponent,
});

function SectionComponent() {
  const loaderData = Route.useLoaderData();
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMetadata | null>(null);

  // Ensure we have the data before using it
  if (!loaderData) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  const { photos, title, type } = loaderData;

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p: PhotoMetadata) => p.id === selectedPhoto.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    setSelectedPhoto(photos[prevIndex]);
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p: PhotoMetadata) => p.id === selectedPhoto.id);
    const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    setSelectedPhoto(photos[nextIndex]);
  };

  if (photos.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <Link to="/photography" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Photography
          </Link>
          <div className="flex items-center justify-center min-h-[50vh]">
            <p className="text-muted-foreground">No photos found in this section.</p>
          </div>
        </div>
      </div>
    );
  }

  // Create layout patterns for different sized photos
  const getPhotoLayout = (index: number) => {
    const patterns = [
      { size: 'large', fixed: false, span: 'col-span-2 row-span-2' }, // Large photo
      { size: 'medium', fixed: false, span: 'col-span-1 row-span-2' }, // Tall photo
      { size: 'medium', fixed: false, span: 'col-span-1 row-span-1' }, // Regular photo
      { size: 'medium', fixed: false, span: 'col-span-1 row-span-1' }, // Regular photo
      { size: 'large', fixed: true, span: 'col-span-2 row-span-1' }, // Wide fixed photo
      { size: 'medium', fixed: false, span: 'col-span-1 row-span-1' }, // Regular photo
      { size: 'medium', fixed: false, span: 'col-span-1 row-span-2' }, // Tall photo
      { size: 'medium', fixed: false, span: 'col-span-1 row-span-1' }, // Regular photo
    ];
    
    return patterns[index % patterns.length];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Large Scrolling Title Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/photography" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            
            <div className="text-center flex-1">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground">
                {title.toUpperCase()}
              </h1>
              <p className="text-sm text-muted-foreground mt-2 font-mono">
                {photos.length} photograph{photos.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="w-16 md:w-20" /> {/* Spacer for balance */}
          </div>
        </div>
      </div>

      {/* Editorial Grid Layout */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {photos.map((photo: PhotoMetadata, index: number) => {
            const layout = getPhotoLayout(index);
            
            return (
              <div
                key={photo.id}
                className={`${layout.span} group cursor-pointer transition-all duration-300 hover:z-10 relative ${
                  layout.fixed ? 'sticky top-24' : ''
                }`}
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="w-full relative overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.title || `Photo from ${photo.location}`}
                    className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Minimal hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  
                  {/* Photo info overlay - only shows on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <Camera className="w-3 h-3" />
                        <span>{photo.cameraType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>{photo.location}</span>
                      </div>
                      {photo.isBlackAndWhite && (
                        <div className="inline-block px-2 py-1 bg-white/20 rounded text-xs">
                          B&W
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <PhotoModal 
          photo={selectedPhoto} 
          onClose={() => setSelectedPhoto(null)}
          onPrev={handlePrevPhoto}
          onNext={handleNextPhoto}
        />
      )}
    </div>
  );
}

// Reuse the PhotoModal component from the main photography page
function PhotoModal({ 
  photo, 
  onClose, 
  onPrev, 
  onNext 
}: { 
  photo: PhotoMetadata; 
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
      {/* Close button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10"
        onClick={onPrev}
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10 z-10"
        onClick={onNext}
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Main content */}
      <div className="max-w-7xl max-h-full flex flex-col lg:flex-row gap-6 items-center">
        {/* Image */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={photo.url}
            alt={photo.title || `Photo from ${photo.location}`}
            className="max-w-full max-h-[80vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Metadata sidebar */}
        <div className="lg:w-80 bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
          <div className="space-y-4">
            {photo.title && (
              <h2 className="text-2xl font-bold">{photo.title}</h2>
            )}
            
            {photo.description && (
              <p className="text-white/80">{photo.description}</p>
            )}

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(photo.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                <span>{photo.cameraType}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{photo.location}</span>
              </div>
              
              {photo.isBlackAndWhite && (
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <span>Black & White</span>
                </div>
              )}
            </div>

            {photo.tags.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {photo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/20 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      />
    </div>
  );
}
