"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getMonsterImageUrl } from '@/lib/monster-images';

interface MonsterImageProps {
  monsterName: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  priority?: boolean;
}

export function MonsterImage({ 
  monsterName, 
  width = 400, 
  height = 400, 
  className = "",
  alt,
  priority = false 
}: MonsterImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    const url = getMonsterImageUrl(monsterName);
    console.log(`🖼️ Monster image URL for "${monsterName}":`, url);
    if (url && url !== '') {
      setImageUrl(url);
      setImageError(false);
      setImageLoaded(false);
      setImageExists(false);
      
      // Pre-check if the image exists
      const img = new window.Image();
      img.onload = () => {
        console.log(`✅ Image exists for ${monsterName}`);
        setImageExists(true);
      };
      img.onerror = () => {
        console.log(`❌ Image does not exist for ${monsterName}`);
        setImageExists(false);
        setImageError(true);
      };
      img.src = url;
    } else {
      console.warn(`⚠️ No image URL generated for monster: ${monsterName}`);
      setImageError(true);
    }
  }, [monsterName]);

  const handleImageError = () => {
    console.error(`❌ Failed to load image for monster: ${monsterName}`);
    setImageError(true);
    setImageLoaded(false);
  };

  const handleImageLoad = () => {
    console.log(`✅ Successfully loaded image for monster: ${monsterName}`);
    setImageLoaded(true);
    setImageError(false);
  };

  // Return null if no URL, error, or image doesn't exist
  if (!imageUrl || imageUrl === '' || imageError || !imageExists) {
    console.log(`🖼️ No image for ${monsterName}:`, {
      imageUrl: !!imageUrl,
      imageError,
      imageLoaded,
      imageExists,
      url: imageUrl
    });
    return null;
  }

  console.log(`🖼️ Rendering Image component for ${monsterName} with URL: ${imageUrl}`);
  return (
    <Image
      src={imageUrl}
      alt={alt || `${monsterName} image`}
      width={width}
      height={height}
      className={`rounded-lg object-cover ${className}`}
      onError={handleImageError}
      onLoad={handleImageLoad}
      priority={priority}
    />
  );
} 