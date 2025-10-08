import { Hero } from '../components/Hero'
import AnnouncementBar from '../components/AnnouncementBar'
import Stats from '../components/Stats'
import LogosBar from '../components/LogosBar'
import { Section } from '../components/Section'
import { ProgramGrid } from '../components/ProgramGrid'
import { ServiceGrid } from '../components/ServiceGrid'

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Hero />
      <Stats />
      <Section id="programs" title="Our Programs" subtitle="Community-led support and growth spaces.">
        <ProgramGrid />
      </Section>
      <Section id="services" title="Services" subtitle="Evidence-informed, person-centered care.">
        <ServiceGrid />
      </Section>
      <LogosBar />
    </>
  )
}
