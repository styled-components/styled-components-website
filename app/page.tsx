import CelebrationEffect from '../components/CelebrationEffect';
import Footer from '../components/Footer';
import HomepageBadges from '../components/HomepageBadges';
import HomepageHeroEditor from '../components/HomepageHeroEditor';
import LatestBlogPost from '../components/LatestBlogPost';
import { HomepageLogos, HomepageShowcase } from '../components/HomepageShowcase';
import HomepageGettingStartedContent from '../components/HomepageGettingStarted';
import './homepage.css';

export default function Index() {
  return (
    <div>
      <CelebrationEffect />

      <div className="hero-header">
        <div className="hero-content">
          <HomepageHeroEditor>
            <LatestBlogPost />

            <h1 className="hero-tagline">
              CSS for the <code>&lt;Component&gt;</code> Age
            </h1>
            <h2 className="hero-subtitle">Styling your way with speed, strong typing, and flexibility.</h2>

            <HomepageBadges />
          </HomepageHeroEditor>
        </div>

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
