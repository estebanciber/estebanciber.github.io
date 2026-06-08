// Central image manifest. Importing through `astro:assets` lets Astro emit
// optimized, responsive WebP/AVIF at build time. Every surface references these
// by key so the three art directions share one source of truth.
import type { ImageMetadata } from 'astro';

import portraitHero from '../assets/images/portrait-hero.png';
import portraitMetro1 from '../assets/images/portrait-metro-1.png';
import portraitMetro2 from '../assets/images/portrait-metro-2.png';
import designInstagram from '../assets/images/design-instagram.png';
import designQuito from '../assets/images/design-quito.png';
import designDonacion from '../assets/images/design-donacion.png';
import designMujer from '../assets/images/design-mujer.png';
import spaceRooftop from '../assets/images/space-rooftop.png';
import spaceCocktail from '../assets/images/space-cocktail.png';
import spaceBartender from '../assets/images/space-bartender.png';
import spaceCafe from '../assets/images/space-cafe.png';
import nightBand from '../assets/images/night-band.png';
import nightRedbar from '../assets/images/night-redbar.png';
import nightPlaza from '../assets/images/night-plaza.png';
import nightFountain from '../assets/images/night-fountain.png';
import nightArcade from '../assets/images/night-arcade.png';
import nightPanecillo from '../assets/images/night-panecillo.png';
import nightRooftop from '../assets/images/night-rooftop.png';
import texturePaper from '../assets/images/texture-paper.jpg';

export const images = {
  portraitHero,
  portraitMetro1,
  portraitMetro2,
  designInstagram,
  designQuito,
  designDonacion,
  designMujer,
  spaceRooftop,
  spaceCocktail,
  spaceBartender,
  spaceCafe,
  nightBand,
  nightRedbar,
  nightPlaza,
  nightFountain,
  nightArcade,
  nightPanecillo,
  nightRooftop,
  texturePaper,
} satisfies Record<string, ImageMetadata>;

export type ImageKey = keyof typeof images;
