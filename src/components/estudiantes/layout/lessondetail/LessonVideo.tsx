import { useEffect, useRef, useState } from 'react';

import Player from 'next-video/player';

import '~/styles/videoloading.css';

interface VideoPlayerProps {
  videoKey: string;
  onVideoEnd: () => void;
  onProgressUpdate: (progress: number) => void;
  isVideoCompleted: boolean;
  isLocked?: boolean;
  // Nuevo prop para sincronizar transcripción
  onTimeUpdate?: (currentTime: number) => void;
  startAt?: number; // <-- NUEVO: segundos para iniciar el video
}

// Lista de videos que deben usar el reproductor nativo
const FORCE_NATIVE_PLAYER_VIDEOS = [
  'richard-1-1744669875805-fa3b69ce-7ac6-40be-b3e1-f843f27451f0.mp4',
  'gesti-n-de-recursos-humanos-y-financieros-1744843970531-d6439703-8170-464f-8604-35883bf45b62.mp4',
];

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoKey,
  onVideoEnd,
  onProgressUpdate,
  isVideoCompleted,
  isLocked = false,
  onTimeUpdate,
  startAt = 0, // <-- NUEVO
}) => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [useNativePlayer, setUseNativePlayer] = useState(false);
  const [playerError, setPlayerError] = useState<string | null>(null);
  // Usa el tipo correcto para el ref de Player
  const playerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoKey || videoKey === 'null' || isLocked) {
      setIsLoading(false);
      return;
    }

    // Forzar reproductor nativo solo si el videoKey termina exactamente con alguno de la lista
    const shouldUseNative = FORCE_NATIVE_PLAYER_VIDEOS.some((v) =>
      videoKey.endsWith(v)
    );
    setUseNativePlayer(shouldUseNative);
    setPlayerError(
      shouldUseNative
        ? 'Usando reproductor nativo para mejor compatibilidad'
        : null
    );

    setVideoUrl(`${process.env.NEXT_PUBLIC_AWS_S3_URL}/${videoKey}`);
    setIsLoading(false);
  }, [videoKey, isLocked]);

  // NUEVO: Saltar al tiempo guardado al cargar el video (nativo y next-video)
  useEffect(() => {
    if (!videoUrl || isLocked) return;
    // Para el reproductor nativo
    if (useNativePlayer && playerRef.current && startAt > 0) {
      const video = playerRef.current;
      const seek = () => {
        if (Math.abs(video.currentTime - startAt) > 1) {
          video.currentTime = startAt;
        }
      };
      video.addEventListener('loadedmetadata', seek, { once: true });
      return () => video.removeEventListener('loadedmetadata', seek);
    }
  }, [videoUrl, useNativePlayer, startAt, isLocked]);

  const handlePlayerError = (error?: unknown) => {
    console.warn(
      'Next-video player failed, falling back to native player:',
      error
    );
    setPlayerError('Error loading video player');
    setUseNativePlayer(true);
  };

  const renderLoadingState = () => (
    <div className="absolute inset-0 z-50 flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#3498db] to-[#2ecc71] shadow-lg" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.1)1px,transparent_1px),linear-gradient(rgba(255,255,255,0.1)1px,transparent_1px)] bg-[length:20px_20px] opacity-50" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6 text-center">
        {!videoKey || videoKey === 'null' || videoKey === 'none' || isLocked ? (
          <>
            <h2 className="animate-pulse text-4xl font-bold tracking-tight text-white">
              Video de la Clase
            </h2>
            <p className="text-5xl font-extrabold">
              <span className="bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
                {videoKey === 'none'
                  ? 'Esta clase no tiene video disponible'
                  : 'Disponible muy pronto'}
              </span>
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <div className="h-2 w-2 animate-bounce rounded-full bg-white delay-100" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-white delay-200" />
              <div className="h-2 w-2 animate-bounce rounded-full bg-white delay-300" />
            </div>
          </>
        ) : (
          <>
            <div className="hourglassBackground">
              <div className="hourglassContainer">
                <div className="hourglassCurves" />
                <div className="hourglassCapTop" />
                <div className="hourglassGlassTop" />
                <div className="hourglassSand" />
                <div className="hourglassSandStream" />
                <div className="hourglassCapBottom" />
                <div className="hourglassGlass" />
              </div>
            </div>
            <p className="text-lg font-medium text-white">
              Preparando video de la clase...
            </p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative aspect-video w-full">
      {videoUrl && !useNativePlayer && !playerError && (
        <Player
          src={videoUrl}
          controls
          onEnded={onVideoEnd}
          onError={handlePlayerError}
          // Cambia el tipo del ref para evitar 'any'
          ref={playerRef as React.RefObject<HTMLVideoElement>}
          onLoadedMetadata={(e) => {
            if (
              startAt > 0 &&
              Math.abs(e.currentTarget.currentTime - startAt) > 1
            ) {
              e.currentTarget.currentTime = startAt;
            }
          }}
          onTimeUpdate={(e) => {
            const video = e.currentTarget;
            if (video && !isVideoCompleted) {
              const progress = Math.round(
                (video.currentTime / video.duration) * 100
              );
              onProgressUpdate(progress);
            }
            if (onTimeUpdate) {
              onTimeUpdate(video.currentTime);
            }
          }}
          style={{
            '--media-primary-color': '#ffff',
            '--media-secondary-color': '#2ecc71',
            '--media-accent-color': '#ffff',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            maxHeight: '100vh',
            position: 'absolute',
            top: '0',
            left: '0',
          }}
        />
      )}
      {(videoUrl && useNativePlayer) || playerError ? (
        <video
          ref={playerRef}
          src={videoUrl}
          className="absolute inset-0 h-full w-full bg-black object-contain"
          controls
          playsInline
          controlsList="nodownload"
          onEnded={onVideoEnd}
          onError={(_e) => {
            console.error('Native player error: Video failed to load or play');
          }}
          onLoadedMetadata={(e) => {
            if (
              startAt > 0 &&
              Math.abs(e.currentTarget.currentTime - startAt) > 1
            ) {
              e.currentTarget.currentTime = startAt;
            }
          }}
          onTimeUpdate={(e) => {
            const video = e.currentTarget;
            if (video && !isVideoCompleted) {
              const progress = Math.round(
                (video.currentTime / video.duration) * 100
              );
              onProgressUpdate(progress);
            }
            if (onTimeUpdate) {
              onTimeUpdate(video.currentTime);
            }
          }}
        />
      ) : null}
      {(!videoUrl || isLoading) && renderLoadingState()}
    </div>
  );
};

export default VideoPlayer;
