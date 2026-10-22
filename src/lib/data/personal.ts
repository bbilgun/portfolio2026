/**
 * Copy for the personal page. English only on purpose: this side isn't
 * translated, so it lives here rather than in the i18n dictionary.
 */

export const about = [
  "hey, it’s bilguun.",
  "this is me off the clock: games, anime, music, guitar and a bit of wool felting.",
];

export const mood = "chill · tired, but down for anything";

export type Hobby = {
  title: string;
  body: string;
  /** Photo under /public/personal, linked as [photo] beside the title. */
  photo?: string;
};

export const hobbies: Hobby[] = [
  {
    title: "gaming",
    body: "dota 2 and cs2 when i want to compete, minecraft and terraria when i want to chill. sometimes solo, sometimes with friends.",
  },
  {
    title: "anime",
    body: "shōnen all the way: jujutsu kaisen, one piece, naruto and attack on titan.",
  },
  {
    title: "music",
    body: "i listen to a bit of everything, from tv girl and jeff buckley to lil peep, and mongolian bands like the lemons and parking pale.",
  },
  {
    title: "guitar",
    body: "a couple of years on acoustic guitar, mostly covering songs i can’t stop listening to.",
  },
  {
    title: "wool felting",
    body: "saw needle felting online, tried it, and now there are little wool animals and figures everywhere.",
  },
];

export type Song = {
  title: string;
  artist: string;
  /** Spotify track ID when known; otherwise the record links to a Spotify search. */
  spotify?: string;
};

/** The record crate, first one on the turntable. Mongolian picks to come. */
export const records: Song[] = [
  { title: "Lovers Rock", artist: "TV Girl", spotify: "6dBUzqjtbnIa1TwYbyw5CM" },
  { title: "Star Shopping", artist: "Lil Peep" },
  { title: "Ode to the Mets", artist: "The Strokes" },
  { title: "Bam Bam", artist: "The Colors" },
  { title: "Summer’s Gone", artist: "Honeydip" },
  { title: "Cigarettes out the Window", artist: "TV Girl" },
  { title: "Billie Jean", artist: "Michael Jackson" },
];

export function spotifyUrl(song: Song) {
  return song.spotify
    ? `https://open.spotify.com/track/${song.spotify}`
    : `https://open.spotify.com/search/${encodeURIComponent(`${song.title} ${song.artist}`)}`;
}

export const currently = [
  { label: "playing", value: "dota 2, cs2" },
  { label: "watching", value: "jujutsu kaisen" },
  { label: "listening", value: "tv girl — lovers rock", song: true },
  { label: "making", value: "little wool animals" },
];
