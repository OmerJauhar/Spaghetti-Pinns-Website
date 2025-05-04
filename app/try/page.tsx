"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Upload, Weight, Sparkles, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { motion } from "@/components/motion"

export default function TryNow() {
  const [selectedTab, setSelectedTab] = useState("basic")
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [parameters, setParameters] = useState({
    param1: 50, // Bridge length
    param2: 25, // Bridge width
    param3: 75, // Spaghetti thickness
    param4: 10, // Joint strength
    param5: 60, // Support distance
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
    reader.onload = (e) => {
      if (e.target?.result) {
        setUploadedImage(e.target.result as string)
        toast({
          title: "Bridge image uploaded!",
          description: "Your spaghetti bridge image is ready for analysis.",
        })
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSliderChange = (name: keyof typeof parameters, value: number[]) => {
    setParameters((prev) => ({ ...prev, [name]: value[0] }))
  }

  const handleInputChange = (name: keyof typeof parameters, value: string) => {
    const numValue = Number.parseInt(value)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setParameters((prev) => ({ ...prev, [name]: numValue }))
    }
  }

  const handleProcess = () => {
    toast({
      title: "Analysis started!",
      description: "Our PINN model is analyzing your spaghetti bridge structure.",
    })

    // Simulate processing delay
    setTimeout(() => {
      const predictedWeight = Math.floor(Math.random() * 500) + 100 // Random weight between 100-600g
      toast({
        title: "Analysis complete!",
        description: `Predicted failure load capacity: ${predictedWeight}g`,
      })
    }, 2000)
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
            Upload your spaghetti bridge image or input parameters to predict failure load capacity
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
            <Tabs defaultValue="basic" className="w-full" onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="basic" className="text-base">
                  Basic Analysis
                </TabsTrigger>
                <TabsTrigger value="advanced" className="text-base">
                  Advanced Parameters
                </TabsTrigger>
              </TabsList>

              <div className="grid gap-8 md:grid-cols-2">
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div
                      className={cn(
                        "border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200",
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
                            src={uploadedImage || "/placeholder.svg"}
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
                            <p className="text-sm text-muted-foreground mt-1">Drag and drop or click to browse</p>
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
                  </CardContent>
                </Card>

                <div>
                  <TabsContent value="basic" className="mt-0">
                    <Card>
                      <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="quality">Bridge Length (cm)</Label>
                            <span className="text-sm text-muted-foreground">{parameters.param1}</span>
                          </div>
                          <Slider
                            id="quality"
                            min={10}
                            max={100}
                            step={1}
                            value={[parameters.param1]}
                            onValueChange={(value) => handleSliderChange("param1", value)}
                            className="cursor-pointer"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="brightness">Bridge Width (cm)</Label>
                            <span className="text-sm text-muted-foreground">{parameters.param2}</span>
                          </div>
                          <Slider
                            id="brightness"
                            min={5}
                            max={50}
                            step={1}
                            value={[parameters.param2]}
                            onValueChange={(value) => handleSliderChange("param2", value)}
                            className="cursor-pointer"
                          />
                        </div>

                        <div className="pt-4">
                          <Button
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800"
                            disabled={!uploadedImage}
                            onClick={handleProcess}
                          >
                            <Weight className="mr-2 h-4 w-4" /> Predict Failure Load
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="advanced" className="mt-0">
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="param1">Bridge Length (cm)</Label>
                            <Input
                              id="param1-input"
                              type="number"
                              min={10}
                              max={100}
                              value={parameters.param1}
                              onChange={(e) => handleInputChange("param1", e.target.value)}
                              className="w-16 h-8 text-right"
                            />
                          </div>
                          <Slider
                            id="param1"
                            min={10}
                            max={100}
                            step={1}
                            value={[parameters.param1]}
                            onValueChange={(val) => handleSliderChange("param1", val)}
                            className="cursor-pointer"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="param2">Bridge Width (cm)</Label>
                            <Input
                              id="param2-input"
                              type="number"
                              min={5}
                              max={50}
                              value={parameters.param2}
                              onChange={(e) => handleInputChange("param2", e.target.value)}
                              className="w-16 h-8 text-right"
                            />
                          </div>
                          <Slider
                            id="param2"
                            min={5}
                            max={50}
                            step={1}
                            value={[parameters.param2]}
                            onValueChange={(val) => handleSliderChange("param2", val)}
                            className="cursor-pointer"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="param3">Spaghetti Thickness (mm)</Label>
                            <Input
                              id="param3-input"
                              type="number"
                              min={0}
                              max={100}
                              value={parameters.param3}
                              onChange={(e) => handleInputChange("param3", e.target.value)}
                              className="w-16 h-8 text-right"
                            />
                          </div>
                          <Slider
                            id="param3"
                            min={0}
                            max={100}
                            step={1}
                            value={[parameters.param3]}
                            onValueChange={(val) => handleSliderChange("param3", val)}
                            className="cursor-pointer"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="param4">Joint Strength (%)</Label>
                            <Input
                              id="param4-input"
                              type="number"
                              min={0}
                              max={100}
                              value={parameters.param4}
                              onChange={(e) => handleInputChange("param4", e.target.value)}
                              className="w-16 h-8 text-right"
                            />
                          </div>
                          <Slider
                            id="param4"
                            min={0}
                            max={100}
                            step={1}
                            value={[parameters.param4]}
                            onValueChange={(val) => handleSliderChange("param4", val)}
                            className="cursor-pointer"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="param5">Support Distance (cm)</Label>
                            <Input
                              id="param5-input"
                              type="number"
                              min={0}
                              max={100}
                              value={parameters.param5}
                              onChange={(e) => handleInputChange("param5", e.target.value)}
                              className="w-16 h-8 text-right"
                            />
                          </div>
                          <Slider
                            id="param5"
                            min={0}
                            max={100}
                            step={1}
                            value={[parameters.param5]}
                            onValueChange={(val) => handleSliderChange("param5", val)}
                            className="cursor-pointer"
                          />
                        </div>

                        <div className="pt-4">
                          <Button
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800"
                            disabled={!uploadedImage}
                            onClick={handleProcess}
                          >
                            <Sparkles className="mr-2 h-4 w-4" /> Advanced Failure Analysis
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </motion.div>

          {uploadedImage && (
            <motion.div
              className="mt-12"
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
                      {selectedTab === "basic" ? "Basic analysis" : "Advanced analysis"}
                    </div>
                    <div className="text-muted-foreground">
                      {selectedTab === "basic" ? "2 parameters" : "5 parameters"}
                    </div>
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
