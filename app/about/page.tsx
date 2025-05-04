import { Brain, Microscope, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function About() {
  return (
    <div className="py-10">
      <header className="mb-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            About The Project
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">Final Year Project at FAST-NUCES</p>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
              <p className="text-muted-foreground mb-4">
                This project focuses on predicting the failure load capacity of spaghetti bridges using Physics-Informed
                Neural Networks (PINN). By combining traditional physics-based modeling with modern machine learning
                techniques, we've developed a system that can accurately predict how much load a spaghetti bridge can
                support before failure based on its design parameters.
              </p>
              <p className="text-muted-foreground mb-4">
                The application allows users to either upload an image of a spaghetti bridge design or input specific
                parameters to receive failure load predictions. This tool can be valuable for educational purposes,
                engineering competitions, and structural design studies.
              </p>
              <p className="text-muted-foreground mb-6">
                The project demonstrates the power of combining domain knowledge from physics with the flexibility and
                learning capabilities of neural networks, resulting in more accurate and physically consistent
                predictions.
              </p>

              <h2 className="text-2xl font-bold mb-4">Institution</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-24 h-24 flex items-center justify-center">
                  <Image
                    src="/images/fast-nuces-logo.png"
                    alt="FAST-NUCES Logo"
                    width={96}
                    height={96}
                    className="max-w-full h-auto"
                  />
                </div>
                <div>
                  <p className="font-medium">National University of Computer & Emerging Sciences</p>
                  <p className="text-muted-foreground">FAST Peshawar Campus</p>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <Card className="transition-all duration-200 hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Brain className="h-5 w-5 text-indigo-500" />
                    Physics-Informed Neural Networks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Combining physical laws with neural networks to create more accurate and physically consistent
                    predictions.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Microscope className="h-5 w-5 text-indigo-500" />
                    Computer Vision Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Using advanced image processing techniques to extract structural features from spaghetti bridge
                    images.
                  </p>
                </CardContent>
              </Card>
              <Card className="transition-all duration-200 hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lightbulb className="h-5 w-5 text-indigo-500" />
                    Practical Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The findings from this research can be applied to real-world structural analysis, potentially
                    improving safety and efficiency in construction.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
