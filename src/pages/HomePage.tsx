import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ArrowRight, Star, Award, Plane, Hotel, Package, MapPin, CheckCircle, Sparkles } from 'lucide-react';
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

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-2xl font-bold tracking-tight"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className={`transition-colors duration-300 ${
                scrolled ? 'text-black' : 'text-white'
              }`}>Luuna</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('inicio')}
                className={`font-light transition-colors ${
                  scrolled ? 'text-black hover:text-blue-600' : 'text-white hover:text-blue-300'
                }`}
              >
                Inicio
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('experiencias')}
                className={`font-light transition-colors ${
                  scrolled ? 'text-black hover:text-blue-600' : 'text-white hover:text-blue-300'
                }`}
              >
                Experiencias
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('reserva')}
                className={`px-6 py-2 rounded-full transition-all ${
                  scrolled 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                Reserva
              </motion.button>
            </div>

            <button 
              className="md:hidden"
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
              className="md:hidden mt-4 pb-4 flex flex-col gap-4"
            >
              <button onClick={() => scrollToSection('inicio')} className="text-left text-black hover:text-blue-600">
                Inicio
              </button>
              <button onClick={() => scrollToSection('experiencias')} className="text-left text-black hover:text-blue-600">
                Experiencias
              </button>
              <button onClick={() => scrollToSection('reserva')} className="text-left bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
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
            className="absolute inset-0 bg-[url('./images/hero-mundial.jpg')] bg-cover bg-center" 
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex items-center justify-center gap-12 mb-12"
          >
            <motion.div 
              variants={fadeInScale}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-40 h-40 flex items-center justify-center"
            >
              <img src="./images/logo_mundial.webp" alt="logo-mundial" />
            </motion.div>
            <motion.div 
              variants={fadeInScale}
              className="text-6xl font-bold text-white"
            >
              <X className='w-8 h-8'/>
            </motion.div>
            <motion.div 
              variants={fadeInScale}
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-40 h-40 rounded-full flex items-center justify-center invert"
            >
             <img src="./images/logo_luuna.webp" alt="logo-luuna" />
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Mundial 2026
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 font-light"
          >
            Descansa como un campeón
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex justify-center gap-3 mb-12"
          >
            <div 
              className="w-24 h-2 bg-green-600 rounded-full" 
            />
            <div 
              className="w-24 h-2 bg-white rounded-full" 
            />
            <div 
              className="w-24 h-2 bg-red-600 rounded-full" 
            />
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
            <ChevronDown className="w-8 h-8 text-white" />
          </motion.button>
        </div>
      </section>

      {/* Experiencias Section */}
      <section id="experiencias" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-6xl font-bold text-center mb-6 text-black">
              Experiencias LUUNA
            </h2>
            <p className="text-center text-gray-600 mb-32 text-xl font-light">
              Confort de clase mundial para el Mundial 2026
            </p>
          </AnimatedSection>

          {/* HOTELES SECTION */}
          <div className="mb-40">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-12">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Hotel className="w-12 h-12 text-green-600" />
                </motion.div>
                <h3 className="text-5xl font-bold text-black">Alianza con Hoteles</h3>
              </div>
            </AnimatedSection>

            {/* Hotel Images Gallery */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8 mb-12"
            >
              <motion.div 
                variants={slideInLeft}
                className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1630999295881-e00725e1de45?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-8 left-8"
                >
                  <div className="w-16 h-1 bg-green-600 mb-3" />
                  <p className="text-white text-2xl font-light">Habitaciones Premium</p>
                </motion.div>
              </motion.div>
              <motion.div 
                variants={slideInRight}
                className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-8 left-8"
                >
                  <div className="w-16 h-1 bg-green-600 mb-3" />
                  <p className="text-white text-2xl font-light">Comodidad Luuna</p>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              {[
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
                'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
                'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800'
              ].map((img, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  className="relative h-72 rounded-3xl overflow-hidden group cursor-pointer"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url('${img}')` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                </motion.div>
              ))}
            </motion.div>

            <AnimatedSection>
              <motion.div 
                className="bg-linear-to-br from-green-50 to-white rounded-3xl p-12"
              >
                <div className="flex items-center gap-3 mb-8">
                  <h4 className="text-3xl font-bold text-black">Beneficios de la Alianza</h4>
                </div>
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid md:grid-cols-2 gap-8"
                >
                  {[
                    { icon: Package, title: 'Almohadas sin costo', desc: 'Entrega de almohadas LUUNA premium para uso en todas las habitaciones del hotel' },
                    { icon: Award, title: 'Branding exclusivo', desc: 'Carteles y tarjetones con lemas oficiales del Mundial 2026' },
                    { icon: Sparkles, title: 'Colaboración digital', desc: 'Mención en web y redes sociales del hotel destacando la alianza' },
                    { icon: Star, title: 'Experiencia premium', desc: 'Eleva la calidad de descanso de tus huéspedes durante el Mundial' }
                  ].map((benefit, i) => (
                    <motion.div 
                      key={i}
                      variants={fadeInUp}
                     
                      className="flex gap-4"
                    >
                      <motion.div
                        transition={{ duration: 0.5 }}
                      >
                        <benefit.icon className="w-6 h-6 text-green-600 mt-1 shrink-0" />
                      </motion.div>
                      <div>
                        <h5 className="text-xl font-semibold mb-2 text-black">{benefit.title}</h5>
                        <p className="text-gray-700 font-light">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* ALMOHADA DE VIAJE SECTION */}
          <div className="mb-40">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-12">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Star className="w-12 h-12 text-blue-600" />
                </motion.div>
                <h3 className="text-5xl font-bold text-black">Almohada de Viaje Ergonómica</h3>
              </div>
            </AnimatedSection>

            {/* Product Images Gallery */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8 mb-12"
            >
              <motion.div 
                variants={fadeInScale}
                className="relative h-96 rounded-3xl overflow-hidden group md:col-span-2 cursor-pointer"
              >
                <div className="absolute inset-0 bg-[url('./images/almo-1.png')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-8 left-8"
                >
                  <div className="w-16 h-1 bg-blue-600 mb-3" />
                  <p className="text-white text-3xl font-bold">LUUNA Travel Champion</p>
                  <p className="text-gray-200 text-lg font-light mt-2">Edición Mundial 2026</p>
                </motion.div>
              </motion.div>
              <motion.div 
                variants={fadeInScale}
                className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-[url('./images/almo-2.png')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              </motion.div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-4 gap-6 mb-12"
            >
              {[
                { img: 'https://images.unsplash.com/photo-1672017088948-9a26a16dd39e?q=80&w=1358&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Compacto' },
                { img: 'https://images.unsplash.com/photo-1691256676366-370303d55b61?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Ergonómico' },
                { img: 'https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Premium' },
                { img: 'https://images.unsplash.com/photo-1668417863230-64f268d1d252?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', label: 'Lavable' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url('${item.img}')` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-blue-600/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-semibold">{item.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <AnimatedSection>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-linear-to-br from-blue-50 to-white rounded-3xl p-12"
              >
                <div className="flex items-center gap-3 mb-8">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                  <h4 className="text-3xl font-bold text-black">Características del Producto</h4>
                </div>
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid md:grid-cols-3 gap-8 mb-12"
                >
                  {[
                    { emoji: '💤', title: 'Espuma Viscoelástica', desc: 'Memoria premium que se adapta a tu cuello' },
                    { emoji: '🧼', title: 'Funda Desmontable', desc: 'Lavable, de poliéster o bambú' },
                    { emoji: '🎒', title: 'Bolsa de Transporte', desc: 'Diseño compacto y portátil' }
                  ].map((feature, i) => (
                    <motion.div 
                      key={i}
                      variants={fadeInScale}
                      whileHover={{ y: -10 }}
                      className="text-center"
                    >
                      <motion.div 
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                        className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <span className="text-3xl">{feature.emoji}</span>
                      </motion.div>
                      <h5 className="text-xl font-semibold mb-2 text-black">{feature.title}</h5>
                      <p className="text-gray-700 font-light">{feature.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>

                <h4 className="text-3xl font-bold mb-8 text-black">Proceso de Desarrollo</h4>
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="space-y-4"
                >
                  {[
                    { etapa: 'Investigación y diseño', desc: 'Materiales, ergonomía, inspiración en marcas líderes' },
                    { etapa: 'Prototipos y pruebas', desc: '2-3 versiones testeadas con viajeros frecuentes' },
                    { etapa: 'Certificación NOM', desc: 'Registro de producto y empaque travel bag' },
                    { etapa: 'Producción piloto', desc: '500-1,000 unidades con proveedores seleccionados' },
                    { etapa: 'Lanzamiento comercial', desc: 'E-commerce y colaboraciones con aerolíneas' }
                  ].map((step, i) => (
                    <motion.div 
                      key={i}
                      variants={slideInLeft}
                      whileHover={{ x: 10, scale: 1.02 }}
                      className="flex items-start gap-4 bg-white p-6 rounded-2xl cursor-pointer"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shrink-0"
                      >
                        {i + 1}
                      </motion.div>
                      <div>
                        <h5 className="text-xl font-semibold text-black mb-1">{step.etapa}</h5>
                        <p className="text-gray-700 font-light">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* AEROPUERTOS SECTION */}
          <div className="mb-32">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-12">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Plane className="w-12 h-12 text-red-600" />
                </motion.div>
                <h3 className="text-5xl font-bold text-black">Aeropuertos y Aerolíneas</h3>
              </div>
            </AnimatedSection>

            {/* Airport Images Gallery */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-8 mb-12"
            >
              <motion.div 
                variants={slideInLeft}
                whileHover={{ scale: 1.02 }}
                className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-8 left-8"
                >
                  <div className="w-16 h-1 bg-red-600 mb-3" />
                  <p className="text-white text-2xl font-light">Lounges VIP</p>
                </motion.div>
              </motion.div>
              <motion.div 
                variants={slideInRight}
                whileHover={{ scale: 1.02 }}
                className="relative h-96 rounded-3xl overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1200')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-8 left-8"
                >
                  <div className="w-16 h-1 bg-red-600 mb-3" />
                  <p className="text-white text-2xl font-light">Rest Points</p>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              {[
                { img: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800', city: 'CDMX' },
                { img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800', city: 'Monterrey' },
                { img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800', city: 'Guadalajara' }
              ].map((location, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    style={{ backgroundImage: `url('${location.img}')` }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-red-600/70 to-transparent" />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="absolute bottom-6 left-6"
                  >
                    <MapPin className="w-6 h-6 text-white mb-2" />
                    <p className="text-white text-xl font-semibold">{location.city}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <AnimatedSection>
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-linear-to-br from-red-50 to-white rounded-3xl p-12"
              >
                <h4 className="text-3xl font-bold mb-8 text-black">Socios Estratégicos</h4>
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid md:grid-cols-2 gap-8 mb-12"
                >
                  <motion.div 
                    variants={fadeInScale}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-8 rounded-2xl shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Plane className="w-8 h-8 text-red-600" />
                      <h5 className="text-2xl font-bold text-black">Aerolíneas Partners</h5>
                    </div>
                    <div className="space-y-3">
                      {['Aeroméxico', 'Air Canada', 'American Airlines', 'Viva Aerobus', 'Volaris'].map((airline, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ x: 10 }}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-red-600" />
                          <span className="text-gray-700 font-light text-lg">{airline}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  <motion.div 
                    variants={fadeInScale}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-8 rounded-2xl shadow-lg"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="w-8 h-8 text-red-600" />
                      <h5 className="text-2xl font-bold text-black">Ubicaciones Principales</h5>
                    </div>
                    <div className="space-y-3">
                      {['Aeropuerto CDMX', 'Aeropuerto Monterrey', 'Aeropuerto Guadalajara', 'Duty Free Stores', 'Lounges VIP'].map((location, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ x: 10 }}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-red-600" />
                          <span className="text-gray-700 font-light text-lg">{location}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                <h4 className="text-3xl font-bold mb-8 text-black">Implementación</h4>
                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                  className="grid md:grid-cols-3 gap-6"
                >
                  {[
                    { emoji: '🛋️', title: 'LUNNA Rest Point', desc: 'Stands y módulos de descanso en salas de espera principales' },
                    { emoji: '✈️', title: 'Kits de Vuelo', desc: 'LUNNA Travel Champion en clase ejecutiva y disponible en duty free' },
                    { emoji: '🏆', title: 'Edición Limitada', desc: 'World Cup Travel Set exclusivo en lounges VIP' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      variants={fadeInScale}
                      whileHover={{ y: -10, scale: 1.05 }}
                      className="bg-white p-6 rounded-2xl cursor-pointer"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.3, rotate: 20 }}
                        className="text-4xl mb-4"
                      >
                        {item.emoji}
                      </motion.div>
                      <h5 className="text-xl font-semibold mb-3 text-black">{item.title}</h5>
                      <p className="text-gray-700 font-light">{item.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        id="reserva"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 bg-linear-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden"
      >
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </motion.div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl font-bold mb-6"
          >
            Descansa como campeón
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl text-blue-100 mb-12 font-light"
          >
            Únete a la experiencia LUUNA en el Mundial 2026
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white text-blue-600 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              Reserva tu experiencia
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-white text-white rounded-full text-xl font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Conocer más
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center gap-4 mt-16"
          >
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="w-32 h-3 bg-green-600 rounded-full" 
            />
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="w-32 h-3 bg-white rounded-full" 
            />
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="w-32 h-3 bg-red-600 rounded-full" 
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-black text-white py-16"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4"
            >
              LUUNA <span className="text-blue-500">× FIFA 2026</span>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 font-light text-lg"
            >
              Descansa como un campeón
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.2 }} className="w-20 h-2 bg-green-600 rounded-full" />
            <motion.div whileHover={{ scale: 1.2 }} className="w-20 h-2 bg-white rounded-full" />
            <motion.div whileHover={{ scale: 1.2 }} className="w-20 h-2 bg-red-600 rounded-full" />
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default HomePage;