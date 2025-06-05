// Enhanced D&D Avatar Cache Status Checker
// Paste this in browser console to check all cache layers

async function checkEnhancedCacheStatus() {
  console.log('🔍 Enhanced D&D Avatar Cache Status Check\n');
  
  // Check localStorage (metadata)
  const apiData = localStorage.getItem('dd_avatar_data_v1');
  const timestamp = localStorage.getItem('dd_avatar_cache_timestamp_v1');
  const preloadedImages = localStorage.getItem('dd_preloaded_images_v1');
  
  if (!apiData || !timestamp) {
    console.log('❌ No localStorage cache found');
    return;
  }
  
  const ageMs = Date.now() - parseInt(timestamp);
  const ageDays = ageMs / (1000 * 60 * 60 * 24);
  const isExpired = ageMs > (30 * 24 * 60 * 60 * 1000);
  
  console.log(`📅 API Cache Age: ${ageDays.toFixed(1)} days (${isExpired ? 'EXPIRED' : 'VALID'})`);
  
  const avatarCount = JSON.parse(apiData).avatars?.length || 0;
  console.log(`🎨 Avatar Metadata: ${avatarCount} avatars`);
  
  const localStorageSize = (apiData.length + (preloadedImages?.length || 0)) / 1024;
  console.log(`📝 localStorage Size: ${localStorageSize.toFixed(1)}KB (metadata only)`);
  
  if (preloadedImages) {
    const imageCount = JSON.parse(preloadedImages).length;
    console.log(`📋 Preload List: ${imageCount}/${avatarCount} marked as preloaded`);
  }
  
  // Check IndexedDB (actual image data)
  try {
    console.log('🔍 Checking IndexedDB for actual image data...');
    
    const request = indexedDB.open('dd_avatar_cache', 1);
    
    request.onsuccess = async (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('images')) {
        console.log('❌ No IndexedDB image store found');
        return;
      }
      
      const transaction = db.transaction(['images'], 'readonly');
      const store = transaction.objectStore('images');
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = () => {
        const results = getAllRequest.result;
        const totalSize = results.reduce((sum, item) => sum + item.blob.size, 0);
        const sizeMB = (totalSize / (1024 * 1024)).toFixed(1);
        
        console.log(`💾 IndexedDB: ${results.length}/${avatarCount} images stored`);
        console.log(`📦 Total Image Data: ${sizeMB}MB`);
        console.log(`📊 Average Image Size: ${(totalSize / results.length / 1024).toFixed(1)}KB`);
        
        if (results.length === avatarCount) {
          console.log('✅ All images fully cached!');
        } else if (results.length > 0) {
          console.log('⚠️  Partial cache - some images missing');
        } else {
          console.log('❌ No images actually stored - only metadata cached');
        }
        
        // Storage breakdown
        console.log('\n📊 Storage Breakdown:');
        console.log(`   localStorage: ${localStorageSize.toFixed(1)}KB (metadata)`);
        console.log(`   IndexedDB: ${sizeMB}MB (actual images)`);
        console.log(`   Total: ~${sizeMB}MB`);
        
        console.log('\n🧹 Cache Management:');
        console.log('   Clear metadata: localStorage.clear()');
        console.log('   Clear images: await clearImageCache()');
        console.log('   Clear all: localStorage.clear() + await clearImageCache()');
      };
    };
    
    request.onerror = () => {
      console.log('❌ Failed to access IndexedDB');
    };
    
  } catch (error) {
    console.log('❌ IndexedDB check failed:', error);
  }
}

// Helper function to clear IndexedDB
async function clearImageCache() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('dd_avatar_cache', 1);
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(['images'], 'readwrite');
      const store = transaction.objectStore('images');
      const clearRequest = store.clear();
      
      clearRequest.onsuccess = () => {
        console.log('✅ IndexedDB image cache cleared');
        resolve();
      };
      clearRequest.onerror = () => reject(clearRequest.error);
    };
    
    request.onerror = () => reject(request.error);
  });
}

// Run the enhanced check
checkEnhancedCacheStatus(); 