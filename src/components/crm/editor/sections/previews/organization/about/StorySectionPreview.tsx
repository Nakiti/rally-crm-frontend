interface StorySectionPreviewProps {
  storyTitle?: string;
  storyText?: string;
  storyImage?: string;
  [key: string]: any; // Allow additional props
}

export function StorySectionPreview({ 
  title = "Our Story",
  text = "We are dedicated to making a positive impact in our community through innovative solutions and unwavering commitment to our mission. Our journey began with a simple belief that together, we can create lasting change.",
  storyImage,
}: StorySectionPreviewProps) {
  return (
    <div className="text-center mb-20">
      <div className="inline-block mb-6">
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
      </div>
      <h2 className="font-bold mb-8 text-4xl text-gray-900">
        {title}
      </h2>
      <div className="max-w-4xl mx-auto">
        <div className=" gap-12 items-center">
          <div className="text-center">
            <p className="leading-relaxed text-lg text-gray-600">
              {text}
            </p>
          </div>
          {/* {storyImage && (
            <div className="relative">
              <img 
                src={storyImage} 
                alt="Our Story" 
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-20 to-transparent rounded-2xl"></div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
