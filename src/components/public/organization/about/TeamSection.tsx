import React from 'react';

interface TeamSectionProps {
  teamText?: string;
  showTeamPhotos?: boolean;
  teamImage?: string;
}

export function TeamSection({ 
  teamText = "Meet the dedicated individuals who make our mission possible. Our team brings together diverse expertise and shared passion for creating positive change.",
  showTeamPhotos = true,
  teamImage,
}: TeamSectionProps) {
  const defaultTeamImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
  
  const teamMembers = [
    { name: "John Doe", position: "Executive Director" },
    { name: "Jane Smith", position: "Program Manager" },
    { name: "Mike Johnson", position: "Community Outreach" }
  ];

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
      
      {showTeamPhotos && (
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img 
                  src={teamImage || defaultTeamImage} 
                  alt={member.name} 
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="font-bold mb-2 text-xl text-white">
                    {member.name}
                  </h4>
                  <p className="text-white">
                    {member.position}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
