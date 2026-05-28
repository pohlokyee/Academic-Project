import { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Navigation, Route, Home, Plus, X } from 'lucide-react'; // Added X for cancel icon
// Removed Drawer import
import { Button } from './ui/button';
import { Input } from './ui/input';

type TimeMode = 'past' | 'realtime' | 'predicted';

// New type for saved locations
type SavedLocation = {
  name: string;
  address: string;
};

// Utility function to get styling based on risk level
const getRiskStyle = (risk: 'low' | 'medium' | 'high' | 'severe') => {
  switch (risk) {
    case 'low':
      return { color: '#22c55e', radius: 400, fillOpacity: 0.15 }; // Green
    case 'medium':
      return { color: '#eab308', radius: 800, fillOpacity: 0.25 }; // Yellow
    case 'high':
      return { color: '#f97316', radius: 1200, fillOpacity: 0.35 }; // Orange
    case 'severe':
      return { color: '#ef4444', radius: 1800, fillOpacity: 0.45 }; // Red
    default:
      return { color: '#9ca3af', radius: 200, fillOpacity: 0.1 }; // Gray (Default)
  }
};

export function LiveMapScreen() {
  const [timeMode, setTimeMode] = useState<TimeMode>('realtime');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEvacRoutes, setShowEvacRoutes] = useState(false);
  
  // State for Saved Locations
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([
    { name: 'House', address: 'Johor Bahru' }, // Hardcoded example
  ]);
  
  // New States for inline form
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationAddress, setNewLocationAddress] = useState('');
  const [showAddForm, setShowAddForm] = useState(false); 
  
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const routeLinesRef = useRef<any[]>([]);

  const sensors = [
    { id: 1, name: 'Pasir Gudang Station', lat: 1.4724, lng: 103.9061, risk: 'high' as const },
    { id: 2, name: 'Skudai Station', lat: 1.5347, lng: 103.6610, risk: 'medium' as const },
    { id: 3, name: 'Kulai Sensor', lat: 1.6567, lng: 103.6005, risk: 'low' as const },
    { id: 4, name: 'Senai Station', lat: 1.6009, lng: 103.6700, risk: 'medium' as const },
    { id: 5, name: 'Impian Emas', lat: 1.4893, lng: 103.7390, risk: 'severe' as const },
  ];

  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.async = true;
    script.onload = () => {
      if (mapContainerRef.current && (window as any).L) {
        const L = (window as any).L;
        
        // Initialize map centered on Johor Bahru
        const map = L.map(mapContainerRef.current).setView([1.4927, 103.7414], 11);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map);

        // Add Circle Markers for risk areas (new implementation)
        sensors.forEach((sensor) => {
          const { color, radius, fillOpacity } = getRiskStyle(sensor.risk);
          
          // 1. Add the transparent risk circle
          L.circle([sensor.lat, sensor.lng], {
            color: color,
            fillColor: color,
            fillOpacity: fillOpacity,
            radius: radius, // Radius in meters
            weight: 2,
          })
            .addTo(map)
            .bindPopup(`<strong>${sensor.name} - Risk Zone</strong><br>Level: ${sensor.risk.charAt(0).toUpperCase() + sensor.risk.slice(1)}`);
            
          // 2. Add a simple dot/pin marker in the center for the exact sensor location
          const customPinIcon = L.divIcon({
            className: 'custom-pin-marker',
            html: `<div style="
              background: ${color};
              width: 12px;
              height: 12px;
              border-radius: 50%;
              border: 2px solid white;
              box-shadow: 0 0 4px ${color};
            "></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6],
          });

          L.marker([sensor.lat, sensor.lng], { icon: customPinIcon }).addTo(map);
        });

        mapRef.current = map;

        // Cleanup
        return () => {
          map.remove();
        };
      }
    };
    document.body.appendChild(script);
  }, []);
  
  // New handler for saving a location
  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLocationName.trim() && newLocationAddress.trim()) {
      const newLoc: SavedLocation = {
        name: newLocationName.trim(),
        address: newLocationAddress.trim(),
      };
      setSavedLocations((prev) => [...prev, newLoc]);
      setNewLocationName('');
      setNewLocationAddress('');
      setShowAddForm(false); // Hide form after saving
    }
  };
  
  // New handler for canceling the add operation
  const handleCancelAdd = () => {
    setNewLocationName('');
    setNewLocationAddress('');
    setShowAddForm(false); // Hide form without saving
  };
  
  // New handler for focusing a saved location on the map
  const handleFocusLocation = (location: SavedLocation) => {
    // Prototype function: Recenter map on a general JB area and simulate focus
    if (mapRef.current) {
        mapRef.current.setView([1.4927, 103.7414], 12); 
    }
    setSearchQuery(location.address);
    console.log(`Simulating focusing map on: ${location.name} at ${location.address}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery && mapRef.current && (window as any).L) {
      // Simple search - find matching sensor
      const sensor = sensors.find(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (sensor) {
        mapRef.current.setView([sensor.lat, sensor.lng], 13);
      }
    }
  };

  const toggleEvacRoutes = () => {
    if (!mapRef.current || !(window as any).L) return;
    
    const L = (window as any).L;
    
    if (showEvacRoutes) {
      // Remove existing route lines
      routeLinesRef.current.forEach(line => mapRef.current.removeLayer(line));
      routeLinesRef.current = [];
      setShowEvacRoutes(false);
    } else {
      // Add evacuation route lines and markers
      const evacuationRoutes = [
        {
          name: 'Route A: Pasir Gudang to Skudai',
          latlngs: [[1.4724, 103.9061], [1.5347, 103.6610]],
          color: '#3b82f6'
        },
        {
          name: 'Route B: Impian Emas to Senai',
          latlngs: [[1.4893, 103.7390], [1.6009, 103.6700]],
          color: '#10b981'
        },
        {
          name: 'Route C: Senai to Kulai',
          latlngs: [[1.6009, 103.6700], [1.6567, 103.6005]],
          color: '#8b5cf6'
        },
      ];

      evacuationRoutes.forEach(route => {
        const polyline = L.polyline(route.latlngs, {
          color: route.color,
          weight: 4,
          opacity: 0.7,
          dashArray: '10, 5'
        }).addTo(mapRef.current);
        
        polyline.bindPopup(`<strong>${route.name}</strong><br>Suggested evacuation route`);
        routeLinesRef.current.push(polyline);

        // Add arrow markers along the route
        const endPoint = route.latlngs[route.latlngs.length - 1];
        
        // Add evacuation center marker at the end
        const safeZoneIcon = L.divIcon({
          className: 'safe-zone-marker',
          html: `<div style="
            background: ${route.color};
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
          </div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const safeZoneMarker = L.marker(endPoint, { icon: safeZoneIcon })
          .addTo(mapRef.current)
          .bindPopup(`<strong>Safe Zone</strong><br>${route.name}`);
        
        routeLinesRef.current.push(safeZoneMarker);
      });

      setShowEvacRoutes(true);
    }
  };

  const RiskLegend = () => (
    <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-xl shadow-lg p-3">
        <h4 className="text-gray-900 text-xs font-bold mb-2 border-b pb-1">Risk Zones</h4>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-60"></div>
                <span className="text-gray-700 text-xs">Low</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full opacity-60"></div>
                <span className="text-gray-700 text-xs">Medium</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-60"></div>
                <span className="text-gray-700 text-xs">High</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-gradient-to-br from-red-500 to-red-700 rounded-full opacity-60"></div>
                <span className="text-gray-700 text-xs">Severe</span>
            </div>
        </div>
    </div>
  );

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-teal-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-gray-900">Live Map</h1>
          <Navigation size={20} className="text-blue-600" />
          
        </div>
        <p className="text-gray-500 text-sm">Real-time monitoring</p>
      </div>

      <div className="px-6 pt-4 h-full overflow-y-auto pb-24">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-3">
          <div className="relative">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location..."
              className="w-full px-4 py-2.5 pl-10 pr-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm text-sm"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </form>

        {/* Time Mode Toggle - Thinner */}
        <div className="bg-white rounded-xl shadow-md p-1 mb-3 flex gap-1">
          <button
            onClick={() => setTimeMode('past')}
            className={`flex-1 py-2 px-2 rounded-lg transition-all text-xs ${
              timeMode === 'past' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Past
          </button>
          <button
            onClick={() => setTimeMode('realtime')}
            className={`flex-1 py-2 px-2 rounded-lg transition-all text-xs ${
              timeMode === 'realtime' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Real-Time
          </button>
          <button
            onClick={() => setTimeMode('predicted')}
            className={`flex-1 py-2 px-2 rounded-lg transition-all text-xs ${
              timeMode === 'predicted' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            +2h Predict
          </button>
        </div>

        {/* Map Container (Parent set to relative to position floating children) */}
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden mb-3">
          <div 
            ref={mapContainerRef}
            className="w-full h-96"
            style={{ minHeight: '384px' }}
          ></div>
          
          {/* RISK LEGEND - Now floating inside the map area */}
          <RiskLegend />
          
        </div>

        {/* Evacuation Routes Toggle (Kept outside as it's an action, not map info) */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Route size={18} className="text-gray-600" />
              <h3 className="text-gray-900 text-sm font-medium">Evacuation Routes</h3>
            </div>
            <button
              onClick={toggleEvacRoutes}
              className={`py-2 px-3 rounded-lg transition-all text-xs font-medium ${
                showEvacRoutes 
                  ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showEvacRoutes ? 'Hide Routes' : 'Show Routes'}
            </button>
          </div>
        </div>
        
        {/* Saved Locations Section */}
        <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-gray-900 font-medium">Saved Locations</h3>
                
                {/* Add Location Button (Trigger) */}
                {!showAddForm && (
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 px-2"
                        onClick={() => setShowAddForm(true)}
                    >
                        <Plus size={16} className="mr-1" />
                        Add Location
                    </Button>
                )}
            </div>
            
            {/* Conditional Inline Add Location Form */}
            {showAddForm && (
                <div className="mb-4 pt-2 border-t border-gray-100">
                    <h4 className="text-gray-900 text-sm font-semibold mb-3">New Location Details</h4>
                    <form onSubmit={handleAddLocation} className="space-y-3">
                        <Input
                            type="text"
                            value={newLocationName}
                            onChange={(e) => setNewLocationName(e.target.value)}
                            placeholder="Location Name (e.g., Work)"
                            required
                            className='h-10 text-sm'
                        />
                        <Input
                            type="text"
                            value={newLocationAddress}
                            onChange={(e) => setNewLocationAddress(e.target.value)}
                            placeholder="Location/Address"
                            required
                            className='h-10 text-sm'
                        />
                        <div className="flex gap-2 justify-end">
                            <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={handleCancelAdd}
                                className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                            >
                                <X size={16} className="mr-1" />
                                Cancel
                            </Button>
                            <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <Plus size={16} className="mr-1" />
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            )}
            
            {/* List of Saved Location Buttons */}
            <div className="flex gap-2 flex-wrap">
                {savedLocations.map((loc, index) => (
                    <Button
                        key={index}
                        onClick={() => handleFocusLocation(loc)}
                        variant="secondary"
                        size="sm"
                        className="text-sm border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700"
                    >
                        {/* Use Home icon for the hardcoded 'House' example */}
                        {loc.name === 'House' ? <Home size={16} className="mr-1" /> : <MapPin size={16} className="mr-1" />}
                        {loc.name}
                    </Button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}