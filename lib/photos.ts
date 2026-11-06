export type PhotoSlot = {
  src: string;
  fallback: string;
  alt: string;
};

const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const landingPhotos: PhotoSlot[] = [
  {
    src: "/photos/landing/01.jpg",
    fallback: unsplash("photo-1519741497674-611481863552"),
    alt: "Landing photo 1",
  },
  {
    src: "/photos/landing/02.jpg",
    fallback: unsplash("photo-1511285560929-80b456fe3c6f"),
    alt: "Landing photo 2",
  },
  {
    src: "/photos/landing/03.jpg",
    fallback: unsplash("photo-1465495976277-4387d4b0b4c6"),
    alt: "Landing photo 3",
  },
  {
    src: "/photos/landing/04.jpg",
    fallback: unsplash("photo-1522673607200-164d1b6ce486"),
    alt: "Landing photo 4",
  },
];

export const homePhotos = {
  hero: {
    src: "/photos/home/hero/portrait.jpg",
    fallback: unsplash("photo-1583939003579-730e3918a45a"),
    alt: "Imran and Janet",
  },
  coupleGroom: {
    src: "/photos/couple/groom/portrait.jpg",
    fallback: unsplash("photo-1591604466107-ec97de577aff"),
    alt: "The Groom",
  },
  coupleBride: {
    src: "/photos/couple/bride/portrait.jpg",
    fallback: unsplash("photo-1591604021695-0c69d7c27371", 900),
    alt: "The Bride",
  },
  ceremony: {
    src: "/photos/events/ceremony/cover.jpg",
    fallback: unsplash("photo-1519225421980-715cb0215aed"),
    alt: "Ceremony",
  },
  reception: {
    src: "/photos/events/reception/cover.jpg",
    fallback: unsplash("photo-1464366400600-7168b8af9bc3"),
    alt: "Reception",
  },
};

export const prenupStill: PhotoSlot = {
  src: "/photos/prenup/cover.jpg",
  fallback: unsplash("photo-1522673607200-164d1b6ce486"),
  alt: "Prenup",
};

export const galleryPhotos: PhotoSlot[] = [
  { src: "/photos/gallery/01.jpg", fallback: unsplash("photo-1519741497674-611481863552"), alt: "Gallery 1" },
  { src: "/photos/gallery/02.jpg", fallback: unsplash("photo-1520854221256-17451cc331bf"), alt: "Gallery 2" },
  { src: "/photos/gallery/03.jpg", fallback: unsplash("photo-1522673607200-164d1b6ce486"), alt: "Gallery 3" },
  { src: "/photos/gallery/04.jpg", fallback: unsplash("photo-1519225421980-715cb0215aed"), alt: "Gallery 4" },
  { src: "/photos/gallery/05.jpg", fallback: unsplash("photo-1464366400600-7168b8af9bc3"), alt: "Gallery 5" },
  { src: "/photos/gallery/06.jpg", fallback: unsplash("photo-1465495976277-4387d4b0b4c6"), alt: "Gallery 6" },
  { src: "/photos/gallery/07.jpg", fallback: unsplash("photo-1529636798458-92182e662485"), alt: "Gallery 7" },
  { src: "/photos/gallery/08.jpg", fallback: unsplash("photo-1511285560929-80b456fe3c6f"), alt: "Gallery 8" },
  { src: "/photos/gallery/09.jpg", fallback: unsplash("photo-1606800052052-a08af7148866"), alt: "Gallery 9" },
];
