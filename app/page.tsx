import Hero from '@/components/Hero';
import MiniBio from '@/components/MiniBio';
import ProjectsSection from '@/components/ProjectsSection';
import LatestVideos from '@/components/LatestVideos';
import ExploreGrid from '@/components/ExploreGrid';
import StatsStrip from '@/components/StatsStrip';

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <LatestVideos />
      <MiniBio />
      <ExploreGrid />
      <StatsStrip />
    </>
  );
}
