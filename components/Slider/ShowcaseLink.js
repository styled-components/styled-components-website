import Link from 'next/link';

export function generateShowcaseUrl(item) {
  return {
    href: `/showcase?item=${item.internalUrl}`,
  };
}

function ShowcaseLink({ item, children }) {
  const { href } = generateShowcaseUrl(item);
  return (
    <Link href={href} replace>
      {children}
    </Link>
  );
}

export default ShowcaseLink;
