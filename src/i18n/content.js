const content = {
  es: {
    nav: {
      sprinters: 'Sprints',
      empresas:  'Empresas',
      comunidad: 'Comunidad',
      cta:       'Iniciar sesión',
    },
    hero: {
      h1a:          'Aprende publicidad digital',
      h1b:          'Trabaja para el mundo',
      subtitle:     'Programas intensivos y prácticos para aprender publicidad digital con estándares globales.',
      ctaPrimary:   'Iniciar sesión',
      ctaSecondary: 'Reto Gratis',
    },
    mentalidad: {
      left: {
        eyebrow:        'Nuestra mentalidad',
        title:          'Queremos que el mejor talento de AdTech esté en Latinoamérica.',
        titleHighlight: 'mejor talento de AdTech',
        body:           'Somos una comunidad especializada en publicidad digital creada para formar profesionales capaces de competir en la industria global desde Latinoamérica. Creemos que el talento ya existe; nuestro propósito es acercarlo a las oportunidades, las herramientas y los estándares que hoy exige el mercado internacional.',
      },
      right: {
        heading: 'Lo que nos define.',
        concepts: [
          { word: 'Thinkers.',  desc: 'Cuestionan, analizan y entienden la industria digital por dentro.' },
          { word: 'Makers.',    desc: 'Crean, operan y entregan resultados que los clientes ven.' },
          { word: 'Sprinters.', desc: 'Crecen sin parar porque saben que el mundo los está esperando.' },
        ],
      },
      stats: [
        { title: 'Talento global',    desc: 'El mejor talento de AdTech ya está en Latinoamérica — solo necesita las condiciones correctas para brillar.' },
        { title: 'Estándares reales', desc: 'Formamos con los mismos criterios que exigen las agencias y plataformas de publicidad global.' },
        { title: 'Comunidad activa',  desc: 'Un ecosistema donde aprender y crecer juntos acelera el camino de cada profesional.' },
      ],
    },
    queHacemos: {
      eyebrow:  'Qué hacemos',
      title:    'Hay un lugar para ti.',
      subtitle: 'Elige lo que mejor se adapta a tus necesidades.',
      tabs: [
        {
          key:      'sprinters',
          label:    'Sprint',
          sublabel: 'Para estudiantes',
          title:    'En 5 semanas entrena con los estándares globales de publicidad digital.',
          programs: [
            {
              name:       'Ad Operations Sprint',
              tag:        'Nuestro primer programa',
              desc:       'En cinco semanas te formamos en Ad Operations. Aprendes las herramientas, entiendes cómo funciona la industria global y desarrollas las habilidades necesarias para iniciar una carrera en el ecosistema AdTech.',
              learnTitle: '¿Qué aprendes?',
              list:       [
                'Fundamentos de Ad Operations',
                'Plataformas y Trafficking',
                'Optimización y Reporting',
                'El día a día en agencias globales',
                'Kit para entrar al mercado laboral',
              ],
              benefitsTitle: '¿Qué logras al terminar el Sprint?',
              benefits: [
                {
                  title: 'Conocimiento de plataformas técnicas',
                  desc:  'Conoce herramientas como CM360 y DV360, utilizadas por agencias y equipos de AdTech para gestionar campañas digitales.',
                },
                {
                  title: 'Perfil listo para el mercado laboral',
                  desc:  'Obtén un CV optimizado, un portafolio profesional y preparación para entrevistas en inglés orientadas a agencias globales.',
                },
                {
                  title: 'Acceso a oportunidades globales',
                  desc:  'Forma parte de la comunidad de Sprinters y accede a recursos exclusivos, networking y vacantes compartidas por empresas y agencias internacionales.',
                },
              ],
              cta:     'Ver Ad Operations Sprint',
              ctaHref: '#registro',
              price:   'Desde 600 COP',
            },
          ],
          comingSoon: 'Próximamente: Programmatic Sprint, Social Sprint y muchos más programas para dominar el ecosistema AdTech.',
        },
        {
          key:      'adlab',
          label:    'Ad Lab',
          sublabel: 'Para empresas',
          title:    'AdTech Lab para Empresas',
          desc:     'Publicidad digital con estándares globales para todo tu equipo.',
          body:     'Diseñamos entrenamientos especializados en AdTech para agencias y empresas. Ayudamos a implementar nuevas capacidades, fortalecer equipos y actualizar conocimientos con enfoque práctico.',
          howWeWork: {
            label: 'Cómo trabajamos',
            items: [
              { title: 'Diagnóstico', desc: 'Evaluamos las necesidades y el nivel actual del equipo.' },
              { title: 'Formación',   desc: 'Programa personalizado, práctico y enfocado en resultados.' },
            ],
          },
          programs: {
            label: 'Nuestros programas',
            items: [
              { name: 'Sprint Táctico', desc: 'Domina un área de AdTech en 10 días: Ad Operations, Programmatic o Social. Aplicación práctica desde el primer día.' },
              { name: 'Bootcamp Full',  desc: 'Cinco semanas de formación profunda con clases en vivo y entregables reales.' },
              { name: 'Lab Hands On',  desc: 'Formación + acompañamiento directo dentro de las cuentas del cliente. Implementamos contigo los procesos, no solo los enseñamos.' },
            ],
          },
          ctas: [
            { label: 'Ver programas',   href: '#', variant: 'btn--purple' },
            { label: 'Agendar llamada', href: '#', variant: 'btn--lime' },
          ],
        },
        {
          key:      'comunidad',
          label:    'Comunidad',
          sublabel: 'Para todos',
          title:    'La comunidad AdTech de Latinoamérica.',
          subtitle: 'Crece y avanza más rápido junto a personas que comparten tu camino.',
          benefits: [
            { label: 'Clases gratis', desc: 'Clases grabadas abiertas para la comunidad.' },
            { label: 'Newsletter',    desc: 'Noticias sobre AdTech y plataformas.' },
            { label: 'Recursos',      desc: 'Frameworks y Roadmaps descargables.' },
            { label: 'Eventos',       desc: 'Charlas y Meetups próximamente.' },
            { label: 'Retos',         desc: 'Participa por becas para nuestros programas.' },
          ],
          cta:     'Unirme a la comunidad',
          ctaHref: '#',
        },
      ],
    },
    methodology: {
      eyebrow: 'Cómo aprendemos',
      title:   'Tres pilares para dominar la industria.',
      pillars: [
        { num: '01', title: 'Atomic Learning', description: 'Cápsulas de aprendizaje de cinco minutos. Contenido hiper especializado, sin relleno, aplicable inmediatamente.' },
        { num: '02', title: 'Peer to Peer',    description: 'Aprende de profesionales que hoy trabajan en agencias globales. Mentores activos, experiencia real.' },
        { num: '03', title: 'Sprints',         description: 'Retos prácticos para aplicar lo aprendido. Aprender haciendo.' },
      ],
    },
    ctaFinal: {
      title:        'Transformamos talento de Latinoamérica en líderes digitales globales.',
      ctaPrimary:   'Iniciar sesión',
      ctaSecondary: 'Reto Gratis',
    },
    footer: {
      tagline:   'Thinkers. Makers. Sprinters.',
      desc:      'Formamos el talento de AdTech que Latinoamérica necesita para competir en la industria global.',
      cta:       'Comenzar ahora',
      copyright: '© 2026 Sprintech Academy. Cali, Colombia.',
      nav: {
        title: 'Navegación',
        links: [
          { label: 'Sprinters',  href: '#' },
          { label: 'Empresas',   href: '#' },
          { label: 'Comunidad',  href: '#' },
        ],
      },
    },
  },

  en: {
    nav: {
      sprinters: 'Sprints',
      empresas:  'Companies',
      comunidad: 'Community',
      cta:       'Log in',
    },
    hero: {
      h1a:          'Learn digital advertising',
      h1b:          'Work for the world',
      subtitle:     'Intensive, hands-on programs to learn digital advertising to global standards.',
      ctaPrimary:   'Log in',
      ctaSecondary: 'Free Challenge',
    },
    mentalidad: {
      left: {
        eyebrow:        'Our mindset',
        title:          'We want the best AdTech talent to come from Latin America.',
        titleHighlight: 'best AdTech talent',
        body:           'We are a specialized digital advertising community built to train professionals who can compete in the global industry from Latin America. We believe the talent already exists; our purpose is to connect it with the opportunities, tools and standards the international market demands today.',
      },
      right: {
        heading: 'What defines us.',
        concepts: [
          { word: 'Thinkers.',  desc: 'They question, analyze and understand the digital industry from the inside.' },
          { word: 'Makers.',    desc: 'They create, operate and deliver results that clients can see.' },
          { word: 'Sprinters.', desc: 'They never stop growing because they know the world is waiting for them.' },
        ],
      },
      stats: [
        { title: 'Global talent',    desc: 'The best AdTech talent already exists in Latin America — it just needs the right conditions to thrive.' },
        { title: 'Real standards',   desc: 'We train to the same criteria demanded by global advertising agencies and platforms.' },
        { title: 'Active community', desc: "An ecosystem where learning and growing together accelerates every professional's path." },
      ],
    },
    queHacemos: {
      eyebrow:  'What we do',
      title:    'There is a place for you.',
      subtitle: 'Choose what best fits your needs.',
      tabs: [
        {
          key:      'sprinters',
          label:    'Sprint',
          sublabel: 'For students',
          title:    'In 5 weeks, train to global digital advertising standards.',
          programs: [
            {
              name:       'Ad Operations Sprint',
              tag:        'Our first program',
              desc:       'In five weeks we train you in Ad Operations. You learn the tools, understand how the global industry works, and build the skills you need to start a career in the AdTech ecosystem.',
              learnTitle: 'What do you learn?',
              list:       [
                'Ad Operations fundamentals',
                'Platforms & Trafficking',
                'Optimization & Reporting',
                'Day-to-day at global agencies',
                'Kit to enter the job market',
              ],
              benefitsTitle: 'What do you achieve after the Sprint?',
              benefits: [
                {
                  title: 'Technical platform knowledge',
                  desc:  'Learn tools like CM360 and DV360, used by agencies and AdTech teams to manage digital campaigns.',
                },
                {
                  title: 'Job-market-ready profile',
                  desc:  'Get an optimized CV, a professional portfolio, and preparation for English interviews targeting global agencies.',
                },
                {
                  title: 'Access to global opportunities',
                  desc:  'Join the Sprinters community and access exclusive resources, networking, and vacancies shared by international companies and agencies.',
                },
              ],
              cta:     'View Ad Operations Sprint',
              ctaHref: '#registro',
              price:   'From 600 COP',
            },
          ],
          comingSoon: 'Coming soon: Programmatic Sprint, Social Sprint and many more programs to master the AdTech ecosystem.',
        },
        {
          key:      'adlab',
          label:    'Ad Lab',
          sublabel: 'For companies',
          title:    'AdTech Lab for Companies',
          desc:     'Digital advertising at global standards for your entire team.',
          body:     'We design specialized AdTech training for agencies and companies. We help implement new capabilities, strengthen teams and update knowledge with a practical focus.',
          howWeWork: {
            label: 'How we work',
            items: [
              { title: 'Diagnosis', desc: "We assess your team's current needs and level." },
              { title: 'Training',  desc: 'Personalized program, practical and results-focused.' },
            ],
          },
          programs: {
            label: 'Our programs',
            items: [
              { name: 'Tactical Sprint', desc: 'Master an area of AdTech in 10 days: Ad Operations, Programmatic or Social. Practical application from day one.' },
              { name: 'Full Bootcamp',   desc: 'Five weeks of in-depth training with live classes and real deliverables.' },
              { name: 'Hands On Lab',   desc: "Training + direct support within the client's accounts. We implement processes with you, not just teach them." },
            ],
          },
          ctas: [
            { label: 'View programs',   href: '#', variant: 'btn--purple' },
            { label: 'Schedule a call', href: '#', variant: 'btn--lime' },
          ],
        },
        {
          key:      'comunidad',
          label:    'Community',
          sublabel: 'For everyone',
          title:    'The AdTech community of Latin America.',
          subtitle: 'Grow and advance faster alongside people who share your path.',
          benefits: [
            { label: 'Free classes', desc: 'Recorded classes open to the community.' },
            { label: 'Newsletter',   desc: 'News about AdTech and platforms.' },
            { label: 'Resources',    desc: 'Downloadable frameworks and roadmaps.' },
            { label: 'Events',       desc: 'Talks and meetups coming soon.' },
            { label: 'Challenges',   desc: 'Compete for scholarships to our programs.' },
          ],
          cta:     'Join the community',
          ctaHref: '#',
        },
      ],
    },
    methodology: {
      eyebrow: 'How we learn',
      title:   'Three pillars to master the industry.',
      pillars: [
        { num: '01', title: 'Atomic Learning', description: 'Five-minute learning capsules. Hyper-specialized content, no filler, immediately applicable.' },
        { num: '02', title: 'Peer to Peer',    description: 'Learn from professionals working at global agencies today. Active mentors, real experience.' },
        { num: '03', title: 'Sprints',         description: 'Practical challenges to apply what you learned. Learning by doing.' },
      ],
    },
    ctaFinal: {
      title:        'We transform Latin American talent into global digital leaders.',
      ctaPrimary:   'Log in',
      ctaSecondary: 'Free Challenge',
    },
    footer: {
      tagline:   'Thinkers. Makers. Sprinters.',
      desc:      'We train the AdTech talent that Latin America needs to compete in the global industry.',
      cta:       'Get started',
      copyright: '© 2026 Sprintech Academy. Cali, Colombia.',
      nav: {
        title: 'Navigation',
        links: [
          { label: 'Sprinters',  href: '#' },
          { label: 'Companies',  href: '#' },
          { label: 'Community',  href: '#' },
        ],
      },
    },
  },
};

export default content;
