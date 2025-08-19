import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  getAllPhotos, 
  groupPhotosByDate, 
  groupPhotosByCamera, 
  groupPhotosByLocation,
  filterPhotosByBW,
  type PhotoMetadata 
} from "@/lib/photography";
import { Calendar, Camera, MapPin, Palette, Image as ImageIcon, X, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/photography/")({
  head: () => ({
    meta: [
      {
        title: "Photography | Matt Gale - Software Developer & Photographer",
      },
      {
        name: "description",
        content: "Explore Matt Gale's photography portfolio featuring landscapes, street photography, and artistic captures. View photos organized by date, camera type, location, and style.",
      },
      {
        name: "keywords",
        content: "Matt Gale photography, portfolio, landscape photography, street photography, black and white, color photography, camera, photography gallery",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:title",
        content: "Photography | Matt Gale - Software Developer & Photographer",
      },
      {
        property: "og:description",
        content: "Explore Matt Gale's photography portfolio featuring landscapes, street photography, and artistic captures. View photos organized by date, camera type, location, and style.",
      },
      {
        property: "og:url",
        content: "https://matthewgale.co.uk/photography",
      },
      {
        property: "og:image",
        content: "https://matthewgale.co.uk/photography-preview.jpg",
      },
      {
        property: "twitter:card",
        content: "summary_large_image",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://matthewgale.co.uk/photography",
      },
    ],
  }),
  component: PhotographyComponent,
});

type ViewMode = 'date' | 'camera' | 'location';
type ColorFilter = 'all' | 'bw' | 'color';

