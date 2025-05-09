'use client'

import { useState, useCallback, useRef, useEffect } from 'react';
import { FaUpload, FaTrash, FaSpinner, FaRecycle, FaExclamationTriangle } from 'react-icons/fa';

// This interface defines what a waste detection looks like
interface WasteDetection {
  class: string;
  confidence: number;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

// Define waste categories with their colors, icons, and disposal tips
const wasteCategories = {
  plastic: { 
    color: 'bg-blue-100 text-blue-800', 
    icon: '♻️',
    disposal: "Rinse and place in the recycling bin. Check for recycling numbers (1-7) to ensure proper recycling."
  },
  paper: { 
    color: 'bg-amber-100 text-amber-800', 
    icon: '📄',
    disposal: "Keep dry and place in paper recycling. Remove any plastic or metal attachments before recycling."
  },
  glass: { 
    color: 'bg-emerald-100 text-emerald-800', 
    icon: '🥃',
    disposal: "Rinse and separate by color if required in your area. Glass can be recycled indefinitely."
  },
  organic: { 
    color: 'bg-green-100 text-green-800', 
    icon: '🍂',
    disposal: "Compost if available, otherwise place in organic waste collection. Great for creating nutrient-rich soil."
  },
  electronic: { 
    color: 'bg-purple-100 text-purple-800', 
    icon: '🔌',
    disposal: "Bring to e-waste collection centers. Contains valuable materials and potential hazardous components."
  },
  metal: { 
    color: 'bg-gray-100 text-gray-800', 
    icon: '🔩',
    disposal: "Clean and place in metal recycling. Metals can be recycled repeatedly without losing quality."
  },
  mixed: {
    color: 'bg-red-100 text-red-800',
    icon: '🗑️',
    disposal: "Try to separate recyclable components. If inseparable, check local waste regulations."
  }
};

// Map Roboflow class names to our category names
const classToCategory: Record<string, keyof typeof wasteCategories> = {
  'plastic': 'plastic',
  'paper': 'paper',
  'glass': 'glass',
  'organic': 'organic',
  'electronic': 'electronic',
  'metal': 'metal',
  'mixed': 'mixed'
};

export default function ImageUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detections, setDetections] = useState<WasteDetection[]>([]);
  const [result, setResult] = useState<{
    category: keyof typeof wasteCategories;
    confidence: number;
    disposal: string;
  } | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload
  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Reset previous state
    setError(null);
    setResult(null);
    setDetections([]);
    
    // Check file size (limit to 5MB as per UI text)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image too large. Please upload an image smaller than 5MB.');
      return;
    }
    
    setLoading(true);
    
    // Create a reader to display the image
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
    };
    reader.onerror = () => {
      setError('Error reading the image file. Please try again.');
      setLoading(false);
    };
    reader.readAsDataURL(file);
    
    // Send the image to Roboflow API
    detectWaste(file);
  }, []);

  // Function to call Roboflow API
  const detectWaste = async (file: File) => {
    try {
      // Create form data to send the image
      const formData = new FormData();
      formData.append('file', file);
      
      // API endpoint for Roboflow serverless
      // Using the API key and model ID from your Python example
      const apiKey = "budJODgAGj779iCJjEbW";
      const modelId = "yolo-waste-detection/1";
      const apiUrl = `https://detect.roboflow.com/${modelId}?api_key=${apiKey}`;
      
      // Make the API request
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      // Parse the JSON response
      const data = await response.json();
      console.log('Roboflow API response:', data);
      
      // Check if we have predictions
      if (data.predictions && data.predictions.length > 0) {
        // Format the detections
        const formattedDetections = data.predictions.map((pred: any) => ({
          class: pred.class,
          confidence: pred.confidence,
          bbox: {
            x: pred.x / data.image.width, // normalize to 0-1
            y: pred.y / data.image.height, // normalize to 0-1
            width: pred.width / data.image.width, // normalize to 0-1
            height: pred.height / data.image.height // normalize to 0-1
          }
        }));
        
        // Sort by confidence
        formattedDetections.sort((a: WasteDetection, b: WasteDetection) => 
          b.confidence - a.confidence
        );
        
        setDetections(formattedDetections);
        
        // Set the top result
        const topDetection = formattedDetections[0];
        const category = classToCategory[topDetection.class.toLowerCase()] || 'mixed';
        
        setResult({
          category: category,
          confidence: Math.round(topDetection.confidence * 100),
          disposal: wasteCategories[category].disposal
        });
      } else {
        setError('No waste detected in this image. Please try another image.');
      }
    } catch (err) {
      console.error('Error calling Roboflow API:', err);
      setError('Error analyzing the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Draw bounding boxes when image and detections are available
  useEffect(() => {
    if (image && detections.length > 0 && imageRef.current && canvasRef.current) {
      const img = imageRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw each detection
      detections.forEach((detection) => {
        // Calculate actual pixel coordinates from normalized values
        const x = detection.bbox.x - detection.bbox.width / 2; // Roboflow uses center coordinates
        const y = detection.bbox.y - detection.bbox.height / 2;
        const width = detection.bbox.width;
        const height = detection.bbox.height;
        
        const actualX = x * canvas.width;
        const actualY = y * canvas.height;
        const actualWidth = width * canvas.width;
        const actualHeight = height * canvas.height;
        
        // Get color based on waste class
        const category = classToCategory[detection.class.toLowerCase()] || 'mixed';
        let color = '#00FF00'; // Default green
        
        switch(category) {
          case 'plastic': color = '#3B82F6'; break; // Blue
          case 'paper': color = '#F59E0B'; break; // Amber
          case 'glass': color = '#10B981'; break; // Emerald
          case 'organic': color = '#22C55E'; break; // Green
          case 'electronic': color = '#8B5CF6'; break; // Purple
          case 'metal': color = '#6B7280'; break; // Gray
          case 'mixed': color = '#EF4444'; break; // Red
        }
        
        // Draw rectangle
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.strokeRect(actualX, actualY, actualWidth, actualHeight);
        
        // Draw label background
        ctx.fillStyle = color;
        const label = `${detection.class} ${Math.round(detection.confidence * 100)}%`;
        ctx.font = 'bold 16px Inter, sans-serif';
        const textMetrics = ctx.measureText(label);
        const textHeight = 24;
        ctx.fillRect(
          actualX, 
          actualY - textHeight, 
          textMetrics.width + 10, 
          textHeight
        );
        
        // Draw label text
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(label, actualX + 5, actualY - 7);
      });
    }
  }, [image, detections]);

  // Reset function
  const resetUpload = () => {
    setImage(null);
    setResult(null);
    setError(null);
    setDetections([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Clear canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg">
          <FaExclamationTriangle className="flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Upload Area */}
      {!image && !loading && (
        <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center cursor-pointer hover:bg-green-50 transition">
          <label className="flex flex-col items-center justify-center space-y-2">
            <FaUpload className="text-4xl text-green-500" />
            <p className="font-medium">Upload Waste Image</p>
            <p className="text-sm text-gray-500">JPG, PNG up to 5MB</p>
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleUpload} 
              disabled={loading}
            />
          </label>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <FaSpinner className="animate-spin text-3xl text-green-600 mb-4" />
          <p>Analyzing waste...</p>
        </div>
      )}

      {/* Results */}
      {image && !loading && result && (
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="relative">
              {/* The actual image */}
              <img 
                ref={imageRef}
                src={image} 
                alt="Uploaded waste" 
                className="rounded-lg w-full max-h-80 object-contain border border-gray-200"
                crossOrigin="anonymous"
              />
              
              {/* Canvas overlay for drawing detection boxes */}
              <canvas 
                ref={canvasRef}
                className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-lg"
              />
              
              {/* Delete button */}
              <button 
                onClick={resetUpload}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                aria-label="Delete image"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Detection Results</h3>
            
            {/* Detection result box */}
            <div className={`flex items-center gap-3 p-3 rounded-lg ${wasteCategories[result.category].color}`}>
              <span className="text-2xl">{wasteCategories[result.category].icon}</span>
              <div>
                <p className="font-medium capitalize">{result.category}</p>
                <p className="text-sm">{result.confidence}% confidence</p>
              </div>
            </div>

            {/* Disposal instructions */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <FaRecycle className="text-green-600" />
                Disposal Instructions
              </h4>
              <p>{result.disposal}</p>
            </div>

            {/* Scan another button */}
            <button 
              onClick={resetUpload}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Scan Another Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
}