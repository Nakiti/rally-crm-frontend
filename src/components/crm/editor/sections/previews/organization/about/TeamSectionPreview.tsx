interface TeamSectionPreviewProps {
  teamText?: string;
  showTeamPhotos?: boolean;
  teamImage?: string;
  [key: string]: any; // Allow additional props
}

export function TeamSectionPreview({ 
  teamText = "Meet the dedicated individuals who make our mission possible. Our team brings together diverse expertise and shared passion for creating positive change.",
  showTeamPhotos = true,
  teamImage,
  ...props
}: TeamSectionPreviewProps) {
  return (
    <div className="text-center">
      <div className="mb-12">
        <h3 className="font-bold mb-4 text-3xl text-gray-900">
          Our Team
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      </div>
      <p className="leading-relaxed mb-12 max-w-2xl mx-auto text-lg text-gray-600">
        {teamText}
      </p>
      
      {showTeamPhotos && teamImage && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group">
            <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
              <img 
                src={teamImage} 
                alt="Team Member" 
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="font-bold mb-2 text-xl text-white">
                  John Doe
                </h4>
                <p className="text-white">
                  Executive Director
                </p>
              </div>
            </div>
          </div>
          <div className="group">
            <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
              <img 
                src={teamImage} 
                alt="Team Member" 
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="font-bold mb-2 text-xl text-white">
                  Jane Smith
                </h4>
                <p className="text-white">
                  Program Manager
                </p>
              </div>
            </div>
          </div>
          <div className="group">
            <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
              <img 
                src={teamImage} 
                alt="Team Member" 
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="font-bold mb-2 text-xl text-white">
                  Mike Johnson
                </h4>
                <p className="text-white">
                  Community Outreach
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
