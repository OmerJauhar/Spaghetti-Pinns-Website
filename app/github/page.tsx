import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Star, GitFork, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function GitHubPage() {
  // Repository data - replace with your actual repositories
  const repositories = [
    {
      name: "PINN-Bridge-Analysis",
      description:
        "Physics-Informed Neural Networks for spaghetti bridge failure load prediction. This repository contains the core model implementation and training code.",
      language: "Python",
      stars: 24,
      forks: 5,
      url: "https://github.com/your-username/PINN-Bridge-Analysis",
      topics: ["machine-learning", "physics", "neural-networks", "structural-analysis"],
    },
    {
      name: "Bridge-Dataset",
      description:
        "A comprehensive dataset of spaghetti bridge images with corresponding failure loads. Used for training and validating the PINN model.",
      language: "Jupyter Notebook",
      stars: 18,
      forks: 7,
      url: "https://github.com/your-username/Bridge-Dataset",
      topics: ["dataset", "computer-vision", "structural-engineering"],
    },
    {
      name: "Bridge-Web-Interface",
      description:
        "Web application for the spaghetti bridge analysis tool. Allows users to upload images and get predictions from the PINN model.",
      language: "TypeScript",
      stars: 32,
      forks: 8,
      url: "https://github.com/your-username/Bridge-Web-Interface",
      topics: ["next-js", "react", "web-app", "tailwindcss"],
    },
    {
      name: "PINN-Documentation",
      description:
        "Comprehensive documentation for the Physics-Informed Neural Network project, including theory, implementation details, and usage guides.",
      language: "Markdown",
      stars: 15,
      forks: 3,
      url: "https://github.com/your-username/PINN-Documentation",
      topics: ["documentation", "tutorial", "research-paper"],
    },
  ]

  // Language color mapping
  const languageColors: Record<string, string> = {
    Python: "bg-blue-500",
    "Jupyter Notebook": "bg-orange-500",
    TypeScript: "bg-blue-600",
    JavaScript: "bg-yellow-400",
    Markdown: "bg-gray-500",
    HTML: "bg-red-500",
    CSS: "bg-purple-500",
  }

  return (
    <div className="py-10">
      <header className="mb-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            GitHub Repositories
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Explore our open-source code and research materials
          </p>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2">
            {repositories.map((repo) => (
              <Card
                key={repo.name}
                className="overflow-hidden transition-all duration-200 hover:shadow-md border-t-2 border-t-primary/30"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Github className="h-5 w-5 text-primary" />
                        {repo.name}
                      </CardTitle>
                      <CardDescription className="mt-1">{repo.description}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>View</span>
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.topics.map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/40 px-6 py-3">
                  <div className="flex items-center justify-between w-full text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`h-3 w-3 rounded-full ${languageColors[repo.language] || "bg-gray-400"}`}></span>
                      <span>{repo.language}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="h-4 w-4 text-muted-foreground" />
                        <span>{repo.forks}</span>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
