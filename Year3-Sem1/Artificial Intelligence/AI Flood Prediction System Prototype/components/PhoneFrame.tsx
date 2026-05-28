interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="relative">
        {/* Phone Body */}
        <div className="w-[375px] h-[812px] bg-black rounded-[3rem] p-3 shadow-2xl relative overflow-hidden">
          {/* Screen Bezel */}
          <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50"></div>
            
            {/* App Content */}
            <div className="w-full h-full overflow-hidden">
              {children}
            </div>
          </div>
        </div>
        
        {/* Phone Buttons */}
        <div className="absolute -right-2 top-32 w-1 h-16 bg-gray-800 rounded-l"></div>
        <div className="absolute -right-2 top-52 w-1 h-12 bg-gray-800 rounded-l"></div>
        <div className="absolute -right-2 top-[17rem] w-1 h-12 bg-gray-800 rounded-l"></div>
        <div className="absolute -left-2 top-40 w-1 h-8 bg-gray-800 rounded-r"></div>
      </div>
    </div>
  );
}
