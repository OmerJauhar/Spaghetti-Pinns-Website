import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Brain, Building, ChevronRight, Cpu, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="py-6 md:py-10">
      {/* Hero Section with Bridge Image and Tech Graphics */}
      <div className="relative mb-16 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-600/5 to-purple-600/5 dark:from-indigo-500/10 dark:to-purple-500/10">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
              <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="2" fill="currentColor" />
                <circle cx="90" cy="10" r="2" fill="currentColor" />
                <circle cx="10" cy="90" r="2" fill="currentColor" />
                <circle cx="90" cy="90" r="2" fill="currentColor" />
                <circle cx="50" cy="50" r="3" fill="currentColor" />
                <path d="M 10 10 H 40 V 50 H 90" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M 10 90 H 30 V 50 H 50" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M 90 90 V 60 H 60 V 50" stroke="currentColor" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl mb-4">
              PINNs for Spaghetti Bridge Weight Prediction
            </h1>
            <p className="max-w-3xl text-lg text-muted-foreground mb-6">
              Leveraging Physics-Informed Neural Networks to accurately predict spaghetti bridge failure load capacity
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800"
              >
                <Link href="/try" className="flex items-center gap-2">
                  Try Our Model <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about" className="flex items-center gap-2">
                  Learn More <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="rounded-lg overflow-hidden shadow-xl border border-border relative">
              <Image
                src="/images/spaghetti-bridge.png"
                alt="Spaghetti Bridge Weight Test"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              {/* Tech overlay elements */}
              <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm p-2 rounded-md flex items-center gap-2 text-xs font-medium border border-border">
                <Cpu className="h-3.5 w-3.5 text-indigo-500" />
                <span>PINN Analysis Active</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse"></div>
                  <span className="text-white text-sm">Physics-Informed Neural Network</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="mb-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl">
            Project Features
          </h2>
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-full"></div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border-t-4 border-t-indigo-600">
              <CardHeader className="bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pb-8">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-indigo-500" />
                  Physics-Informed ML
                </CardTitle>
                <CardDescription>Exploring credibility and effectiveness</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  Our research focuses on validating physics-informed machine learning approaches for structural
                  analysis.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border-t-4 border-t-purple-600">
              <CardHeader className="bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pb-8">
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-indigo-500" />
                  Spaghetti Bridges
                </CardTitle>
                <CardDescription>Small-scale structural analysis</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  Using spaghetti bridge images as a test case for computer vision techniques in structural analysis.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-md border-t-4 border-t-indigo-700">
              <CardHeader className="bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pb-8">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-indigo-500" />
                  Computer Vision
                </CardTitle>
                <CardDescription>Image-based parameter extraction</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  Using digital image processing techniques to extract geometrical parameters from front view images of
                  spaghetti bridges without any dataset.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tech visualization section */}
          <div className="mt-16 bg-card rounded-xl p-6 border border-border">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <h3 className="text-xl font-bold mb-4">How PINN Works</h3>
                <p className="text-muted-foreground mb-4">
                  Physics-Informed Neural Networks combine traditional physics equations with modern deep learning to
                  create more accurate and physically consistent predictions.
                </p>
                <div className="flex items-center gap-2 text-sm text-indigo-500 font-medium">
                  <Cpu className="h-4 w-4" />
                  <span>Advanced AI Technology</span>
                </div>
              </div>
              <div className="md:w-2/3 h-64 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-indigo-400/10 dark:to-purple-400/10 rounded-lg overflow-hidden relative">
                {/* Neural network visualization */}
                <svg className="w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                  <g className="text-indigo-500">
                    {/* Input layer */}
                    <circle cx="100" cy="100" r="20" fill="currentColor" opacity="0.7" />
                    <circle cx="100" cy="200" r="20" fill="currentColor" opacity="0.7" />
                    <circle cx="100" cy="300" r="20" fill="currentColor" opacity="0.7" />

                    {/* Hidden layer 1 */}
                    <circle cx="300" cy="80" r="20" fill="currentColor" opacity="0.7" />
                    <circle cx="300" cy="160" r="20" fill="currentColor" opacity="0.7" />
                    <circle cx="300" cy="240" r="20" fill="currentColor" opacity="0.7" />
                    <circle cx="300" cy="320" r="20" fill="currentColor" opacity="0.7" />

                    {/* Hidden layer 2 */}
                    <circle cx="500" cy="100" r="20" fill="currentColor" opacity="0.7" />
                    <circle cx="500" cy="200" r="20" fill="currentColor" opacity="0.7" />
                    <circle cx="500" cy="300" r="20" fill="currentColor" opacity="0.7" />

                    {/* Output layer */}
                    <circle cx="700" cy="200" r="20" fill="currentColor" opacity="0.7" />

                    {/* Connections from input to hidden 1 */}
                    <line x1="120" y1="100" x2="280" y2="80" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="120" y1="100" x2="280" y2="160" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="120" y1="100" x2="280" y2="240" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="120" y1="100" x2="280" y2="320" stroke="currentColor" strokeWidth="2" opacity="0.3" />

                    <line x1="120" y1="200" x2="280" y2="80" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="120" y1="200" x2="280" y2="160" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="120" y1="200" x2="280" y2="240" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="120" y1="200" x2="280" y2="320" stroke="currentColor" strokeWidth="2" opacity="0.3" />

                    <line x1="120" y1="300" x2="280" y2="80" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="120" y1="300" x2="280" y2="160" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="120" y1="300" x2="280" y2="240" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="120" y1="300" x2="280" y2="320" stroke="currentColor" strokeWidth="2" opacity="0.3" />

                    {/* Connections from hidden 1 to hidden 2 */}
                    <line x1="320" y1="80" x2="480" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="320" y1="80" x2="480" y2="200" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="320" y1="80" x2="480" y2="300" stroke="currentColor" strokeWidth="2" opacity="0.3" />

                    <line x1="320" y1="160" x2="480" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="320" y1="160" x2="480" y2="200" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="320" y1="160" x2="480" y2="300" stroke="currentColor" strokeWidth="2" opacity="0.3" />

                    <line x1="320" y1="240" x2="480" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="320" y1="240" x2="480" y2="200" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="320" y1="240" x2="480" y2="300" stroke="currentColor" strokeWidth="2" opacity="0.3" />

                    <line x1="320" y1="320" x2="480" y2="100" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="320" y1="320" x2="480" y2="200" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="320" y1="320" x2="480" y2="300" stroke="currentColor" strokeWidth="2" opacity="0.3" />

                    {/* Connections from hidden 2 to output */}
                    <line x1="520" y1="100" x2="680" y2="200" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="520" y1="200" x2="680" y2="200" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                    <line x1="520" y1="300" x2="680" y2="200" stroke="currentColor" strokeWidth="2" opacity="0.3" />

                    {/* Labels */}
                    <text x="100" y="370" textAnchor="middle" fill="currentColor" fontSize="14">
                      Input Layer
                    </text>
                    <text x="300" y="370" textAnchor="middle" fill="currentColor" fontSize="14">
                      Hidden Layer 1
                    </text>
                    <text x="500" y="370" textAnchor="middle" fill="currentColor" fontSize="14">
                      Hidden Layer 2
                    </text>
                    <text x="700" y="370" textAnchor="middle" fill="currentColor" fontSize="14">
                      Output
                    </text>

                    <text x="700" y="230" textAnchor="middle" fill="#fff" fontSize="12">
                      Weight
                    </text>
                  </g>
                </svg>

                {/* Animated pulse */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-purple-500/20 animate-ping opacity-75"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