function PhotographyComponent() {
  const [viewMode, setViewMode] = useState<ViewMode>('date');
  const [colorFilter, setColorFilter] = useState<ColorFilter>('all');
  const [allPhotos, setAllPhotos] = useState<PhotoMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMetadata | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const photos = await getAllPhotos();
        setAllPhotos(photos);
        
        // Preload the first 3 images for better initial performance
        const preloadImages = photos.slice(0, 3);
        preloadImages.forEach(photo => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = photo.url;
          document.head.appendChild(link);
        });
      } catch (error) {
        console.error('Error loading photos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  // Apply color filter to photos
  const getFilteredPhotos = (photos: PhotoMetadata[]): PhotoMetadata[] => {
    switch (colorFilter) {
      case 'bw':
        return filterPhotosByBW(photos, true);
      case 'color':
        return filterPhotosByBW(photos, false);
      case 'all':
      default:
        return photos;
    }
  };

  // Handle color filter clicks with toggle behavior
  const handleColorFilterClick = (filter: ColorFilter) => {
    if (colorFilter === filter) {
      // If clicking the same filter, reset to 'all'
      setColorFilter('all');
    } else {
      // Otherwise, set the new filter
      setColorFilter(filter);
    }
  };

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

    const filteredPhotos = getFilteredPhotos(allPhotos);

    if (filteredPhotos.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No photos found with the current filters.</p>
        </div>
      );
    }

    switch (viewMode) {
      case 'date':
        const dateGroups = groupPhotosByDate(filteredPhotos);
        return (
          <div className="space-y-12">
            {dateGroups.map((group) => (
              <div key={`${group.year}-${group.month}`} className="space-y-6">
                <Link 
                  to="/photography/$sectionId" 
                  params={{ sectionId: `date-${group.year}-${group.month}` }}
                  className="group block"
                >
                  <h2 className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors flex items-center gap-3">
                    {group.monthName} {group.year}
                    <Badge variant="secondary" className="ml-0">
                      {group.photos.length} photo{group.photos.length !== 1 ? 's' : ''}
                    </Badge>
                    <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h2>
                </Link>
                <PhotoGrid photos={group.photos} onPhotoClick={setSelectedPhoto} />
              </div>
            ))}
          </div>
        );

      case 'camera':
        const cameraGroups = groupPhotosByCamera(filteredPhotos);
        return (
          <div className="space-y-12">
            {cameraGroups.map((group) => (
              <div key={group.cameraType} className="space-y-6">
                <Link 
                  to="/photography/$sectionId" 
                  params={{ sectionId: `camera-${group.cameraType}` }}
                  className="group block"
                >
                  <h2 className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors flex items-center gap-3">
                    {group.cameraType}
                    <Badge variant="secondary" className="ml-0">
                      {group.photos.length} photo{group.photos.length !== 1 ? 's' : ''}
                    </Badge>
                    <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h2>
                </Link>
                <PhotoGrid photos={group.photos} onPhotoClick={setSelectedPhoto} />
              </div>
            ))}
          </div>
        );

      case 'location':
        const locationGroups = groupPhotosByLocation(filteredPhotos);
        return (
          <div className="space-y-12">
            {locationGroups.map((group) => (
              <div key={group.location} className="space-y-6">
                <Link 
                  to="/photography/$sectionId" 
                  params={{ sectionId: `location-${group.location}` }}
                  className="group block"
                >
                  <h2 className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors flex items-center gap-3">
                    {group.location}
                    <Badge variant="secondary" className="ml-0">
                      {group.photos.length} photo{group.photos.length !== 1 ? 's' : ''}
                    </Badge>
                    <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h2>
                </Link>
                <PhotoGrid photos={group.photos} onPhotoClick={setSelectedPhoto} />
              </div>
            ))}
          </div>
        );

      default:
        return <PhotoGrid photos={filteredPhotos} onPhotoClick={setSelectedPhoto} />;
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

      {/* Filter Controls */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-center items-center gap-3">
          {/* Organization Filters */}
          <Button
            variant={viewMode === 'date' ? 'default' : 'outline'}
            onClick={() => setViewMode('date')}
            className="flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Date
          </Button>
          <Button
            variant={viewMode === 'camera' ? 'default' : 'outline'}
            onClick={() => setViewMode('camera')}
            className="flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            Camera
          </Button>
          <Button
            variant={viewMode === 'location' ? 'default' : 'outline'}
            onClick={() => setViewMode('location')}
            className="flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Location
          </Button>

          {/* Separator */}
          <div className="h-8 w-px bg-border mx-2"></div>

          {/* Color Style Filters */}
          <Button
            variant={colorFilter === 'bw' ? 'default' : 'outline'}
            onClick={() => handleColorFilterClick('bw')}
            className="flex items-center gap-2"
          >
            <Palette className="w-4 h-4" />
            Black & White
          </Button>
          <Button
            variant={colorFilter === 'color' ? 'default' : 'outline'}
            onClick={() => handleColorFilterClick('color')}
            className="flex items-center gap-2"
          >
            <ImageIcon className="w-4 h-4" />
            Color
          </Button>
        </div>

        {/* Filter Summary */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Showing {getFilteredPhotos(allPhotos).length} of {allPhotos.length} photos
            {colorFilter !== 'all' && (
              <span> • {colorFilter === 'bw' ? 'Black & White' : 'Color'} only</span>
            )}
          </p>
        </div>
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
  // If we have more than 6 photos, show them in a horizontal scroll
  const useHorizontalScroll = photos.length > 3;
  
  if (useHorizontalScroll) {
    return (
      <div className="relative">
        {/* Horizontal scrollable container */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {photos.map((photo) => (
              <div key={photo.id} className="flex-shrink-0 w-80">
                <PhotoCard photo={photo} onClick={() => onPhotoClick(photo)} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Gradient fade effect on the right */}
        <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    );
  }

  // Default grid layout for sections with 6 or fewer photos
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onClick={() => onPhotoClick(photo)} />
      ))}
    </div>
  );
}

function PhotoCard({ photo, onClick }: { photo: PhotoMetadata; onClick: () => void }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
        <img
          src={photo.url}
          alt={photo.title || `Photo from ${photo.location}`}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            setImageError(true);
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
