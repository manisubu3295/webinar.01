import raw from './raw/anchorSlides.json';
import type { AnchorSlideContent } from '@/lib/types';

export const anchorSlides = raw as unknown as AnchorSlideContent[];
