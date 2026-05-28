import { useState } from 'react';
import { Send, Image as ImageIcon, MapPin, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';


interface Message {
  id: number;
  user: string;
  text: string;
  image?: string;
  location?: string;
  time: string;
  isMe: boolean;
}

export function ChannelScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      user: "John Doe",
      text: "Water is rising quickly near the bridge!",
      location: "Skudai Bridge",
      time: "10:30 AM",
      isMe: false
    },
    {
      id: 2,
      user: "Sarah Tan",
      text: "Current view from my balcony. Stay safe everyone.",
      image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=500",
      location: "Taman Impian Emas",
      time: "10:45 AM",
      isMe: false
    }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      user: "Ahmad Abdullah",
      text: inputText,
      location: "Johor Bahru",
      time: "Just now",
      isMe: true
    };
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 to-teal-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 shadow-sm border-b">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-gray-900">Community Channel</h1>
          <MessageSquare size={20} className="text-blue-600" />
        </div>
        <p className="text-gray-500 text-sm">Real-time updates from neighbors</p>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-2 mb-1 px-1">
              <span className="text-xs font-bold text-gray-600">{msg.user}</span>
              <span className="text-[10px] text-gray-400">{msg.time}</span>
            </div>
            
            <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
              msg.isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            }`}>
              {msg.image && (
                <div className="mb-2 rounded-lg overflow-hidden border border-gray-100">
                  <img src={msg.image} alt="Flood update" className="w-full h-40 object-cover" />
                </div>
              )}
              <p className="text-sm">{msg.text}</p>
              
              {msg.location && (
                <div className={`flex items-center gap-1 mt-2 text-[10px] ${msg.isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                  <MapPin size={10} />
                  <span>{msg.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/80 backdrop-blur-md border-t flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-600">
          <ImageIcon size={20} />
        </Button>
        <Input 
          placeholder="Type an update..." 
          className="flex-1 rounded-full bg-white border-gray-200 h-10 shadow-sm"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage} size="icon" className="rounded-full bg-gradient-to-r from-blue-600 to-teal-600 shadow-md">
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}