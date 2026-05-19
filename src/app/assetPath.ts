const basePath = import.meta.env.BASE_URL;

export function assetPath(path: string) {
  return `${basePath}${path.replace(/^\//, "")}`;
}
