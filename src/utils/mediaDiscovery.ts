const imageModules = import.meta.glob('/public/media/**/*.{jpg,jpeg,png,webp}', { eager: true });
const videoModules = import.meta.glob('/public/media/**/*.{mp4,webm}', { eager: true });
const documentModules = import.meta.glob('/public/media/**/*.{pdf,pptx,ppt}', { eager: true });

export interface DiscoveredMedia {
  path: string;
  type: 'image' | 'video' | 'document';
  filename: string;
  ext: string;
}

function extractMedia(modules: Record<string, unknown>, type: DiscoveredMedia['type'], folder: string): DiscoveredMedia[] {
  const prefix = `/public/media/${folder}/`;
  return Object.keys(modules)
    .filter(p => p.startsWith(prefix))
    .map(p => {
      const filename = p.split('/').pop()!;
      const ext = filename.split('.').pop()!.toLowerCase();
      return { path: p.replace('/public', ''), type, filename, ext };
    })
    .sort((a, b) => a.filename.localeCompare(b.filename));
}

export function getMediaForFolder(folder: string): DiscoveredMedia[] {
  const images = extractMedia(imageModules, 'image', folder);
  const videos = extractMedia(videoModules, 'video', folder);
  const documents = extractMedia(documentModules, 'document', folder);
  return [...images, ...videos, ...documents];
}
