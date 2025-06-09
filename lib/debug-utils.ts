// Debug utilities for troubleshooting image loading issues

/**
 * Debug function to test image loading and conversion
 * @param imageUrl The URL or data URL of the image to test
 */
export async function testImageLoading(
  imageUrl: string,
): Promise<{ success: boolean; message: string; dataUrl?: string }> {
  return new Promise((resolve) => {
    if (!imageUrl) {
      resolve({
        success: false,
        message: "No image URL provided",
      })
      return
    }

    // If it's already a data URL
    if (imageUrl.startsWith("data:")) {
      resolve({
        success: true,
        message: "Image is already a data URL",
        dataUrl: imageUrl.substring(0, 50) + "...", // Truncate for display
      })
      return
    }

    // For regular URLs, test loading
    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas")
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0)
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9)

        resolve({
          success: true,
          message: `Image loaded successfully. Size: ${img.width}x${img.height}`,
          dataUrl: dataUrl.substring(0, 50) + "...", // Truncate for display
        })
      } catch (error) {
        resolve({
          success: false,
          message: `Error converting to data URL: ${error}`,
        })
      }
    }

    img.onerror = (error) => {
      resolve({
        success: false,
        message: `Error loading image: ${error}`,
      })
    }

    img.src = imageUrl
  })
}
