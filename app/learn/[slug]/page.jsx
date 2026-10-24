import { notFound } from 'next/navigation';
import { learnData } from '@/lib/learnData';
import { getLearnEntry } from '@/lib/learnCatalog';
import LearnArticle, { learnMetadata } from '@/components/LearnArticle/LearnArticle';
export const dynamicParams = false;
export function generateStaticParams() { return Object.keys(learnData).map(slug => ({ slug })); }
export async function generateMetadata({ params }) {
  const { slug } = await params;
  return learnMetadata(getLearnEntry(slug), slug);
}
export default async function LearnPage({ params }) {
  const { slug } = await params;
  const entry = getLearnEntry(slug);
  if (!entry) notFound();
  return <LearnArticle entry={entry} />;
}
