import React from 'react';
import { Building2, Mic, Mail, Users, Cloud, Menu, X, Phone, Globe, Shield, BookOpen, Zap } from 'lucide-react';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeModal, setActiveModal] = React.useState<string | null>(null);
  const [authMode, setAuthMode] = React.useState<'signin' | 'signup'>('signin');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openModal = (modalId: string) => {
    setActiveModal(modalId);
    setIsMobileMenuOpen(false);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const departments = [
    {
      id: 'network-address',
      title: 'Network Address Department',
      subtitle: 'OWNERSHIP OF PLACE',
      description: 'Own your domain. Control your infrastructure. Establish your permanent place on the World Network. True digital independence begins with owning your Network Address.',
      email: 'network@multiagentautomationsystems.com',
      icon: Building2,
      results: [
        'Domain ownership and management',
        'Hosting infrastructure control',
        'Front-end and back-end systems',
        'Network access control',
        'Extended connectivity solutions'
      ],
      philosophy: 'Owning and operating your own Network Address is the best and most correct way to exist online.'
    },
    {
      id: 'verbal-address',
      title: 'Verbal Address Department',
      subtitle: 'SOUND',
      description: 'How you speak, how you are heard, how you conduct conversations digitally. Voice bots, phone systems, and conversational agents that represent your audible identity.',
      email: 'verbal@multiagentautomationsystems.com',
      icon: Mic,
      results: [
        'Voice bots and conversational agents',
        'Phone systems and VOIP',
        'Phone lifecycle management',
        'Production, repair, secure destruction',
        'Digital conversation governance'
      ],
      philosophy: 'Verbal Address is sound - governing how an entity speaks and is heard in the digital world.'
    },
    {
      id: 'electronic-address',
      title: 'Electronic Address Department',
      subtitle: 'MAIL · MEET · DOCUMENT',
      description: 'Formal, written, and operational digital interaction. Email automation, meeting systems, and documentation platforms for your operational address.',
      email: 'electronic@multiagentautomationsystems.com',
      icon: Mail,
      results: [
        'Email systems and automation',
        'Automatic quoting systems',
        'Online documentation platforms',
        'Digital forms and workflows',
        'Video conferencing and meeting systems'
      ],
      philosophy: 'Electronic Address governs formal, written, and operational digital interaction.'
    },
    {
      id: 'social-address',
      title: 'Social Address Department',
      subtitle: 'REACH, NOT OWNERSHIP',
      description: 'Social platforms provide reach and discovery, not ownership. Use them as a bridge to drive attention back to your owned Network Address.',
      email: 'social@multiagentautomationsystems.com',
      icon: Users,
      results: [
        'Social media account management',
        'Platform-based marketing strategies',
        'Public digital profile optimization',
        'Brand visibility and messaging',
        'Smart Suites (First Product)'
      ],
      philosophy: 'Social Address is a bridge, not a home. Use platforms for exposure, then refocus on your Network Address.'
    },
    {
      id: 'remote-address',
      title: 'Remote Address Department',
      subtitle: 'LEGACY & BENEFICIAL KNOWLEDGE',
      description: 'Where you teach, preserve, and pass forward beneficial knowledge. Your digital institution that persists beyond presence - your own academy of knowledge.',
      email: 'remote@multiagentautomationsystems.com',
      icon: Cloud,
      results: [
        'Intelligence bots and learning systems',
        'Online degree and licensing programs',
        'Learning Management Systems (LMS)',
        'Business founding and incorporation',
        'Secure digital vaults and privacy systems'
      ],
      philosophy: 'What you teach and preserve as beneficial knowledge becomes your digital legacy - your Remote Address.'
    }
  ];

  const technologies = [
    {
      title: 'Network Infrastructure',
      description: 'Own your place on the World Network',
      icon: Globe,
      target: 'network-address'
    },
    {
      title: 'Voice Systems',
      description: 'Control your digital sound',
      icon: Phone,
      target: 'verbal-address'
    },
    {
      title: 'Electronic Operations',
      description: 'Automate your formal interactions',
      icon: Zap,
      target: 'electronic-address'
    },
    {
      title: 'Social Reach',
      description: 'Bridge to your owned address',
      icon: Users,
      target: 'social-address'
    },
    {
      title: 'Knowledge Legacy',
      description: 'Preserve beneficial knowledge',
      icon: BookOpen,
      target: 'remote-address'
    },
    {
      title: 'Security & Privacy',
      description: 'Protect your digital identity',
      icon: Shield,
      target: 'remote-address'
    }
  ];

  const faqs = [
    {
      question: 'What is an Address in the digital world?',
      answer: 'An Address is not postal. An Address is where an entity exists, how it is reached, how it speaks, how it operates, how it is perceived, and what knowledge it leaves behind in the digital world.'
    },
    {
      question: 'Why do I need to own my Network Address?',
      answer: 'Platforms provide borrowed addresses. True digital independence begins with owning your domain, running your infrastructure, and controlling your front-end and back-end systems. This gives you a permanent place on the World Network.'
    },
    {
      question: 'How is Social Address different from Network Address?',
      answer: 'Social Address exists because platforms have reach, not because they are owned. Social platforms are useful for exposure and discovery, but they are not owned addresses. Social Address is a bridge to drive attention to your owned Network Address.'
    },
    {
      question: 'What is Remote Address and why is it important?',
      answer: 'Remote Address is where you teach, preserve, and pass forward beneficial knowledge. It\'s your digital legacy - a digital institution that persists beyond your presence, like your own school or academy of knowledge.'
    },
    {
      question: 'How does MAAS ensure address ownership?',
      answer: 'MAAS builds, owns, automates, and preserves your complete online identity. We ensure you own your online address, control your identity on the network, and can clearly tell the world who you are and where you exist.'
    }
  ];

  const careers = [
    {
      title: 'Network Infrastructure Engineer',
      description: 'Build and maintain owned network addresses for clients',
      tags: ['Infrastructure', 'Domains', 'Servers'],
      requirements: [
        'Experience with domain management and DNS',
        'Knowledge of hosting infrastructure',
        'Understanding of network security',
        'Familiarity with cloud platforms'
      ],
      details: {
        location: 'Remote',
        type: 'Full-time',
        experience: '3+ years'
      }
    },
    {
      title: 'Voice Systems Developer',
      description: 'Create conversational agents and voice automation systems',
      tags: ['Voice AI', 'Conversational Design', 'VOIP'],
      requirements: [
        'Experience with voice AI platforms',
        'Knowledge of VOIP systems',
        'Understanding of conversational design',
        'Programming skills in Python or JavaScript'
      ],
      details: {
        location: 'Remote',
        type: 'Full-time',
        experience: '2+ years'
      }
    },
    {
      title: 'Electronic Operations Specialist',
      description: 'Design email automation and meeting systems',
      tags: ['Email Automation', 'Workflows', 'Integration'],
      requirements: [
        'Experience with email marketing platforms',
        'Knowledge of workflow automation',
        'Understanding of API integrations',
        'Project management skills'
      ],
      details: {
        location: 'Remote',
        type: 'Full-time',
        experience: '2+ years'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Building2 className="w-8 h-8 text-yellow-500" />
              <span className="text-xl font-bold text-white">MAAS</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#departments" className="text-gray-300 hover:text-yellow-500 transition-colors">Departments</a>
              <a href="#technology" className="text-gray-300 hover:text-yellow-500 transition-colors">Technology</a>
              <a href="#faq" className="text-gray-300 hover:text-yellow-500 transition-colors">FAQ</a>
              <a href="#careers" className="text-gray-300 hover:text-yellow-500 transition-colors">Careers</a>
              <button 
                onClick={() => openModal('auth')}
                className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Sign In
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-300 hover:text-yellow-500"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <nav className="flex flex-col space-y-4">
                <a href="#departments" className="text-gray-300 hover:text-yellow-500 transition-colors">Departments</a>
                <a href="#technology" className="text-gray-300 hover:text-yellow-500 transition-colors">Technology</a>
                <a href="#faq" className="text-gray-300 hover:text-yellow-500 transition-colors">FAQ</a>
                <a href="#careers" className="text-gray-300 hover:text-yellow-500 transition-colors">Careers</a>
                <button 
                  onClick={() => openModal('auth')}
                  className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors w-fit"
                >
                  Sign In
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Own Your Online Address
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            MAAS exists to establish, automate, secure, govern, and preserve your complete Online Identity. 
            The World Network is fundamentally a global addressing system — and you should own your place on it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => openModal('contact')}
              className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              Establish Your Address
            </button>
            <a 
              href="#departments" 
              className="border border-yellow-500 text-yellow-500 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 hover:text-gray-900 transition-colors"
            >
              Explore Departments
            </a>
          </div>
        </div>
      </section>

      {/* Core Philosophy */}
      <section className="py-16 px-4 bg-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-yellow-500">Foundational Philosophy</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 mb-6">
              The World Network (commonly referred to as the Internet) is fundamentally a global addressing system.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Every digital interaction — websites, servers, email, voice calls, platforms, automation, learning systems — is a form of address resolution.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-yellow-500 font-semibold mb-2">You own your online address</h3>
                <p className="text-gray-400">Complete control over your digital infrastructure</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-yellow-500 font-semibold mb-2">You control your identity</h3>
                <p className="text-gray-400">Autonomous governance of your network presence</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg">
                <h3 className="text-yellow-500 font-semibold mb-2">You define your existence</h3>
                <p className="text-gray-400">Clear communication of who you are and where you exist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-yellow-500">Address Technologies</h2>
          <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Comprehensive automation systems for every aspect of your digital address
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-yellow-500 transition-colors cursor-pointer">
                <tech.icon className="w-12 h-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">{tech.title}</h3>
                <p className="text-gray-400">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section id="departments" className="py-16 px-4 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-yellow-500">Address Departments</h2>
          <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Five specialized departments working in harmony: Place → Sound → Operations → Reach → Legacy
          </p>
          
          <div className="space-y-16">
            {departments.map((dept, index) => (
              <div key={dept.id} className="grid lg:grid-cols-2 gap-8 items-center">
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center mb-4">
                    <dept.icon className="w-8 h-8 text-yellow-500 mr-3" />
                    <div>
                      <h3 className="text-2xl font-bold text-white">{dept.title}</h3>
                      <p className="text-yellow-500 font-semibold">{dept.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 text-lg leading-relaxed">{dept.description}</p>
                  <div className="bg-gray-900 p-4 rounded-lg mb-4">
                    <p className="text-yellow-500 font-semibold mb-2">Core Philosophy:</p>
                    <p className="text-gray-300 italic">{dept.philosophy}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-yellow-500 font-semibold mb-2">Contact:</p>
                    <a href={`mailto:${dept.email}`} className="text-yellow-400 hover:text-yellow-300 transition-colors">
                      {dept.email}
                    </a>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                    <h4 className="text-yellow-500 font-semibold mb-4">Key Responsibilities:</h4>
                    <ul className="space-y-2">
                      {dept.results.map((result, idx) => (
                        <li key={idx} className="text-gray-300 flex items-start">
                          <span className="text-yellow-500 mr-2">•</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => openModal(`cases-${dept.id}`)}
                      className="mt-4 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                    >
                      View Case Studies
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-yellow-500">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-lg border border-gray-700">
                <button className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-750 transition-colors">
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <span className="text-yellow-500 text-2xl">+</span>
                </button>
                <div className="px-6 pb-6">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-16 px-4 bg-gray-800">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-yellow-500">Join Our Address Revolution</h2>
          <p className="text-xl text-gray-400 text-center mb-12 max-w-3xl mx-auto">
            Help us build the future of digital address ownership and online identity
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careers.map((career, index) => (
              <div key={index} className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{career.title}</h3>
                  <p className="text-gray-300 mb-4">{career.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {career.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-400 mb-4">
                    <p>{career.details.location} • {career.details.type} • {career.details.experience}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-yellow-500 font-semibold mb-2">Requirements:</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {career.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start">
                          <span className="text-yellow-500 mr-2">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button 
                    onClick={() => openModal('application')}
                    className="w-full bg-yellow-500 text-gray-900 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="w-8 h-8 text-yellow-500" />
                <span className="text-xl font-bold text-white">MAAS</span>
              </div>
              <p className="text-gray-400">
                Multi-Agent Automation Systems - Your Address Automation Company
              </p>
            </div>
            
            <div>
              <h4 className="text-yellow-500 font-semibold mb-4">Departments</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#network-address" className="hover:text-yellow-500 transition-colors">Network Address</a></li>
                <li><a href="#verbal-address" className="hover:text-yellow-500 transition-colors">Verbal Address</a></li>
                <li><a href="#electronic-address" className="hover:text-yellow-500 transition-colors">Electronic Address</a></li>
                <li><a href="#social-address" className="hover:text-yellow-500 transition-colors">Social Address</a></li>
                <li><a href="#remote-address" className="hover:text-yellow-500 transition-colors">Remote Address</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-yellow-500 font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-yellow-500 transition-colors">About</a></li>
                <li><a href="#careers" className="hover:text-yellow-500 transition-colors">Careers</a></li>
                <li><a href="#contact" className="hover:text-yellow-500 transition-colors">Contact</a></li>
                <li><a href="#privacy" className="hover:text-yellow-500 transition-colors">Privacy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-yellow-500 font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>maas@multiagentautomationsystems.com</p>
                <p>Building the future of digital address ownership</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Multi-Agent Automation Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {activeModal === 'auth' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-yellow-500">
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
              {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Confirm Password</label>
                  <input 
                    type="password" 
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                    placeholder="••••••••"
                  />
                </div>
              )}
              <button 
                type="submit"
                className="w-full bg-yellow-500 text-gray-900 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
            
            <div className="mt-4 text-center">
              <button 
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                className="text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                {authMode === 'signin' ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'contact' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-yellow-500">Contact MAAS</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">General Inquiries</h4>
                <p className="text-gray-300">maas@multiagentautomationsystems.com</p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">Department Contacts</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">Network: network@multiagentautomationsystems.com</p>
                  <p className="text-gray-300">Verbal: verbal@multiagentautomationsystems.com</p>
                  <p className="text-gray-300">Electronic: electronic@multiagentautomationsystems.com</p>
                  <p className="text-gray-300">Social: social@multiagentautomationsystems.com</p>
                  <p className="text-gray-300">Remote: remote@multiagentautomationsystems.com</p>
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-gray-400 text-sm">
                  Ready to establish your complete online address? Contact us to begin your digital independence journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'application' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-yellow-500">Apply to MAAS</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Position</label>
                <select className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none">
                  <option>Network Infrastructure Engineer</option>
                  <option>Voice Systems Developer</option>
                  <option>Electronic Operations Specialist</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Cover Letter</label>
                <textarea 
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-yellow-500 focus:outline-none"
                  placeholder="Tell us why you want to join the address revolution..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-yellow-500 text-gray-900 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;