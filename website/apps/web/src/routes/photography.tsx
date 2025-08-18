import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  getAllPhotos, 
  groupPhotosByDate, 
  groupPhotosByCamera, 
  groupPhotosByLocation,
  filterPhotosByBW,
  type PhotoMetadata 
} from "@/lib/photography";
import { Calendar, Camera, MapPin, Palette, Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/photography")({
  component: PhotographyComponent,
});

type ViewMode = 'date' | 'camera' | 'location' | 'bw' | 'color';

function PhotographyComponent() {
  const [viewMode, setViewMode] = useState<ViewMode>('date');
  const [allPhotos, setAllPhotos] = useState<PhotoMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMetadata | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const photos = await getAllPhotos();
        setAllPhotos(photos);
      } catch (error) {
        console.error('Error loading photos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  const renderPhotos = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading photos...</p>
        </div>
      );
    }

    if (allPhotos.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No photos found.</p>
        </div>
      );
    }

    switch (viewMode) {
      case 'date':
        const dateGroups = groupPhotosByDate(allPhotos);
        return (
          <div className="space-y-12">
            {dateGroups.map((group) => (
              <div key={`${group.year}-${group.month}`} className="space-y-6">
                <h2 className="text-2xl font-bold text-primary">
                  {group.monthName} {group.year}
                </h2>
                <PhotoGrid photos={group.photos} onPhotoClick={setSelectedPhoto} />
              </div>
            ))}
          </div>
        );

      case 'camera':
        const cameraGroups = groupPhotosByCamera(allPhotos);
        return (
          <div className="space-y-12">
            {cameraGroups.map((group) => (
              <div key={group.cameraType} className="space-y-6">
                <h2 className="text-2xl font-bold text-primary">
                  {group.cameraType}
                </h2>
                <PhotoGrid photos={group.photos} onPhotoClick={setSelectedPhoto} />
              </div>
            ))}
          </div>
        );

      case 'location':
        const locationGroups = groupPhotosByLocation(allPhotos);
        return (
          <div className="space-y-12">
            {locationGroups.map((group) => (
              <div key={group.location} className="space-y-6">
                <h2 className="text-2xl font-bold text-primary">
                  {group.location}
                </h2>
                <PhotoGrid photos={group.photos} onPhotoClick={setSelectedPhoto} />
              </div>
            ))}
          </div>
        );

      case 'bw':
        const bwPhotos = filterPhotosByBW(allPhotos, true);
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">
              Black & White Photography
            </h2>
            <PhotoGrid photos={bwPhotos} onPhotoClick={setSelectedPhoto} />
          </div>
        );

      case 'color':
        const colorPhotos = filterPhotosByBW(allPhotos, false);
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary">
              Color Photography
            </h2>
            <PhotoGrid photos={colorPhotos} onPhotoClick={setSelectedPhoto} />
          </div>
        );

      default:
        return <PhotoGrid photos={allPhotos} onPhotoClick={setSelectedPhoto} />;
    }
  };

  const handlePrevPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = allPhotos.findIndex(p => p.id === selectedPhoto.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : allPhotos.length - 1;
    setSelectedPhoto(allPhotos[prevIndex]);
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto) return;
    const currentIndex = allPhotos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = currentIndex < allPhotos.length - 1 ? currentIndex + 1 : 0;
    setSelectedPhoto(allPhotos[nextIndex]);
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Photography</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A collection of moments captured through my lens, exploring light, shadow, 
          and the beauty found in everyday scenes around the world.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        <Button
          variant={viewMode === 'date' ? 'default' : 'outline'}
          onClick={() => setViewMode('date')}
          className="flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          By Date
        </Button>
        <Button
          variant={viewMode === 'camera' ? 'default' : 'outline'}
          onClick={() => setViewMode('camera')}
          className="flex items-center gap-2"
        >
          <Camera className="w-4 h-4" />
          By Camera
        </Button>
        <Button
          variant={viewMode === 'location' ? 'default' : 'outline'}
          onClick={() => setViewMode('location')}
          className="flex items-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          By Location
        </Button>
        <Button
          variant={viewMode === 'bw' ? 'default' : 'outline'}
          onClick={() => setViewMode('bw')}
          className="flex items-center gap-2"
        >
          <Palette className="w-4 h-4" />
          Black & White
        </Button>
        <Button
          variant={viewMode === 'color' ? 'default' : 'outline'}
          onClick={() => setViewMode('color')}
          className="flex items-center gap-2"
        >
          <ImageIcon className="w-4 h-4" />
          Color
        </Button>
      </div>

      {/* Photo Content */}
      {renderPhotos()}

      {/* Stats */}
      <div className="mt-16 pt-8 border-t">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{allPhotos.length}</div>
            <div className="text-sm text-muted-foreground">Total Photos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {filterPhotosByBW(allPhotos, true).length}
            </div>
            <div className="text-sm text-muted-foreground">Black & White</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {groupPhotosByCamera(allPhotos).length}
            </div>
            <div className="text-sm text-muted-foreground">Cameras Used</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {groupPhotosByLocation(allPhotos).length}
            </div>
            <div className="text-sm text-muted-foreground">Locations</div>
          </div>
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

function PhotoGrid({ photos, onPhotoClick }: { photos: PhotoMetadata[]; onPhotoClick: (photo: PhotoMetadata) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onClick={() => onPhotoClick(photo)} />
      ))}
    </div>
  );
}

function PhotoCard({ photo, onClick }: { photo: PhotoMetadata; onClick: () => void }) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={photo.url}
          alt={photo.title || `Photo from ${photo.location}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            // Fallback for missing images
            const target = e.target as HTMLImageElement;
            target.src = `data:image/svg+xml,${encodeURIComponent(`
              <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#f1f5f9"/>
                <text x="50%" y="50%" text-anchor="middle" fill="#64748b" font-family="Arial" font-size="16">
                  ${photo.fileName}
                </text>
              </svg>
            `)}`;
          }}
        />
      </div>
      <CardContent className="p-4">
        <div className="space-y-2">
          {photo.title && (
            <h3 className="font-semibold text-lg leading-tight">{photo.title}</h3>
          )}
          {photo.description && (
            <p className="text-sm text-muted-foreground">{photo.description}</p>
          )}
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(photo.date).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Camera className="w-3 h-3" />
              {photo.cameraType}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {photo.location}
            </span>
            {photo.isBlackAndWhite && (
              <span className="flex items-center gap-1">
                <Palette className="w-3 h-3" />
                B&W
              </span>
            )}
          </div>
          {photo.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {photo.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-muted px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

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
