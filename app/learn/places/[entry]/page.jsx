import { notFound } from 'next/navigation';
import { journalData } from '@/lib/journalData';
import { getLearnEntry } from '@/lib/learnCatalog';
import LearnArticle, { learnMetadata } from '@/components/LearnArticle/LearnArticle';
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(journalData).filter(path => path.startsWith('places/')).map(path => ({ entry: path.split('/')[1] }));
}
export async function generateMetadata({ params }) {
  const { entry: slug } = await params;
  const category = 'places';
  const path = `${category}/${slug}`;
  return learnMetadata(getLearnEntry(path), path);
}
export default async function JournalPage({ params }) {
  const { entry: slug } = await params;
  const category = 'places';
  if (!['puzzles', 'places'].includes(category)) notFound();
  const entry = getLearnEntry(`${category}/${slug}`);
  if (!entry) notFound();
  return <LearnArticle entry={entry} />;
}
