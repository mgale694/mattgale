// Photography utilities for reading photo files
// This implementation dynamically reads from photo files in the content directory

export interface PhotoMetadata {
  id: string;
  fileName: string;
  date: string;
  cameraType: string;
  location: string;
  isBlackAndWhite: boolean;
  url: string;
  title?: string;
  description?: string;
  tags: string[];
}

export interface PhotoDateGroup {
  year: number;
  month: number;
  monthName: string;
  photos: PhotoMetadata[];
}

export interface PhotoCameraGroup {
  cameraType: string;
  photos: PhotoMetadata[];
}

export interface PhotoLocationGroup {
  location: string;
  photos: PhotoMetadata[];
}

// Extract metadata from filename format: YYYY-MM-DD_cameratype_location_bw.ext
export function extractPhotoMetadata(fileName: string, url: string): PhotoMetadata {
  // Remove file extension for parsing
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
  
  // Split by underscores
  const parts = nameWithoutExt.split('_');
  
  if (parts.length >= 3) {
    const date = parts[0] || new Date().toISOString().split('T')[0];
    const cameraType = parts[1] || 'Unknown';
    const locationPart = parts[2] || 'Unknown';
    
    // Check if it's black and white (has 'bw' in the name)
    const isBlackAndWhite = fileName.toLowerCase().includes('bw') || 
                           parts.some(part => part.toLowerCase() === 'bw');
    
    // Clean up location (remove 'bw' if it's there)
    const location = locationPart.replace(/[-_]?bw$/i, '') || 'Unknown';
    
    return {
      id: fileName,
      fileName,
      date,
      cameraType,
      location,
      isBlackAndWhite,
      url,
      title: `${location} - ${cameraType}`,
      description: `Captured on ${date} with ${cameraType}`,
      tags: [cameraType, location, isBlackAndWhite ? 'Black & White' : 'Color'],
    };
  }
  
  // Fallback for files that don't match the expected format
  return {
    id: fileName,
    fileName,
    date: new Date().toISOString().split('T')[0],
    cameraType: 'Unknown',
    location: 'Unknown',
    isBlackAndWhite: false,
    url,
    title: fileName,
    description: '',
    tags: [],
  };
}

// Read all photo files using Vite's glob import
const photoModules = import.meta.glob('/src/content/photography/*', { 
  import: 'default'
  // Removed eager: true to allow dynamic loading
}) as Record<string, () => Promise<string>>;

let photos: PhotoMetadata[] = [];
let photosLoaded = false;

async function loadPhotos(): Promise<PhotoMetadata[]> {
  // Only load once, then use cache
  if (photosLoaded && photos.length > 0) {
    return photos;
  }

  try {
    const loadedPhotos = await Promise.all(
      Object.entries(photoModules).map(async ([path, loader]) => {
        const url = await loader();
        const fileName = path.split('/').pop() || '';
        return extractPhotoMetadata(fileName, url);
      })
    );

    photos = loadedPhotos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    photosLoaded = true;
    return photos;
  } catch (error) {
    console.error('Error loading photos:', error);
    return [];
  }
}

export async function getAllPhotos(): Promise<PhotoMetadata[]> {
  return await loadPhotos();
}

export function groupPhotosByDate(photos: PhotoMetadata[]): PhotoDateGroup[] {
  const grouped = photos.reduce((acc, photo) => {
    const date = new Date(photo.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const key = `${year}-${month}`;
    
    if (!acc[key]) {
      acc[key] = {
        year,
        month: month + 1,
        monthName: date.toLocaleDateString('en-US', { month: 'long' }),
        photos: []
      };
    }
    
    acc[key].photos.push(photo);
    return acc;
  }, {} as Record<string, PhotoDateGroup>);

  return Object.values(grouped).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });
}

export function groupPhotosByCamera(photos: PhotoMetadata[]): PhotoCameraGroup[] {
  const grouped = photos.reduce((acc, photo) => {
    if (!acc[photo.cameraType]) {
      acc[photo.cameraType] = {
        cameraType: photo.cameraType,
        photos: []
      };
    }
    
    acc[photo.cameraType].photos.push(photo);
    return acc;
  }, {} as Record<string, PhotoCameraGroup>);

  return Object.values(grouped).sort((a, b) => 
    b.photos.length - a.photos.length
  );
}

export function groupPhotosByLocation(photos: PhotoMetadata[]): PhotoLocationGroup[] {
  const grouped = photos.reduce((acc, photo) => {
    if (!acc[photo.location]) {
      acc[photo.location] = {
        location: photo.location,
        photos: []
      };
    }
    
    acc[photo.location].photos.push(photo);
    return acc;
  }, {} as Record<string, PhotoLocationGroup>);

  return Object.values(grouped).sort((a, b) => 
    b.photos.length - a.photos.length
  );
}

export function filterPhotosByBW(photos: PhotoMetadata[], isBlackAndWhite: boolean): PhotoMetadata[] {
  return photos.filter(photo => photo.isBlackAndWhite === isBlackAndWhite);
}
