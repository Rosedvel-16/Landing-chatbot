import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// 1. COMPONENTE PARA ANIMACIONES DE SCROLL
// ==========================================
const FadeInSection = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.unobserve(domRef.current);
      }
    }, { threshold: 0.1 }); 
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={domRef} 
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      {children}
    </div>
  );
};

// ==========================================
// 2. COMPONENTE PARA CONTADOR ANIMADO
// ==========================================
const AnimatedCounter = ({ end, prefix = "", suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={domRef}>{prefix}{count}{suffix}</span>;
};


// ==========================================
// COMPONENTE PRINCIPAL APP
// ==========================================
function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [isWebChatOpen, setIsWebChatOpen] = useState(false);

  const numeroWhatsApp = "15551853487"; 
  const mensajeDefault = "¡Hola! Quiero probar el buscador de licitaciones. Mi RUC es: ";
  const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajeDefault)}`;

  const testimonios = [
    { nombre: "Ing. Carlos Mendoza", cargo: "Gerente de Operaciones", texto: "Gracias a la asesoría en ISO 9001 y al buscador de licitaciones, logramos ganar nuestro primer contrato estatal.", avatar: "CM" },
    { nombre: "Dra. Elena Ramos", cargo: "Directora de Calidad", texto: "El curso de Auditor Líder fue excepcional. La metodología es práctica y enfocada a la realidad empresarial.", avatar: "ER" },
    { nombre: "Luis Alberto García", cargo: "Gerente General", texto: "Implementar ISO 14001 nos abrió las puertas a exportar. El chatbot de licitaciones es nuestra herramienta diaria.", avatar: "LG" }
  ];

  const faqs = [
    { q: "¿Cuánto tiempo demora el proceso de certificación ISO?", a: "El tiempo varía según el tamaño de la empresa y la norma, pero típicamente toma entre 3 a 6 meses desde el diagnóstico inicial hasta la auditoría de certificación." },
    { q: "¿Es obligatorio tener una ISO para licitar con el Estado?", a: "No es estrictamente obligatorio para participar, pero en la gran mayoría de procesos competitivos otorga puntaje adicional que es decisivo para ganar la buena pro frente a otros postores." },
    { q: "¿El chatbot de licitaciones tiene algún costo oculto?", a: "No. El buscador de licitaciones por RUC es una herramienta 100% gratuita que ofrecemos como valor agregado para la comunidad empresarial." },
    { q: "¿Mi empresa es muy pequeña para una ISO?", a: "Absolutamente no. Las normas ISO están diseñadas para adaptarse a cualquier tamaño de organización. De hecho, certificar una PYME la hace mucho más atractiva y competitiva." },
    { q: "¿Qué pasa si no tengo ningún proceso documentado actualmente?", a: "No te preocupes. Nuestro servicio de consultoría incluye el levantamiento de información y la estructuración de todos tus procesos desde cero hasta dejarlos listos para la auditoría." },
    { q: "¿En qué modalidad dictan los cursos de auditor?", a: "Ofrecemos modalidades 100% online (en vivo), clases grabadas, y también capacitaciones presenciales in-house directamente en las instalaciones de tu empresa." },
    { q: "¿Qué normas me recomiendan si soy del sector construcción?", a: "Para el sector construcción, la base ideal es la trinorma: ISO 9001 (Calidad), ISO 45001 (Seguridad y Salud Ocupacional) e ISO 14001 (Medio Ambiente). Además, la ISO 37001 (Antisoborno) es cada vez más requerida." }
  ];

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-gray-50 flex flex-col overflow-x-hidden relative">
      
      {/* ================= BARRA DE NAVEGACIÓN ================= */}
      <nav className="bg-[#0c1354] text-white p-4 md:px-12 fixed w-full top-0 z-50 shadow-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          
          <div className="flex items-center gap-2 z-50">
            <div className="relative flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="h-10 object-contain relative z-10 bg-white/10 rounded" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>

          <button className="md:hidden z-50 text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>

          <ul className="hidden md:flex gap-8 items-center text-sm font-medium">
            <li className="cursor-pointer hover:text-[#ffd600] transition-colors">Inicio</li>
            <li className="relative group py-4 cursor-pointer">
              <span className="flex items-center gap-1 hover:text-[#ffd600] transition-colors">Sectores <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></span>
              <ul className="absolute top-full left-0 bg-white text-[#0c1354] w-48 shadow-xl rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t-2 border-[#ffd600]">
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors border-b">Construcción</li>
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors border-b">Transporte</li>
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors">Textil</li>
              </ul>
            </li>
            <li className="relative group py-4 cursor-pointer">
              <span className="flex items-center gap-1 hover:text-[#ffd600] transition-colors">Servicios ISO <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></span>
              <ul className="absolute top-full -left-4 bg-white text-[#0c1354] w-56 shadow-xl rounded-b-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t-2 border-[#ffd600]">
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors border-b">Cursos de Interpretación</li>
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors border-b">Formación de Auditores</li>
                <li className="px-4 py-3 hover:bg-gray-50 transition-colors">Certificación</li>
              </ul>
            </li>
            <li className="cursor-pointer hover:text-[#ffd600] transition-colors">Contacto</li>
          </ul>

          <button onClick={() => setIsWebChatOpen(true)} className="hidden md:block bg-[#ffd600] text-[#0c1354] px-6 py-2 rounded-full font-bold hover:bg-white transition-colors shadow-md">
            Abrir Buscador Web
          </button>
        </div>

        <div className={`md:hidden absolute top-full left-0 w-full bg-[#090e3d] transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-screen border-b border-white/10' : 'max-h-0'}`}>
          <ul className="flex flex-col text-white p-4 gap-4">
            <li className="border-b border-white/10 pb-2">Inicio</li>
            <li className="border-b border-white/10 pb-2 font-bold text-[#ffd600]">Sectores</li>
            <li className="border-b border-white/10 pb-2 font-bold text-[#ffd600]">Servicios ISO</li>
            <li className="pt-2">
              <button onClick={() => {setIsWebChatOpen(true); setIsMobileMenuOpen(false);}} className="w-full bg-[#ffd600] text-[#0c1354] px-6 py-3 rounded-md font-bold">Abrir Chatbot</button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="h-16 md:h-20"></div>

      {/* ================= HERO SECTION ================= */}
      <section className="bg-[#0c1354] text-white relative pt-12 pb-32 px-6 md:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-[#0055ff] rounded-full opacity-20 blur-[100px] transform translate-x-1/4 -translate-y-1/4"></div>

        <FadeInSection>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-serif">
                Obtén tu certificación ISO para <span className="text-[#ffd600]">potenciar tu credibilidad</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 font-light border-l-4 border-[#ffd600] pl-4 italic">
                Consigue completamente gratis tu buscador de licitaciones.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button onClick={() => setIsWebChatOpen(true)} className="bg-[#ffd600] text-[#0c1354] font-bold px-8 py-4 rounded-md hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-3 text-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  Probar Web Chatbot
                </button>
              </div>
            </div>

            <div className="md:w-1/2 w-full relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#1a2b99] bg-gray-800 flex items-center justify-center min-h-[400px]">
                <img src="/hero.png" alt="Certificación ISO" className="w-full h-[400px] lg:h-[500px] object-cover relative z-10" onError={(e) => e.target.style.display='none'} />
              </div>
            </div>
          </div>
        </FadeInSection>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
            <svg relative="block" width="calc(100% + 1.3px)" height="40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path></svg>
        </div>
      </section>

      {/* ================= NORMAS ISO ================= */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto -mt-20 relative z-20 mb-16">
        <FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              {iso: 'ISO 9001', desc: 'Gestión de Calidad'}, 
              {iso: 'ISO 14001', desc: 'Gestión Ambiental'}, 
              {iso: 'ISO 37001', desc: 'Antisoborno'}, 
              {iso: 'ISO 45001', desc: 'Seguridad y Salud'}
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6 text-center border-t-4 border-[#0c1354] hover:border-[#ffd600] hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-xl md:text-2xl font-bold text-[#0c1354]">{item.iso}</h3>
                <p className="text-sm text-gray-500 mt-2 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* ================= ESTADÍSTICAS ANIMADAS ================= */}
      <section className="py-16 bg-[#0B1454] text-[#ffffff]">
        <FadeInSection>
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x-2 divide-white/20">
            <div className="p-4">
              <h3 className="text-4xl md:text-5xl font-black mb-2 text-[#ffd600]">
                <AnimatedCounter end={50} prefix="+" />
              </h3>
              <p className="font-bold text-sm uppercase tracking-wide text-gray-300">Empresas Certificadas</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl md:text-5xl font-black mb-2 text-[#ffd600]">
                <AnimatedCounter end={98} suffix="%" />
              </h3>
              <p className="font-bold text-sm uppercase tracking-wide text-gray-300">Tasa de Aprobación</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl md:text-5xl font-black mb-2 text-[#ffd600]">
                <AnimatedCounter end={10} prefix="+S/" suffix="M" />
              </h3>
              <p className="font-bold text-sm uppercase tracking-wide text-gray-300">Licitaciones Ganadas</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl md:text-5xl font-black mb-2 text-[#ffd600]">
                <AnimatedCounter end={15} />
              </h3>
              <p className="font-bold text-sm uppercase tracking-wide text-gray-300">Años de Experiencia</p>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ================= MISIÓN Y VISIÓN ================= */}
      <section className="py-16 px-6 md:px-12 bg-white">
        <FadeInSection>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-50 p-10 rounded-3xl border-l-8 border-[#0c1354] shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-3xl font-bold text-[#0c1354] mb-4">Nuestra Misión</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Empoderar a las empresas peruanas mediante la estandarización de sus procesos y la capacitación continua, permitiéndoles competir en mercados globales y ganar licitaciones estratégicas.
              </p>
            </div>
            <div className="bg-gray-50 p-10 rounded-3xl border-l-8 border-[#ffd600] shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-3xl font-bold text-[#0c1354] mb-4">Nuestra Visión</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Ser el referente número uno en consultoría ISO y gestión de licitaciones en el Perú para el 2030, reconocidos por nuestra innovación tecnológica.
              </p>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ================= SECTORES ================= */}
      <section className="py-20 px-6 md:px-12 bg-gray-50 border-t border-gray-200">
        <FadeInSection>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0c1354] mb-4 font-serif">Soluciones por sector industrial</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg group">
                <div className="h-56 bg-gray-200 overflow-hidden relative">
                  <img src="/construccion.jpg" alt="Construcción" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => e.target.style.display='none'} />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#0c1354] mb-3">Sector Construcción</h3>
                  <p className="text-gray-600 text-sm mb-4">Suma puntos vitales en tus licitaciones demostrando control de calidad y seguridad.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-lg group">
                <div className="h-56 bg-gray-200 overflow-hidden relative">
                  <img src="/transporte.jpg" alt="Transporte" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => e.target.style.display='none'} />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#0c1354] mb-3">Sector Transporte</h3>
                  <p className="text-gray-600 text-sm mb-4">Garantiza la trazabilidad, orden operativo y cumplimiento normativo antisoborno.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-lg group">
                <div className="h-56 bg-gray-200 overflow-hidden relative">
                  <img src="/textil.jpg" alt="Textil" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => e.target.style.display='none'} />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#0c1354] mb-3">Sector Textil</h3>
                  <p className="text-gray-600 text-sm mb-4">Estandariza tus procesos de manufactura y abre puertas a mercados internacionales.</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ================= TESTIMONIOS ================= */}
      <section className="py-20 px-6 md:px-12 bg-[#0c1354] text-white">
        <FadeInSection>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#ffd600] font-serif mb-4">Lo que dicen nuestros clientes</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonios.map((t, i) => (
                <div key={i} className="bg-white/5 p-8 rounded-2xl border border-white/10 relative hover:bg-white/10 transition-colors">
                  <span className="text-6xl text-[#ffd600] absolute top-4 right-8 opacity-20 italic font-serif">"</span>
                  <p className="text-lg italic mb-8 relative z-10 font-light leading-relaxed">"{t.texto}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden border-2 border-[#ffd600]">
                      <img src="/test.jpg" alt="Cliente" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                      <div className="hidden w-full h-full bg-[#0c1354] text-[#ffd600] items-center justify-center font-bold text-sm">
                        {t.avatar}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{t.nombre}</h4>
                      <p className="text-sm text-blue-200">{t.cargo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ================= PREGUNTAS FRECUENTES ================= */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <FadeInSection>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0c1354] text-center mb-12 font-serif">Preguntas Frecuentes</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300">
                  <button 
                    className="w-full text-left px-6 py-4 font-bold text-[#0c1354] bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    {faq.q}
                    <span className={`text-[#0055ff] text-2xl transition-transform ${openFaq === index ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'py-4 max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#090e3d] text-gray-300 py-12 px-6 md:px-12 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto text-center md:text-left grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <img src="/logo.png" alt="Logo" className="h-10 object-contain relative z-10 bg-white/10 rounded" onError={(e) => e.target.style.display = 'none'} />
            </div>
            <p className="text-sm text-gray-400 mb-6">Certificaciones ISO y auditorías para competir y ganar.</p>
          </div>
          <div><h4 className="text-white font-bold mb-4">Servicios</h4><ul className="text-sm space-y-2"><li>Cursos</li><li>Auditorías</li><li>Certificación</li></ul></div>
          <div><h4 className="text-white font-bold mb-4">Normas</h4><ul className="text-sm space-y-2"><li>ISO 9001</li><li>ISO 14001</li><li>ISO 37001</li><li>ISO 45001</li></ul></div>
          <div><h4 className="text-white font-bold mb-4">Contacto</h4><ul className="text-sm space-y-2"><li>soporte@elperuesclave.com</li><li>+51 999 999 999</li><li>Lima, Perú</li></ul></div>
        </div>
      </footer>

      {/* ================= BOTONES FLOTANTES Y WIDGET DE CHAT ================= */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-[100]">
        
        {/* Widget del Chat (Simulado para n8n) */}
        <div className={`transition-all duration-300 origin-bottom-right ${isWebChatOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
          <div className="w-80 h-96 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden border border-gray-200">
            {/* Header del Chat */}
            <div className="bg-[#0c1354] text-white p-4 flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#25D366] rounded-full animate-pulse"></div>
                <span className="font-bold text-sm">Buscador Licitaciones</span>
              </div>
              <button onClick={() => setIsWebChatOpen(false)} className="text-gray-300 hover:text-white font-bold">✕</button>
            </div>
            
            {/* Área de Mensajes */}
            <div className="flex-1 p-4 bg-gray-50 flex flex-col gap-3 overflow-y-auto">
              <div className="text-xs text-center text-gray-400 mb-2">Hoy</div>
              <div className="bg-[#e6f0ff] p-3 rounded-2xl rounded-tl-none self-start text-sm text-[#0c1354] max-w-[85%] border border-blue-100">
                ¡Hola! Soy tu asistente virtual conectado. 🤖 <br/><br/>
                Para encontrar las licitaciones (prod6) de esta semana que coincidan contigo, por favor <strong>ingresa tu RUC:</strong>
              </div>
            </div>

            {/* Input de Mensaje */}
            <div className="p-3 bg-white border-t border-gray-200 flex gap-2 items-center">
              <input type="text" placeholder="Escribe tu RUC aquí..." className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:border-[#0055ff] focus:ring-1 focus:ring-[#0055ff]" />
              <button className="bg-[#ffd600] text-[#0c1354] p-2 rounded-full hover:bg-[#e5c100] transition-colors">
                <svg className="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Fila de Botones */}
        <div className="flex gap-4 items-center">
          
          <button 
            onClick={() => setIsWebChatOpen(!isWebChatOpen)}
            className="bg-[#0c1354] text-[#ffd600] p-4 rounded-full shadow-[0_4px_14px_0_rgba(12,19,84,0.39)] hover:scale-110 transition-all duration-300 flex items-center justify-center group relative"
            aria-label="Abrir Buscador Web"
          >
            <span className="absolute right-full mr-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Chat Web
            </span>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          </button>

          <a
            href={linkWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] hover:scale-110 transition-all duration-300 flex items-center justify-center group relative"
            aria-label="Contactar por WhatsApp"
          >
            <span className="absolute right-full mr-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              WhatsApp
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
            </svg>
          </a>
        </div>
      </div>

    </div>
  );
}

export default App;