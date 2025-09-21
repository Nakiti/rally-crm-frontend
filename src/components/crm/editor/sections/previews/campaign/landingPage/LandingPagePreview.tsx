import { HeroSectionPreview } from "./HeroSectionPreview"
import { StorySectionPreview } from "./StorySectionPreview"
import ProgressSectionPreview from "./ProgressSectionPreview"
import LeaderBoardPreview from "./LeaderBoardPreview"
import SidebarPreview
 from "./SidebarPreview"

export default function LandingPagePreview({pageSections}) {
    const heroSection = pageSections.find(s => s.type === 'hero' && s.enabled);
    const storySection = pageSections.find(s => s.type === 'story' && s.enabled);

    return (
        <div className="flex flex-col h-full">
          {/* Hero section at the top */}
            {heroSection && <HeroSectionPreview {...heroSection.props} />}
          
         <div className="flex flex-1">
            {/* Left side: Story and Leaderboard stacked vertically */}
            <div className="flex-1 flex flex-col">
            {storySection && <StorySectionPreview {...storySection.props} />}
                
              <ProgressSectionPreview />

              {/* Leaderboard */}
              <LeaderBoardPreview />
            </div>
            
            {/* Right side: Sidebar */}
            <div className="w-80">
              <SidebarPreview />
            </div>
          </div>
        </div>
    )
}