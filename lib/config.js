export const GAME_LINK = 'https://miusoftgames.github.io/FeatherFly/game';

export const GAME_LINK_ANDROID = 'https://play.google.com/store/apps/details?id=com.miusoftgames.featherfly';

export const SHEET_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwyxwpUnFp_jupSHdAMehvcM2EQnrXO_fwYQXtc4TKuNWfqRqUUqnXkGNeEz9et1C1s/exec';

export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/FeatherFly' : '';

export function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith(BASE_PATH) && BASE_PATH !== '') return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
}