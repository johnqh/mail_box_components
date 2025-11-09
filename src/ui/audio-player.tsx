import React, { useRef, useState, useEffect } from 'react';
import { cn } from '../lib/utils';

export interface AudioPlayerProps {
  /** Audio source URL */
  src: string;
  /** Track title */
  title?: string;
  /** Artist name */
  artist?: string;
  /** Album artwork URL */
  artwork?: string;
  /** Auto play */
  autoPlay?: boolean;
  /** Loop playback */
  loop?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * AudioPlayer Component
 *
 * Audio player with playback controls and progress bar.
 * Displays track info and artwork.
 *
 * @example
 * ```tsx
 * <AudioPlayer
 *   src="/audio/track.mp3"
 *   title="My Song"
 *   artist="Artist Name"
 *   artwork="/images/album.jpg"
 * />
 * ```
 */
export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  src,
  title,
  artist,
  artwork,
  autoPlay = false,
  loop = false,
  className,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={cn('bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg', className)}>
      <audio ref={audioRef} src={src} autoPlay={autoPlay} loop={loop} />

      <div className="flex items-center gap-4 mb-4">
        {/* Artwork */}
        {artwork && (
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
            <img src={artwork} alt={title || 'Album artwork'} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Track info */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-semibold text-gray-900 dark:text-white truncate">
              {title}
            </h4>
          )}
          {artist && (
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {artist}
            </p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24 accent-blue-500"
            />
          </div>
        </div>

        {/* Progress percentage */}
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {progress.toFixed(0)}%
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;
