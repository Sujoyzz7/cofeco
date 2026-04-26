import React, { useState, useEffect, useMemo } from 'react';
import { 
  Coffee, 
  ShoppingBag, 
  Menu, 
  X, 
  MapPin, 
  Clock, 
  Phone, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  Trash2, 
  CheckCircle,
  Plus,
  Minus,
  Star,
  ArrowRight,
  Truck,
  Store,
  Info
} from 'lucide-react';

// --- Mock Data ---
const PRODUCTS = [
  { id: 1, name: "Signature Espresso", category: "Hot Coffee", price: 3.50, description: "Rich, bold double shot of our house blend.", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "Creamy Latte", category: "Hot Coffee", price: 4.50, description: "Smooth steamed milk over espresso with light foam.", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "Iced Caramel Macchiato", category: "Cold Coffee", price: 5.25, description: "Espresso with vanilla syrup, milk, and caramel drizzle.", image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "Cold Brew", category: "Cold Coffee", price: 4.00, description: "Slow-steeped for 18 hours for maximum smoothness.", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "Butter Croissant", category: "Snacks", price: 3.00, description: "Flaky, golden-brown, and purely French.", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400" },
  { id: 6, name: "Velvet Cheesecake", category: "Desserts", price: 6.50, description: "New York style with a berry compote.", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400" },
];

const CATEGORIES = ["All", "Hot Coffee", "Cold Coffee", "Snacks", "Desserts"];

// --- Components ---

const Navbar = ({ cartCount, onCartClick, onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Menu', 'About', 'Contact'];

  return (
    <nav className={`fixed w-full z-[60] transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-[#6F4E37] p-2 rounded-xl shadow-lg transition-transform group-hover:rotate-6">
              <Coffee className="text-white w-6 h-6" />
            </div>
            <span className={`text-2xl font-bold tracking-tight font-serif ${scrolled ? 'text-[#6F4E37]' : 'text-white'}`}>
              COFECO
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => onNavigate(item.toLowerCase())}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  currentPage === item.toLowerCase() 
                    ? (scrolled ? 'bg-[#6F4E37] text-white' : 'bg-white/20 text-white') 
                    : (scrolled ? 'text-gray-700 hover:text-[#6F4E37]' : 'text-white hover:bg-white/10')
                }`}
              >
                {item}
              </button>
            ))}
            <div className="w-px h-6 bg-gray-300 mx-4 opacity-30" />
            <button 
              onClick={onCartClick}
              className={`relative p-3 rounded-full transition-all ${
                scrolled ? 'bg-[#F5F1EE] text-[#6F4E37] hover:bg-[#6F4E37] hover:text-white' : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C4A484] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={onCartClick} 
              className={`relative p-2 rounded-full ${scrolled ? 'text-[#6F4E37]' : 'text-white'}`}
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#C4A484] text-white text-[10px] font-bold px-1.5 rounded-full ring-1 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`p-2 rounded-lg ${scrolled ? 'text-[#6F4E37]' : 'text-white'}`}
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl py-6 px-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-300">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => { onNavigate(item.toLowerCase()); setIsOpen(false); }}
              className={`block w-full text-left text-lg font-semibold p-4 rounded-xl transition-colors ${
                currentPage === item.toLowerCase() ? 'bg-[#F5F1EE] text-[#6F4E37]' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onOrderNow }) => (
  <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1920" 
        className="w-full h-full object-cover scale-105 animate-slow-zoom brightness-[0.45]"
        alt="Hero Background"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/80 via-transparent to-transparent"></div>
    </div>
    
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
      <div className="max-w-3xl">
        <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-8 animate-in slide-in-from-bottom duration-700">
          <Star className="w-4 h-4 text-yellow-400 mr-2 fill-yellow-400" />
          <span className="text-sm font-semibold tracking-wide uppercase">The Best Coffee in the District</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[1.1] mb-8 animate-in slide-in-from-bottom duration-1000">
          Every Sip <br />
          <span className="text-[#C4A484] italic">Tells a Story</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-2xl animate-in fade-in duration-1000 delay-300">
          From the mist-covered mountains of Ethiopia to your favorite ceramic mug. Experience artisanal roasting in the heart of Dhaka.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 animate-in slide-in-from-bottom duration-1000 delay-500">
          <button 
            onClick={onOrderNow}
            className="group px-10 py-5 bg-[#6F4E37] hover:bg-[#5D412E] text-white rounded-full font-bold text-lg flex items-center justify-center transition-all shadow-2xl hover:shadow-brown-500/40 transform hover:-translate-y-1"
          >
            Order Delivery <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="px-10 py-5 bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg transition-all">
            See Our Story
          </button>
        </div>
      </div>
    </div>
    
    {/* Decorative Scroll indicator */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <div className="w-px h-12 bg-white/40"></div>
        <span className="text-white text-[10px] uppercase tracking-[0.3em]">Scroll</span>
    </div>
  </section>
);

const App = () => {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [category, setCategory] = useState('All');
  const [orderStatus, setOrderStatus] = useState(null); 
  const [orderType, setOrderType] = useState('pickup'); // 'pickup' or 'delivery'

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  const handleCheckout = () => {
    setOrderStatus('processing');
    setTimeout(() => {
      setOrderStatus('success');
      setCart([]);
    }, 2500);
  };

  const filteredProducts = useMemo(() => 
    category === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === category), 
    [category]
  );

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#2C1810] selection:bg-[#C4A484]/30">
      <Navbar 
        currentPage={page}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        onNavigate={setPage}
      />

      <main className="relative">
        {page === 'home' && (
          <div className="animate-in fade-in duration-700">
            <Hero onOrderNow={() => setPage('menu')} />
            
            <section className="bg-[#2C1810] py-28 relative overflow-hidden">
               <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                   <Coffee className="w-[400px] h-[400px] -rotate-12" />
               </div>
              <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">Can't Make It To The Shop? <br /> We'll Come To You.</h2>
                <p className="text-[#C4A484] text-xl mb-12 max-w-2xl mx-auto opacity-80">Freshly brewed coffee and warm snacks delivered to your doorstep in 20 mins or less. Guaranteed fresh.</p>
                <div className="flex justify-center gap-6">
                    <button 
                        onClick={() => setPage('menu')}
                        className="bg-white text-[#6F4E37] px-12 py-5 rounded-full font-bold text-lg hover:bg-[#F5F1EE] transition-all transform hover:scale-105"
                    >
                        Order Online
                    </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {page === 'menu' && (
          <div className="pt-40 pb-24 max-w-7xl mx-auto px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="mb-16 text-center max-w-2xl mx-auto">
              <span className="text-[#C4A484] font-bold uppercase tracking-widest text-sm">Our Specialties</span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold mt-4 mb-6">Explore Our Menu</h1>
              <p className="text-gray-500 text-lg">Every drink is hand-poured and every snack is baked fresh daily using premium local ingredients.</p>
            </header>

            <div className="flex flex-wrap justify-center gap-3 mb-16 bg-[#F5F1EE]/50 p-2 rounded-full w-fit mx-auto border border-[#C4A484]/10">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                    category === cat 
                      ? 'bg-[#6F4E37] text-white shadow-lg scale-105' 
                      : 'text-gray-600 hover:text-[#6F4E37] hover:bg-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-50">
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={product.image} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      alt={product.name}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    <div className="absolute top-6 right-6 bg-white shadow-xl px-4 py-2 rounded-2xl font-bold text-[#6F4E37] text-lg">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-[10px] font-bold text-[#C4A484] uppercase tracking-[0.2em]">{product.category}</span>
                            <h3 className="text-2xl font-bold text-[#2C1810] mt-1">{product.name}</h3>
                        </div>
                    </div>
                    <p className="text-gray-500 text-base mb-8 line-clamp-2 leading-relaxed">{product.description}</p>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full py-4 bg-[#F5F1EE] text-[#6F4E37] font-bold rounded-2xl hover:bg-[#6F4E37] hover:text-white transition-all duration-300 flex items-center justify-center gap-3 transform group-active:scale-95 shadow-inner"
                    >
                      <Plus className="w-5 h-5" /> Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === 'about' && (
          <div className="pt-40 pb-24 max-w-7xl mx-auto px-4 animate-in fade-in duration-700">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800" 
                  className="rounded-[3rem] shadow-2xl relative z-10"
                  alt="Shop Interior"
                />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#C4A484]/20 rounded-full blur-3xl z-0"></div>
                <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#6F4E37]/10 rounded-full blur-2xl z-0"></div>
              </div>
              <div className="space-y-8">
                <div>
                   <span className="text-[#C4A484] font-bold uppercase tracking-widest text-sm">Founded 2023</span>
                   <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight mt-4">The Essence of Our Coffee</h2>
                </div>
                <p className="text-gray-500 leading-relaxed text-xl">
                  COFECO wasn't born in a boardroom; it was born in a kitchen, through a hundred failed brews and a single perfect espresso shot.
                </p>
                <p className="text-gray-500 leading-relaxed text-lg italic">
                  "We believe that a coffee shop should be the heartbeat of its neighborhood—a place where ideas flow as freely as the caffeine."
                </p>
                <div className="grid grid-cols-2 gap-10 pt-6">
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                    <h4 className="text-4xl font-bold text-[#6F4E37] mb-1">12+</h4>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Origin Farms</p>
                  </div>
                  <div className="p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
                    <h4 className="text-4xl font-bold text-[#6F4E37] mb-1">5k+</h4>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Happy Locals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 'contact' && (
          <div className="pt-40 pb-24 max-w-7xl mx-auto px-4 animate-in fade-in duration-700">
             <div className="grid md:grid-cols-2 gap-20">
                <div>
                  <h2 className="text-5xl font-serif font-bold mb-10 leading-tight">Visit Our Sanctuary <br /> or Reach Out.</h2>
                  <div className="space-y-10">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white shadow-md rounded-[1.25rem] flex items-center justify-center text-[#6F4E37] shrink-0">
                        <MapPin className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-1">Main Roastery</h4>
                        <p className="text-gray-500">123 Espresso Lane, Caffeine Quarter, DH 1205</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white shadow-md rounded-[1.25rem] flex items-center justify-center text-[#6F4E37] shrink-0">
                        <Phone className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-1">Call Us</h4>
                        <p className="text-gray-500">+880 1712-345678 (Toll Free)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white shadow-md rounded-[1.25rem] flex items-center justify-center text-[#6F4E37] shrink-0">
                        <Clock className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl mb-1">Opening Times</h4>
                        <p className="text-gray-500">Mon - Sun: 7:00 AM - 10:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F1EE] rounded-bl-[5rem] -mr-10 -mt-10"></div>
                  <h3 className="text-3xl font-bold mb-8 relative z-10">Leave a Note</h3>
                  <form className="space-y-5 relative z-10">
                    <div className="grid grid-cols-2 gap-5">
                        <input type="text" placeholder="First Name" className="w-full p-5 rounded-2xl bg-[#F5F1EE]/50 border-none focus:ring-2 focus:ring-[#6F4E37] outline-none transition-all" />
                        <input type="text" placeholder="Last Name" className="w-full p-5 rounded-2xl bg-[#F5F1EE]/50 border-none focus:ring-2 focus:ring-[#6F4E37] outline-none transition-all" />
                    </div>
                    <input type="email" placeholder="Email Address" className="w-full p-5 rounded-2xl bg-[#F5F1EE]/50 border-none focus:ring-2 focus:ring-[#6F4E37] outline-none transition-all" />
                    <textarea placeholder="Tell us about your experience..." rows="4" className="w-full p-5 rounded-2xl bg-[#F5F1EE]/50 border-none focus:ring-2 focus:ring-[#6F4E37] outline-none transition-all resize-none"></textarea>
                    <button className="w-full py-5 bg-[#6F4E37] text-white font-bold rounded-2xl hover:bg-[#5D412E] transition-all shadow-xl hover:shadow-[#6F4E37]/30">Send Message</button>
                  </form>
                </div>
             </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#2C1810] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                <Coffee className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold font-serif">COFECO</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Brewing exceptional moments since 2023. Our beans are roasted with love and served with a smile.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#6F4E37] transition-all cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#6F4E37] transition-all cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-8 text-[#C4A484]">Quick Explore</h4>
            <ul className="space-y-4 text-gray-400 text-lg">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => setPage('menu')}>Latest Menu</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => setPage('about')}>Our Story</li>
              <li className="hover:text-white transition-colors cursor-pointer">Franchise Info</li>
              <li className="hover:text-white transition-colors cursor-pointer">Gift Cards</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-8 text-[#C4A484]">Customer Care</h4>
            <ul className="space-y-4 text-gray-400 text-lg">
              <li className="hover:text-white transition-colors cursor-pointer">Help Center</li>
              <li className="hover:text-white transition-colors cursor-pointer">Refund Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer">Shipping Status</li>
              <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
            </ul>
          </div>
          <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10">
            <h4 className="text-xl font-bold mb-4">Stay Brewed</h4>
            <p className="text-sm text-gray-400 mb-6">Join our newsletter for exclusive recipes and discounts.</p>
            <div className="flex flex-col gap-3">
              <input type="email" placeholder="Email Address" className="bg-white/10 border-none rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-[#C4A484]" />
              <button className="bg-[#6F4E37] text-white py-3 rounded-xl font-bold hover:bg-[#5D412E] transition-all">Subscribe Now</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
          © 2023 COFECO Coffee Roasters. All rights reserved. Locally sourced. Heartfully brewed.
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-[#2C1810]/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div className="px-8 py-8 border-b flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-[#6F4E37]" /> Your Basket
                </h2>
                <p className="text-xs text-gray-400 mt-1 font-medium">{cart.length} items selected</p>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-gray-100 rounded-full transition-all">
                <X className="w-7 h-7" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
              {orderStatus === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-2 ring-8 ring-green-50/50">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-bold">Order Confirmed!</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">We've received your order. Your barista is starting the brew right now!</p>
                  <div className="p-6 bg-gray-50 rounded-3xl w-full text-left flex items-start gap-4">
                     <div className="bg-white p-2 rounded-lg shadow-sm text-[#6F4E37]"><Info className="w-5 h-5" /></div>
                     <p className="text-xs text-gray-500 font-medium">You will receive an SMS update once your {orderType} is ready. Estimated time: 12-15 minutes.</p>
                  </div>
                  <button 
                    onClick={() => { setOrderStatus(null); setIsCartOpen(false); }}
                    className="w-full py-5 bg-[#2C1810] text-white rounded-2xl font-bold text-lg hover:bg-[#1a0f0a] transition-all"
                  >
                    Keep Browsing
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-6">
                  <div className="w-32 h-32 bg-[#FDFCFB] rounded-full flex items-center justify-center border-2 border-dashed border-gray-100">
                    <ShoppingBag className="w-12 h-12 opacity-30" />
                  </div>
                  <p className="text-xl font-medium text-gray-400">Your basket is feeling lonely.</p>
                  <button 
                    onClick={() => { setIsCartOpen(false); setPage('menu'); }}
                    className="px-10 py-4 bg-[#6F4E37] text-white rounded-2xl font-bold hover:shadow-lg transition-all"
                  >
                    Let's Add Coffee
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Order Type Selector */}
                  <div className="flex bg-[#F5F1EE] p-1.5 rounded-2xl">
                     <button 
                        onClick={() => setOrderType('pickup')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${orderType === 'pickup' ? 'bg-white text-[#6F4E37] shadow-sm' : 'text-gray-400'}`}
                     >
                         <Store className="w-4 h-4" /> Store Pickup
                     </button>
                     <button 
                        onClick={() => setOrderType('delivery')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${orderType === 'delivery' ? 'bg-white text-[#6F4E37] shadow-sm' : 'text-gray-400'}`}
                     >
                         <Truck className="w-4 h-4" /> Home Delivery
                     </button>
                  </div>

                  {cart.map(item => (
                    <div key={item.id} className="flex gap-6 group relative">
                      <div className="relative">
                        <img src={item.image} className="w-24 h-24 rounded-3xl object-cover shadow-sm" alt="" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-xl text-[#2C1810]">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-lg font-bold text-[#6F4E37] mb-3">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center bg-[#F5F1EE] rounded-xl p-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-all text-gray-500"><Minus className="w-4 h-4" /></button>
                            <span className="font-bold text-sm w-8 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white transition-all text-gray-500"><Plus className="w-4 h-4" /></button>
                          </div>
                          <span className="text-xs font-bold text-gray-300 ml-auto">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && !orderStatus && (
              <div className="p-8 border-t bg-[#FDFCFB] space-y-5 rounded-t-[3rem] shadow-2xl">
                <div className="space-y-3">
                    <div className="flex justify-between text-gray-400 font-medium">
                    <span>Subtotal</span>
                    <span className="text-[#2C1810]">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400 font-medium">
                    <span>{orderType === 'delivery' ? 'Delivery Fee' : 'Service Fee'}</span>
                    <span className="text-[#2C1810]">${orderType === 'delivery' ? '2.50' : '0.00'}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold text-[#2C1810] pt-4 border-t border-gray-100">
                    <span>Order Total</span>
                    <span className="text-[#6F4E37]">${(cartTotal + (orderType === 'delivery' ? 2.5 : 0)).toFixed(2)}</span>
                    </div>
                </div>
                <button 
                  disabled={orderStatus === 'processing'}
                  onClick={handleCheckout}
                  className="w-full py-5 bg-[#6F4E37] text-white rounded-[1.5rem] font-bold text-xl hover:bg-[#5D412E] transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-[#6F4E37]/30 transform active:scale-[0.98]"
                >
                  {orderStatus === 'processing' ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                      Roasting your order...
                    </>
                  ) : 'Place Order'}
                </button>
                <p className="text-[10px] text-center text-gray-400 font-medium uppercase tracking-widest">Secure Checkout Powered by COFECO Pay</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;