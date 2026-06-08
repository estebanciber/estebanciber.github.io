import { images, type ImageKey } from './images';
import type { ImageMetadata } from 'astro';

export interface Photo {
  key: ImageKey;
  src: ImageMetadata;
  alt: string;
  caption: string;
  meta: string;
}

export interface DesignPiece {
  key: ImageKey;
  src: ImageMetadata;
  alt: string;
  title: string;
  context: string;
}

const photo = (key: ImageKey, alt: string, caption: string, meta: string): Photo => ({
  key,
  src: images[key],
  alt,
  caption,
  meta,
});

export const profile = {
  name: 'María José Arévalo',
  first: 'María José',
  last: 'Arévalo',
  role: 'Multimedia y Producción Audiovisual',
  school: 'Universidad de las Américas (UDLA)',
  city: 'Quito, Ecuador',
  year: '2025',
  tagline: 'Diseño, fotografía y audiovisual',
  intro:
    'Estudiante de Multimedia y Producción Audiovisual en la UDLA. Construyo identidad visual para redes, retrato y fotografía nocturna, y piezas de video.',
  bioLead:
    'Trabajo donde se cruzan el diseño y la imagen: composición, color y ritmo, lo mismo en una pieza para Instagram que en la luz de una toma nocturna.',
  bioBody:
    'Formé parte del equipo de diseño de la Asociación de Estudiantes de la UDLA (ASE UDLA), creando campañas para fechas y causas. En paralelo fotografío retrato, espacios y la ciudad de noche, y produzco video.',
  disciplines: ['Diseño para redes', 'Retrato', 'Fotografía nocturna', 'Edición de video'],
  stats: [
    { value: 'UDLA', label: 'Multimedia y Producción Audiovisual' },
    { value: 'ASE', label: 'Equipo de diseño · campañas' },
    { value: 'Quito', label: 'Base y locación' },
    { value: 'Canon', label: 'Retrato y nocturna' },
  ],
} as const;

export const contact = {
  email: 'majito.are10@gmail.com',
  phone: '+593 95 883 9084',
  phoneHref: '+593958839084',
  location: 'Quito, Ecuador',
  instagram: '@asudlaec',
} as const;

export const video = {
  id: '1ljFXTaCToM',
  url: 'https://youtube.com/shorts/1ljFXTaCToM?si=8To2MSFfOdh8RFiD',
  embed: 'https://www.youtube.com/embed/1ljFXTaCToM',
  title: 'Trabajo audiovisual de María José Arévalo',
  blurb: 'Grabación, montaje y ritmo. Algunos de mis trabajos en video, contados en formato corto.',
} as const;

export const designPieces: DesignPiece[] = [
  {
    key: 'designQuito',
    src: images.designQuito,
    alt: 'Pieza gráfica «Viva Quito» por las Fiestas de la ciudad',
    title: 'Fiestas de Quito',
    context: 'Campaña conmemorativa',
  },
  {
    key: 'designDonacion',
    src: images.designDonacion,
    alt: 'Pieza gráfica de campaña de donación navideña',
    title: 'Campaña de donación',
    context: 'Navidad solidaria',
  },
  {
    key: 'designMujer',
    src: images.designMujer,
    alt: 'Pieza por el Día de la Mujer con retratos y las palabras única, fuerte, invencible',
    title: 'Día de la Mujer',
    context: 'Única · Fuerte · Invencible',
  },
];

export const designProfile: DesignPiece = {
  key: 'designInstagram',
  src: images.designInstagram,
  alt: 'Captura del perfil de Instagram de la Asociación de Estudiantes de la UDLA',
  title: '@asudlaec',
  context: 'Asociación de Estudiantes UDLA',
};

export const photography: Record<'retrato' | 'nocturna' | 'espacios', Photo[]> = {
  retrato: [
    photo('portraitHero', 'Retrato con gafas de sol y blusa terracota enmarcada en una ventana', 'Terracota', 'Ventana · luz natural'),
    photo('portraitMetro1', 'Retrato en el andén de una estación de metro de Quito', 'Andén', 'Estación · Quito'),
    photo('portraitMetro2', 'Retrato en estación de metro con reflejos y vidrios', 'Reflejos', 'Estación · vidrios'),
  ],
  nocturna: [
    photo('nightPanecillo', 'La Virgen del Panecillo iluminada de noche sobre Quito', 'Virgen del Panecillo', 'Quito de noche'),
    photo('nightPlaza', 'Plaza del centro histórico de Quito de noche frente a un edificio colonial blanco', 'Centro histórico', 'Plaza colonial'),
    photo('nightFountain', 'Fuente y flores en una plaza de Quito iluminada de noche', 'Fuente', 'Plaza · flores'),
    photo('nightBand', 'Escenario de una banda con luces moradas, batería y amplificadores', 'Escena', 'Luz neón'),
    photo('nightRedbar', 'Interior de un bar con iluminación roja y letreros de neón', 'Bar rojo', 'Neón · interior'),
    photo('nightRooftop', 'Cóctel en un rooftop con las luces de la ciudad de fondo', 'Rooftop', 'Luces de ciudad'),
  ],
  espacios: [
    photo('spaceRooftop', 'Interior cálido de un bar rooftop en el centro histórico', 'Rooftop', 'Centro histórico'),
    photo('spaceBartender', 'Bartender preparando tragos detrás de la barra', 'Barra', 'Servicio'),
    photo('spaceCafe', 'Interior de café con arco de medio punto y personas conversando', 'Café', 'Arco · interior'),
    photo('spaceCocktail', 'Cóctel verde servido sobre una mesa por la noche', 'Mesa', 'Noche · detalle'),
    photo('nightArcade', 'Arcada colonial iluminada de una calle de Quito por la noche', 'Arcada', 'Colonial · noche'),
  ],
};

export const allPhotos: Photo[] = [
  ...photography.retrato,
  ...photography.nocturna,
  ...photography.espacios,
];

// Editorial pull-quote between sections.
export const pullQuote = {
  text: 'La luz cuenta la historia; yo solo decido dónde ponerla.',
  attribution: 'María José Arévalo',
} as const;

// Full-bleed editorial spread (a single decisive frame).
export const spread = {
  src: images.nightPanecillo,
  alt: 'La Virgen del Panecillo iluminada de noche sobre las luces de Quito',
  kicker: 'Serie · Quito de noche',
  caption: 'Quito desde el mirador, hora azul.',
} as const;
