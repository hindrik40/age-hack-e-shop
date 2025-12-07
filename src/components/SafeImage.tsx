import React, { useState, useEffect, useRef } from 'react';

// Hindra att "children" eller "dangerouslySetInnerHTML" kan skickas vidare till <img>
interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'dangerouslySetInnerHTML' | 'children'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  placeholder?: React.ReactNode;
  containerClassName?: string;
  figClassName?: string; // wrapper/figure-liknande klass
  overlayClassName?: string; // overlay ovanpå bilden
  priority?: boolean; // ignoreras för <img>, finns för API-kompabilitet
  children?: never;
}

export default function SafeImage({
  src,
  alt,
  className,
  fallbackSrc = 'https://images.pexels.com/photos/1893965/pexels-photo-1893965.jpeg?auto=compress&cs=tinysrgb&w=800',
  placeholder,
  containerClassName,
  figClassName,
  overlayClassName,
  priority, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...rest
}: SafeImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(typeof src === 'string' ? src : undefined);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (typeof src === 'string') {
      setCurrentSrc(src);
      setFailed(false);
    }
  }, [src]);

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setFailed(true);
    }
  };

  // Endast tillåtna img-attribut skickas vidare
  const imgProps = rest as React.ImgHTMLAttributes<HTMLImageElement>;

  const wrapperClasses = `${figClassName ? figClassName + ' ' : ''}${containerClassName ?? 'relative w-full h-full'}`;

  return (
    <div className={wrapperClasses}>
      <img
        ref={imgRef}
        {...imgProps}
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover ${className ?? ''}`}
        onError={handleError}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
      />

      {overlayClassName ? (
        <div className={overlayClassName} />
      ) : null}

      {failed && (
        <div className="absolute bottom-2 left-2 text-xs bg-black/40 text-white px-2 py-1 rounded">
          Bilden kunde inte laddas – visar fallback.
        </div>
      )}
    </div>
  );
}
