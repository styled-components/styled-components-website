import Footer from '../components/Footer';
import HomepageBadges from '../components/HomepageBadges';
import HomepageHeroEditor, { HeroContent } from '../components/HomepageHeroEditor';
import LatestBlogPost from '../components/LatestBlogPost';
import PlatonicLogo from '../components/LogoConcepts/PlatonicLogo';
import HeroLogoObserver from '../components/HeroLogoObserver';
import { HomepageLogos, HomepageShowcase } from '../components/HomepageShowcase';
import HomepageGettingStartedContent from '../components/HomepageGettingStarted';
import { getPosts } from '@/utils/blog.server';
import './homepage.css';

export default async function Index() {
  const posts = await getPosts();

  return (
    <div>
      <div className="hero-header">
        <HeroContent>
          <HomepageHeroEditor latestPost={<LatestBlogPost post={posts[0]} />}>
            <HeroLogoObserver>
              <PlatonicLogo size={200} />
            </HeroLogoObserver>

            <h1 className="hero-tagline">
              CSS for the <code>&lt;Component&gt;</code> Age
            </h1>
            <h2 className="hero-subtitle">
              Fast, expressive styling for React. Server components, client components, streaming SSR, React Native, all
              one API.
            </h2>

            <HomepageBadges />
          </HomepageHeroEditor>
        </HeroContent>

        <p className="hero-used-by">Used by folks at</p>
        <HomepageLogos />

        <p className="hero-used-by" style={{ marginTop: '2rem' }}>
          To create beautiful websites like these
        </p>
        <HomepageShowcase />
      </div>

      <HomepageGettingStartedContent />

      <Footer />
    </div>
  );
}
