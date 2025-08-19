// Photography utilities for reading photo files
// This implementation dynamically reads from photo files in the nested folder structure:
// photography/<camera>/<location>/<date>/<bw/colour>/001.png

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

// Extract metadata from nested folder path: photography/<camera>/<location>/<date>/<bw/colour>/filename.ext
export function extractPhotoMetadata(path: string, url: string): PhotoMetadata {
  // Remove the base path and split into parts
  const pathParts = path.replace('/src/content/photography/', '').split('/');
  
  if (pathParts.length >= 5) {
    const cameraType = pathParts[0];
    const location = pathParts[1];
    const date = pathParts[2];
    const colorType = pathParts[3]; // 'bw' or 'colour'
    const fileName = pathParts[4];
    
    const isBlackAndWhite = colorType === 'bw';
    
    // Create a unique ID from the full path
    const id = path.replace('/src/content/photography/', '').replace(/\//g, '_');
    
    return {
      id,
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
  
  // Fallback for files that don't match the expected structure
  const fileName = path.split('/').pop() || '';
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

// Read all photo files using Vite's glob import with recursive pattern
const photoModules = import.meta.glob('/src/content/photography/**/*.{png,jpg,jpeg,webp}', { 
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
        return extractPhotoMetadata(path, url);
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
