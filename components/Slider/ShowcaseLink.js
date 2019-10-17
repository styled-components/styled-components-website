import Link from 'next/link';

export function generateShowcaseUrl(item) {
  return {
    href: `/showcase?item=${item.internalUrl}`,
    as: `/showcase/${item.internalUrl}`,
  };
}

function ShowcaseLink({ item, children }) {
  const { href, as } = generateShowcaseUrl(item);
  return (
    <Link href={href} as={as} replace>
      {children}
    </Link>
  );
}

export default ShowcaseLink;
