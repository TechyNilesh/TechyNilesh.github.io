const imageModules = import.meta.glob('/public/projects/**/*.{jpg,jpeg,png,webp}', { eager: true });
const videoModules = import.meta.glob('/public/projects/**/*.{mp4,webm}', { eager: true });

export interface DiscoveredMedia {
  path: string;
  type: 'image' | 'video';
  filename: string;
  ext: string;
}

function extractMedia(modules: Record<string, unknown>, type: DiscoveredMedia['type'], folder: string): DiscoveredMedia[] {
  const prefix = `/public/projects/${folder}/`;
  return Object.keys(modules)
    .filter(p => p.startsWith(prefix))
    .map(p => {
      const filename = p.split('/').pop()!;
      const ext = filename.split('.').pop()!.toLowerCase();
      return { path: p.replace('/public', ''), type, filename, ext };
    })
    .sort((a, b) => a.filename.localeCompare(b.filename));
}

export function getProjectMedia(folder: string): DiscoveredMedia[] {
  const images = extractMedia(imageModules, 'image', folder);
  const videos = extractMedia(videoModules, 'video', folder);
  return [...images, ...videos];
}
