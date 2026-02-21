import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Send, Bot, User, AlertCircle, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content: "Hello! I'm your HealthHero AI assistant. I can help answer general health questions, explain your medical reports, and provide wellness tips. How can I assist you today?",
    timestamp: new Date(),
  },
];

const sampleQuestions = [
  "What does my recent blood test mean?",
  "How can I improve my sleep quality?",
  "What are the side effects of Aspirin?",
  "Tips for managing high blood pressure",
];

export function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message?: string) => {
    const textToSend = message || input.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock API response - in production, connect to FastAPI backend
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: generateMockResponse(textToSend),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateMockResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('blood test') || lowerQuestion.includes('report')) {
      return "Based on your recent blood test results, most values are within normal ranges. However, I noticed your Vitamin D levels are slightly low at 22 ng/mL (normal range: 30-100 ng/mL). I recommend discussing vitamin D supplementation with your healthcare provider. Your cholesterol is also slightly elevated, which can be managed through diet and exercise. Would you like specific dietary recommendations?";
    }
    
    if (lowerQuestion.includes('sleep')) {
      return "Great question! Here are some evidence-based tips to improve sleep quality:\n\n1. Maintain a consistent sleep schedule\n2. Create a cool, dark sleeping environment (65-68°F)\n3. Avoid screens 1-2 hours before bedtime\n4. Limit caffeine after 2 PM\n5. Practice relaxation techniques like deep breathing\n\nWould you like me to help you track your sleep patterns in the app?";
    }
    
    if (lowerQuestion.includes('aspirin') || lowerQuestion.includes('side effect')) {
      return "Aspirin (100mg) is commonly prescribed for cardiovascular protection. Common side effects include:\n\n• Stomach upset or heartburn\n• Easy bruising\n• Increased bleeding risk\n\nTake it with food to minimize stomach irritation. Contact your doctor immediately if you experience: unusual bleeding, black stools, severe stomach pain, or allergic reactions. Never stop taking it without consulting your healthcare provider first.";
    }
    
    if (lowerQuestion.includes('blood pressure') || lowerQuestion.includes('hypertension')) {
      return "Managing high blood pressure involves lifestyle modifications:\n\n🥗 Diet: Reduce sodium, increase potassium-rich foods\n🏃 Exercise: 30 minutes of moderate activity most days\n🧘 Stress: Practice meditation or yoga\n💊 Medications: Take as prescribed\n📊 Monitor: Check blood pressure regularly\n\nYour current readings show good control. Keep up the great work! Would you like me to set reminders for blood pressure monitoring?";
    }
    
    return "That's a great question! While I can provide general health information, I recommend discussing specific medical concerns with your healthcare provider. Is there anything else I can help you with, such as medication reminders, symptom tracking, or understanding your health reports?";
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">AI Health Assistant</h2>
        <p className="text-gray-600">Ask health questions and get personalized insights</p>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-800">
          <strong>Important:</strong> This AI assistant provides general health information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your healthcare provider for medical concerns.
        </p>
      </motion.div>

      {/* Chat Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-lg overflow-hidden flex flex-col"
        style={{ height: 'calc(100vh - 400px)', minHeight: '500px' }}
      >
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === 'assistant'
                  ? 'bg-gradient-to-br from-blue-500 to-teal-500'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500'
              }`}>
                {message.role === 'assistant' ? (
                  <Bot className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div className={`flex-1 max-w-2xl ${message.role === 'user' ? 'flex flex-col items-end' : ''}`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.role === 'assistant'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
                <span className="text-xs text-gray-500 mt-1 px-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-500 to-teal-500">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Sample Questions */}
        {messages.length === 1 && (
          <div className="px-6 pb-4">
            <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              Try asking:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(question)}
                  className="text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-xl text-sm text-blue-700 transition-all border border-blue-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a health question..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-base"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
