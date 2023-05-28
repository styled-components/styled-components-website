import { Project } from 'companies-manifest';
import Link from 'next/link';

export interface ShowcaseLinkProps {
  item: Project;
}

export default function ShowcaseLink({ item, children }: React.PropsWithChildren<ShowcaseLinkProps>) {
  const { href } = generateShowcaseUrl(item);

  return (
    <Link href={href} scroll={false} replace>
      {children}
    </Link>
  );
}

export function generateShowcaseUrl(item: Project) {
  return {
    href: `/showcase?item=${item.internalUrl}`,
  };
}
