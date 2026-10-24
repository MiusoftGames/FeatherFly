import { learnData } from './learnData';
import { journalData } from './journalData';
import { learnLocations } from './learnLocations';
export const learnCatalog = Object.fromEntries(
  Object.entries({ ...learnData, ...journalData }).map(([path, entry]) => [path, { ...entry, location: learnLocations[path] }])
);
export function getLearnEntry(path) {
  return Object.hasOwn(learnCatalog, path) ? learnCatalog[path] : null;
}
