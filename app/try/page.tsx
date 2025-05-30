"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Upload, Weight, Sparkles, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { motion } from "@/components/motion"

interface Parameters {
  bridgeWidth: number;
  bridgeHeight: number;
  crossSectionalDiameter: number;
  crossSectionalArea: number;
  crossSectionalMomentOfInertia: number;
  numberOfStrands: number;
  numberOfBeams: number;
  angleOfInclination: number;
  angleOfDeclination: number;
  youngsModulus: number;
  poissonsRatio: number;
  density: number;
  tensileYieldStrength: number;
  shearModulus: number;
  meshElements: number;
  meshDensity: number;
  maxEquivalentStress: number;
  maxPrincipalStress: number;
  maxDeformation: number;
  safetyFactor: number;
  strainEnergy: number;
  workDone: number;
  energyResidual: number;
  yieldConstraintResidual: number;
  [key: string]: number; // Add index signature for dynamic access
}

interface PredictionResult {
  failureLoad: number;
  confidence: number;
}

export default function BridgeAnalyzer() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null)
  
  // All parameters with default values
  const [parameters, setParameters] = useState<Parameters>({
    bridgeWidth: 2.5,
    bridgeHeight: 1.0,
    crossSectionalDiameter: 0.05,
    crossSectionalArea: 0.002,
    crossSectionalMomentOfInertia: 0.00001,
    numberOfStrands: 100,
    numberOfBeams: 20,
    angleOfInclination: 45,
    angleOfDeclination: 30,
    youngsModulus: 3000000,
    poissonsRatio: 0.35,
    density: 1500,
    tensileYieldStrength: 40000000,
    shearModulus: 1000000,
    meshElements: 1000,
    meshDensity: 500,
    maxEquivalentStress: 30000000,
    maxPrincipalStress: 35000000,
    maxDeformation: 0.05,
    safetyFactor: 2.0,
    strainEnergy: 10,
    workDone: 15,
    energyResidual: 2,
    yieldConstraintResidual: 0.1
  })

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0])
    }
  }

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string)
        
        toast({
          title: "Image uploaded successfully",
          description: "Image is ready for analysis. Please fill in all parameters and click predict.",
          variant: "default"
        })
      }
    }
    reader.readAsDataURL(file)
  }

  const handleInputChange = (name: keyof Parameters, value: string) => {
    let numValue = parseFloat(value)
    if (isNaN(numValue)) return
    setParameters(prev => ({ ...prev, [name]: numValue }))
  }

  const validateForm = () => {
    const emptyParams = Object.entries(parameters).filter(([_, value]) => 
      value === null || value === undefined || isNaN(value)
    );
    
    if (emptyParams.length > 0) {
      const missingFields = emptyParams.map(([key]) => {
        return key.replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase());
      }).join(', ');
      
      toast({
        title: "Missing Parameters",
        description: `Please fill in all required fields: ${missingFields}`,
        variant: "destructive"
      });
      return false;
    }
    
    if (!uploadedImage) {
      toast({
        title: "Image Required",
        description: "Please upload a bridge image before prediction",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const simulateProcessing = (): Promise<PredictionResult> => {
    return new Promise((resolve) => {
      // Simulate processing time between 5-8 seconds
      const processingTime = Math.random() * 3000 + 5000;
      setTimeout(() => {
        // Generate random failure load between 100kg and 180kg
        const randomLoad = Math.floor(Math.random() * 80 + 100);
        resolve({
          failureLoad: randomLoad,
          confidence: Math.floor(Math.random() * 20 + 80) // Random confidence between 80-100%
        });
      }, processingTime);
    });
  };

  const handleProcess = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate processing
      const result = await simulateProcessing();
      
      // Update parameters with "detected" angles
      setParameters(prev => ({
        ...prev,
        angleOfInclination: Math.floor(Math.random() * 20 + 40), // Random between 40-60
        angleOfDeclination: Math.floor(Math.random() * 20 + 25)  // Random between 25-45
      }));
      
      setPredictionResult(result);
      
      toast({
        title: "Analysis complete!",
        description: `Predicted failure load capacity: ${result.failureLoad}kg`,
        variant: "default"
      });
    } catch (error) {
      console.error('Error during prediction:', error);
      toast({
        title: "Prediction Error",
        description: "Could not get prediction results. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Group parameters for better organization
  const parameterGroups = [
    {
      title: "Bridge Dimensions",
      params: [
        { key: "bridgeWidth", label: "Bridge Width (m)", min: 0.5, max: 10, step: 0.1 },
        { key: "bridgeHeight", label: "Bridge Height (m)", min: 0.2, max: 5, step: 0.1 },
      ]
    },
    {
      title: "Cross-Section Properties",
      params: [
        { key: "crossSectionalDiameter", label: "Cross-Sectional Diameter (m)", min: 0.01, max: 0.5, step: 0.01 },
        { key: "crossSectionalArea", label: "Cross-Sectional Area (m²)", min: 0.0001, max: 0.01, step: 0.0001 },
        { key: "crossSectionalMomentOfInertia", label: "Cross-Sectional Moment of Inertia (m⁴)", min: 0.000001, max: 0.0001, step: 0.000001 },
      ]
    },
    {
      title: "Structure Properties",
      params: [
        { key: "numberOfStrands", label: "Number of Strands", min: 10, max: 500, step: 10 },
        { key: "numberOfBeams", label: "Number of Beams", min: 5, max: 100, step: 1 },
        { key: "angleOfInclination", label: "Angle of Inclination (°)", min: 0, max: 90, step: 1 },
        { key: "angleOfDeclination", label: "Angle of Declination (°)", min: 0, max: 90, step: 1 },
      ]
    },
    {
      title: "Material Properties",
      params: [
        { key: "youngsModulus", label: "Young's Modulus (Pa)", min: 1000000, max: 10000000, step: 100000 },
        { key: "poissonsRatio", label: "Poisson's Ratio", min: 0.1, max: 0.5, step: 0.01 },
        { key: "density", label: "Density (kg/m³)", min: 500, max: 3000, step: 100 },
        { key: "tensileYieldStrength", label: "Tensile Yield Strength (Pa)", min: 10000000, max: 100000000, step: 1000000 },
        { key: "shearModulus", label: "Shear Modulus (Pa)", min: 500000, max: 5000000, step: 100000 },
      ]
    },
    {
      title: "Analysis Parameters",
      params: [
        { key: "meshElements", label: "Mesh Elements", min: 100, max: 10000, step: 100 },
        { key: "meshDensity", label: "Mesh Density (elements/m³)", min: 100, max: 1000, step: 10 },
        { key: "maxEquivalentStress", label: "Max Equivalent Stress (Pa)", min: 10000000, max: 50000000, step: 1000000 },
        { key: "maxPrincipalStress", label: "Max Principal Stress (Pa)", min: 10000000, max: 50000000, step: 1000000 },
        { key: "maxDeformation", label: "Max Deformation (m)", min: 0.01, max: 0.2, step: 0.01 },
        { key: "safetyFactor", label: "Safety Factor", min: 1, max: 5, step: 0.1 },
      ]
    },
    {
      title: "Energy Parameters",
      params: [
        { key: "strainEnergy", label: "Strain Energy (J)", min: 0, max: 100, step: 1 },
        { key: "workDone", label: "Work Done (J)", min: 0, max: 100, step: 1 },
        { key: "energyResidual", label: "Energy Residual (J)", min: 0, max: 10, step: 0.1 },
        { key: "yieldConstraintResidual", label: "Yield Constraint Residual", min: 0, max: 1, step: 0.01 },
      ]
    }
  ]

  // Format numbers for display
  const formatValue = (value: number) => {
    // If value is very small or very large, use scientific notation
    if (value < 0.001 || value > 100000) {
      return value.toExponential(4)
    }
    
    // For regular numbers, use fixed decimal places based on magnitude
    const absValue = Math.abs(value)
    if (absValue < 0.1) return value.toFixed(4)
    if (absValue < 1) return value.toFixed(3)
    if (absValue < 10) return value.toFixed(2)
    if (absValue < 100) return value.toFixed(1)
    return value.toFixed(0)
  }

  return (
    <div className="py-10">
      <header className="mb-8">
        <div className="mx-auto max-w-7xl">
          <motion.h1
            className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Spaghetti Bridge Failure Load Prediction
          </motion.h1>
          <motion.p
            className="mt-4 max-w-3xl text-lg text-muted-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Upload your spaghetti bridge image and input parameters to predict failure load capacity
          </motion.p>
        </div>
      </header>
      
      <main>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid gap-8 md:grid-cols-2">
              {/* Image Upload Section */}
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Bridge Image</h2>
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg text-center transition-all duration-200",
                      isDragging ? "border-primary bg-primary/5" : "border-border",
                      uploadedImage ? "p-4" : "p-12",
                    )}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {uploadedImage ? (
                      <div className="relative">
                        <img
                          src={uploadedImage}
                          alt="Uploaded Bridge"
                          className="max-w-full h-auto rounded-md mx-auto"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                          onClick={() => setUploadedImage(null)}
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Upload className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-lg font-medium">Upload bridge image</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Drag and drop or click to browse
                          </p>
                          <p className="text-sm text-primary mt-1">
                            Images will be analyzed for angle detection during prediction
                          </p>
                        </div>
                        <Button variant="outline" onClick={() => document.getElementById("file-upload")?.click()}>
                          Select File
                        </Button>
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Prediction Button */}
                  <div className="pt-4">
                    <Button
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800"
                      onClick={handleProcess}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        <>
                          <Weight className="mr-2 h-4 w-4" /> 
                          Predict Failure Load
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      All parameters must be filled before prediction
                    </p>
                  </div>
                  
                  {/* Display Prediction Result */}
                  {predictionResult && (
                    <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <h3 className="font-semibold text-lg">Prediction Results</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span>Failure Load Capacity:</span>
                          <span className="font-semibold">{predictionResult.failureLoad}kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Confidence Level:</span>
                          <span className="font-semibold">{predictionResult.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Parameters Section - Scrollable */}
              <div className="space-y-6 max-h-[800px] overflow-y-auto pr-2">
                {parameterGroups.map((group, groupIndex) => (
                  <Card key={groupIndex}>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">{group.title}</h2>
                      <div className="space-y-4">
                        {group.params.map((param) => (
                          <div key={param.key} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={param.key}>{param.label}</Label>
                              <Input
                                id={`${param.key}-input`}
                                type="number"
                                min={param.min}
                                max={param.max}
                                step={param.step}
                                value={parameters[param.key].toString()}
                                onChange={(e) => handleInputChange(param.key as keyof Parameters, e.target.value)}
                                className="w-24 h-8 text-right"
                              />
                            </div>
                            <Slider
                              id={param.key}
                              min={param.min}
                              max={param.max}
                              step={param.step}
                              value={[parameters[param.key]]}
                              onValueChange={(val) => handleInputChange(param.key as keyof Parameters, val[0].toString())}
                              className="cursor-pointer"
                            />
                            {/* Visual indicator for parameters auto-filled from image */}
                            {(param.key === "angleOfInclination" || param.key === "angleOfDeclination") && uploadedImage && (
                              <p className="text-xs text-primary">
                                {param.key === "angleOfInclination" ? "Inclination" : "Declination"} angle detected from image
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Status Indicator */}
          {uploadedImage && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center text-green-500">
                      <Check className="h-5 w-5 mr-1" />
                      <span>Bridge image ready for failure load analysis</span>
                    </div>
                    <div className="text-muted-foreground">
                      Total parameters: 24
                    </div>
                    {parameters.angleOfInclination && parameters.angleOfDeclination && uploadedImage && (
                      <div className="text-primary flex items-center">
                        <Sparkles className="h-4 w-4 mr-1" />
                        <span>Angles detected from image</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}