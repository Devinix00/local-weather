import { useEffect, useState } from "react";

declare global {
  interface Window {
    kakao?: {
      maps: {
        load: (callback: () => void) => void;
      };
    };
  }
}

export default function useKakaoLoader() {
  const apiKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
  const [isLoaded, setIsLoaded] = useState(!!window.kakao?.maps?.load);

  useEffect(() => {
    if (!apiKey || isLoaded) return;

    if (document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]'))
      return;

    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;

    script.onload = () => {
      window.kakao?.maps?.load(() => setIsLoaded(true));
    };

    document.head.appendChild(script);
  }, [apiKey, isLoaded]);

  return { isLoaded };
}
