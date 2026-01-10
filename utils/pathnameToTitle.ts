import { pages } from '../app/docs.json';

interface Section {
  pathname?: string;
  title: string;
}

interface Page {
  pathname: string;
  sections: Section[];
}

const pathnameDict = (pages as Page[]).reduce(
  (acc: Record<string, string>, { pathname, sections }: Page) => ({
    ...acc,
    ...sections.reduce((subAcc: Record<string, string>, { pathname: subPathname, title }: Section) => {
      if (subPathname) subAcc[`${pathname}/${subPathname}`] = title;
      return subAcc;
    }, {} as Record<string, string>),
  }),
  {} as Record<string, string>
);

const pathnameToTitle = (pathname: string): string => {
  let routeArr = pathname.split('/').filter(Boolean);

  if (routeArr[0] === 'docs') {
    if (routeArr.length === 1) {
      return 'Documentation';
    }

    routeArr = routeArr.slice(1);
  }

  return pathnameDict[routeArr.join('/')] || '';
};

export default pathnameToTitle;
