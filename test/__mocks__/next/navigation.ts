export const usePathname = () => '/';
export const useRouter = () => ({
  push: () => {},
  replace: () => {},
  prefetch: () => {},
  back: () => {},
  forward: () => {},
  refresh: () => {},
});
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});
