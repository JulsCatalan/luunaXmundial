import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, LineSquiggle, Droplet, ShoppingBag, ArrowRight, Star, Award, Plane, Package, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from "framer-motion";

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
  }

  const AnimatedSection = ({ children, className = "" }: AnimatedSectionProps) => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUp}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-xl sm:text-2xl font-bold tracking-tight"
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className={`transition-colors duration-300 ${
                scrolled ? 'text-black' : 'text-white'
              }`}>Luuna</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('inicio')}
                className={`font-light transition-colors text-sm lg:text-base ${
                  scrolled ? 'text-black hover:text-blue-600' : 'text-white hover:text-blue-300'
                }`}
              >
                Inicio
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('experiencias')}
                className={`font-light transition-colors text-sm lg:text-base ${
                  scrolled ? 'text-black hover:text-blue-600' : 'text-white hover:text-blue-300'
                }`}
              >
                Experiencias
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('reserva')}
                className={`px-4 lg:px-6 py-2 rounded-full transition-all text-sm lg:text-base ${
                  scrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                Reserva
              </motion.button>
            </div>

            <button 
              className="md:hidden z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className={scrolled ? 'text-black' : 'text-white'} />
              ) : (
                <Menu className={scrolled ? 'text-black' : 'text-white'} />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 flex flex-col gap-4 bg-white rounded-lg p-4 shadow-lg"
            >
              <button onClick={() => scrollToSection('inicio')} className="text-left text-black hover:text-blue-600 py-2">
                Inicio
              </button>
              <button onClick={() => scrollToSection('experiencias')} className="text-left text-black hover:text-blue-600 py-2">
                Experiencias
              </button>
              <button onClick={() => scrollToSection('reserva')} className="text-left bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
                Reserva
              </button>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-gray-900 to-black">
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[url('./hero-mundial.jpg')] bg-cover bg-center" 
          />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12"
          >
            <motion.div 
              variants={fadeInScale}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex items-center justify-center"
            >
              <img src="./logo_mundial.webp" alt="logo-mundial" className="w-full h-full object-contain" />
            </motion.div>
            <motion.div 
              variants={fadeInScale}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            >
              <X className='w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8'/>
            </motion.div>
            <motion.div 
              variants={fadeInScale}
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full flex items-center justify-center invert"
            >
             <img src="./logo_luuna.webp" alt="logo-luuna" className="w-full h-full object-contain" />
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight"
          >
            Mundial 2026
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 font-light px-4"
          >
            Descansa como un campeón
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
          >
            <div className="w-16 sm:w-20 lg:w-24 h-1.5 sm:h-2 bg-green-600 rounded-full" />
            <div className="w-16 sm:w-20 lg:w-24 h-1.5 sm:h-2 bg-white rounded-full" />
            <div className="w-16 sm:w-20 lg:w-24 h-1.5 sm:h-2 bg-red-600 rounded-full" />
          </motion.div>

          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: [0, 10, 0]
            }}
            transition={{ 
              opacity: { delay: 1.2, duration: 0.8 },
              y: { repeat: Infinity, duration: 2 }
            }}
            onClick={() => scrollToSection('experiencias')}
          >
            <ChevronDown className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </motion.button>
        </div>
      </section>

      {/* Experiencias Section */}
      <section id="experiencias" className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4 text-black">
              Experiencias LUUNA
            </h2>
            <p className="text-center text-gray-600 mb-16 sm:mb-20 lg:mb-24 text-base sm:text-lg font-light px-4">
              Confort de clase mundial para el Mundial 2026
            </p>
          </AnimatedSection>

          {/* HOTELES SECTION */}
          <div className="mb-20 sm:mb-28 lg:mb-32">
            <AnimatedSection>
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
                  <span className='text-green-600'>Alianzas</span> con Hoteles
                </h3>
              </div>
            </AnimatedSection>

            {/* Hotel Images Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1630999295881-e00725e1de45?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] 
                bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                  <div className="w-10 sm:w-12 h-0.5 bg-green-600 mb-2" />
                  <p className="text-white text-lg sm:text-xl font-light">Habitaciones Premium</p>
                </div>
              </div>
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                  <div className="w-10 sm:w-12 h-0.5 bg-green-600 mb-2" />
                  <p className="text-white text-lg sm:text-xl font-light">Comodidad Luuna</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
              {[
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
                'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'
              ].map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,  
                    damping: 18,
                    mass: 0.5
                  }}
                  className="relative h-48 sm:h-56 lg:h-64 rounded-2xl overflow-hidden"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${img}')` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                </motion.div>
              ))}
            </div>

            <AnimatedSection>
              <div className="rounded-2xl p-6 sm:p-8 lg:p-10">
                <h4 className="text-xl sm:text-2xl font-bold text-black mb-6 sm:mb-8">Beneficios de la Alianza</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-x-12 lg:gap-y-6">
                  {[
                    { icon: Package, title: 'Almohadas sin costo', desc: 'Entrega de almohadas LUUNA premium para uso en todas las habitaciones del hotel' },
                    { icon: Award, title: 'Branding exclusivo', desc: 'Carteles y tarjetones con lemas oficiales del Mundial 2026' },
                    { icon: Sparkles, title: 'Colaboración digital', desc: 'Mención en web y redes sociales del hotel destacando la alianza' },
                    { icon: Star, title: 'Experiencia premium', desc: 'Eleva la calidad de descanso de tus huéspedes durante el Mundial' }
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-3 sm:gap-4">
                      <benefit.icon className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 shrink-0" />
                      <div>
                        <h5 className="text-base sm:text-lg font-semibold mb-1 text-black">{benefit.title}</h5>
                        <p className="text-gray-600 text-sm font-light leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* ALMOHADA DE VIAJE SECTION */}
          <div className="mb-20 sm:mb-28 lg:mb-32">
            <AnimatedSection>
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
                  Almohada de Viaje <span className='text-blue-500'>Ergonómica</span>
                </h3>
              </div>
            </AnimatedSection>

            {/* Product Images Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden md:col-span-2 group">
                <div className="absolute inset-0 bg-[url('./almo-1.png')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                  <div className="w-10 sm:w-12 h-0.5 bg-blue-600 mb-2" />
                  <p className="text-white text-xl sm:text-2xl font-bold">LUUNA Travel Champion</p>
                  <p className="text-gray-200 text-sm sm:text-base font-light mt-1">Edición Mundial 2026</p>
                </div>
              </div>
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-[url('./almo-2.png')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                  <p className="text-white text-lg sm:text-xl font-bold">Comodidad y Pasión</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
              {[
                { img: 'https://images.unsplash.com/photo-1672017088948-9a26a16dd39e?q=80&w=1358&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Compacto' },
                { img: 'https://images.unsplash.com/photo-1691256676366-370303d55b61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Ergonómico' },
                { img: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Premium' },
                { img: 'https://images.unsplash.com/photo-1668417863230-64f268d1d252?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Lavable' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,  
                    damping: 18,
                    mass: 0.5
                  }}
                  className="relative h-40 sm:h-48 lg:h-56 rounded-2xl overflow-hidden"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${item.img}')` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                    <p className="text-white font-medium text-xs sm:text-sm">{item.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <AnimatedSection>
              <div className="rounded-2xl p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <h4 className="text-xl sm:text-2xl font-bold text-black">Características del Producto</h4>
                </div>

                {/* FEATURES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20 lg:mb-24">
                  {[
                    { icon: <LineSquiggle />, title: 'Espuma Viscoelástica', desc: 'Memoria premium que se adapta a tu cuello' },
                    { icon: <Droplet />, title: 'Funda Desmontable', desc: 'Lavable, de poliéster o bambú' },
                    { icon: <ShoppingBag />, title: 'Bolsa de Transporte', desc: 'Diseño compacto y portátil' }
                  ].map((feature, i) => (
                    <div key={i} className="text-center">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <span className="text-white">{feature.icon}</span>
                      </div>
                      <h5 className="text-base sm:text-lg font-semibold mb-2 text-black">{feature.title}</h5>
                      <p className="text-gray-600 text-sm font-light px-2">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                {/* STEPS */}
                <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">Proceso de Desarrollo</h4>
                <div className="space-y-3">
                  {[
                    { etapa: 'Investigación y diseño', desc: 'Materiales, ergonomía, inspiración en marcas líderes' },
                    { etapa: 'Prototipos y pruebas', desc: '2-3 versiones testeadas con viajeros frecuentes' },
                    { etapa: 'Certificación NOM', desc: 'Registro de producto y empaque travel bag' },
                    { etapa: 'Producción piloto', desc: '500-1,000 unidades con proveedores seleccionados' },
                    { etapa: 'Lanzamiento comercial', desc: 'E-commerce y colaboraciones con aerolíneas' }
                  ].map((step, i) => (
                    <div 
                      key={i}
                      className="flex items-start gap-3 sm:gap-4 bg-white p-4 sm:p-5 rounded-xl border border-gray-100"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <h5 className="text-sm sm:text-base font-semibold text-black mb-0.5">{step.etapa}</h5>
                        <p className="text-gray-600 text-xs sm:text-sm font-light">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* AEROPUERTOS SECTION */}
          <div className="mb-10">
            <AnimatedSection>
              <div className="flex items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
                  <span className='text-red-500'>Aero</span>puertos y Aerolíneas
                </h3>
              </div>
            </AnimatedSection>

            {/* Airport Images Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1695093360120-490f21ca62a7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] 
                bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                  <div className="w-10 sm:w-12 h-0.5 bg-red-600 mb-2" />
                  <p className="text-white text-lg sm:text-xl font-light">Lounges VIP</p>
                </div>
              </div>
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1570114581742-586696237de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] 
                bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                  <div className="w-10 sm:w-12 h-0.5 bg-red-600 mb-2" />
                  <p className="text-white text-lg sm:text-xl font-light">Rest Points</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
              {[
                { img: 'https://images.unsplash.com/photo-1584669727833-88b47506defb?q=80&w=1962&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', city: 'CDMX' },
                { img: 'https://images.unsplash.com/photo-1618950399704-86fb060cd003?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', city: 'Monterrey' },
                { img: 'https://images.unsplash.com/photo-1565670105658-ea35d27f7de7?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', city: 'Guadalajara' }
              ].map((location, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,  
                    damping: 18,
                    mass: 0.5
                  }}
                  className="relative h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${location.img}')` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent" />
                  <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white mb-1" />
                    <p className="text-white text-base sm:text-lg font-semibold">{location.city}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <AnimatedSection>
              <div className="rounded-2xl p-6 sm:p-8 lg:p-10">
                <h4 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-black">Socios Estratégicos</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
                  <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-4 sm:mb-5">
                      <Plane className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
                      <h5 className="text-lg sm:text-xl font-bold text-black">Aerolíneas Partners</h5>
                    </div>
                    <div className="space-y-2 sm:space-y-2.5">
                      {['Aeroméxico', 'Air Canada', 'American Airlines', 'Viva Aerobus', 'Volaris'].map((airline, i) => (
                        <div key={i} className="flex items-center gap-2 sm:gap-3">
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 shrink-0" />
                          <span className="text-gray-700 font-light text-sm sm:text-base">{airline}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white p-6 sm:p-8 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3 mb-4 sm:mb-5">
                      <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-red-600" />
                      <h5 className="text-lg sm:text-xl font-bold text-black">Ubicaciones Principales</h5>
                    </div>
                    <div className="space-y-2 sm:space-y-2.5">
                      {['Aeropuerto CDMX', 'Aeropuerto Monterrey', 'Aeropuerto Guadalajara', 'Duty Free Stores', 'Lounges VIP'].map((location, i) => (
                        <div key={i} className="flex items-center gap-2 sm:gap-3">
                          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600 shrink-0" />
                          <span className="text-gray-700 font-light text-sm sm:text-base">{location}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">Implementación</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                  {[
                    { title: 'LUNNA Rest Point', desc: 'Stands y módulos de descanso en salas de espera principales' },
                    { title: 'Kits de Vuelo', desc: 'LUNNA Travel Champion en clase ejecutiva y disponible en duty free' },
                    { title: 'Edición Limitada', desc: 'World Cup Travel Set exclusivo en lounges VIP' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,  
                        damping: 18,
                        mass: 0.5
                      }}
                      className="bg-white p-5 sm:p-6 border-b-2 border-red-500"
                    >
                      <h5 className="text-base sm:text-lg font-semibold mb-2 text-black">{item.title}</h5>
                      <p className="text-gray-600 text-sm font-light leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        id="reserva"
        className="h-[75vh] text-white inset-0 bg-[url('https://images.unsplash.com/photo-1434648957308-5e6a859697e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"
      >
        <div className="w-full h-full mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center bg-black/70">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 px-4">
            Descansa como campeón
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-10 font-light px-4">
            Únete a la experiencia LUUNA en el Mundial 2026
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4 w-full max-w-md sm:max-w-none">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 rounded-full text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
              Reserva tu experiencia
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-full text-base sm:text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all">
              Conocer más
            </button>
          </div>

          <div className="flex justify-center gap-2 sm:gap-3">
            <div className="w-16 sm:w-20 lg:w-24 h-1.5 sm:h-2 bg-green-600 rounded-full" />
            <div className="w-16 sm:w-20 lg:w-24 h-1.5 sm:h-2 bg-white rounded-full" />
            <div className="w-16 sm:w-20 lg:w-24 h-1.5 sm:h-2 bg-red-600 rounded-full" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <div className="text-2xl sm:text-3xl font-extralight mb-8 sm:mb-12">
              LUUNA × FIFA 2026
            </div>
          </div>
          <div className="flex justify-center gap-2 sm:gap-3">
            <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-green-600 rounded-full" />
            <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-white rounded-full" />
            <div className="w-12 sm:w-16 h-1 sm:h-1.5 bg-red-600 rounded-full" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;