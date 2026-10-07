import story from './story.json';
import narration from '../data/narration-timing.json';

export type ChapterId = keyof typeof narration;
export const cue = (id: ChapterId, beat: number) => narration[id].beats[beat]?.from ?? 12;
export const voiceTracks = (id: ChapterId) => narration[id].tracks;
export const chapters = story.map((chapter, index) => ({
  ...chapter,
  from: story
    .slice(0, index)
    .reduce((total, item) => total + narration[item.id as ChapterId].seconds * 30, 0),
  duration: narration[chapter.id as ChapterId].seconds * 30,
}));
export const filmDuration = chapters.reduce((total, chapter) => total + chapter.duration, 0);
