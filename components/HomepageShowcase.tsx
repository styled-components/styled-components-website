'use client';

import { sortedCompanies, sortedProjects } from '@/companies-manifest';
import UsersLogos from './UsersLogos';
import SmallShowcase from './SmallShowcase';

export function HomepageLogos() {
  return <UsersLogos users={sortedCompanies} />;
}

export function HomepageShowcase() {
  return <SmallShowcase projects={sortedProjects} />;
}
