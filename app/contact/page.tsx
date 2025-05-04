"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User } from "lucide-react"
import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    })
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="py-10">
      <header className="mb-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">Our Team</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">Meet the researchers behind this project</p>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-indigo-500" />
                    Group Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden">
                        <Image
                          src="/images/omer-jauhar.png"
                          alt="Omer Jauhar"
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-medium">Omer Jauhar</span>
                        <p className="text-sm text-muted-foreground">21p-8055</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden">
                        <Image
                          src="/images/sudais-khan.png"
                          alt="Sudais Khan"
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-medium">Sudais Khan</span>
                        <p className="text-sm text-muted-foreground">21p-8033</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-indigo-500" />
                    Project Supervisors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden">
                        <Image
                          src="/images/mr-shahzeb-khan.png"
                          alt="Mr. Shahzeb Khan"
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-medium">Mr. Shahzeb Khan</span>
                        <p className="text-sm text-muted-foreground">Primary Supervisor</p>
                        <p className="text-sm text-muted-foreground">Lecturer</p>
                        <p className="text-sm text-muted-foreground">shahzeb.khan@nu.edu.pk</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden">
                        <Image
                          src="/images/shams.png"
                          alt="Dr. Shams Ul Arifeen"
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-medium">Dr. Shams Ul Arifeen</span>
                        <p className="text-sm text-muted-foreground">Co-Supervisor</p>
                        <p className="text-sm text-muted-foreground">Assistant Professor</p>
                        <p className="text-sm text-muted-foreground">shams.arifeen@nu.edu.pk</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>Have questions about our research? Send us a message.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Your message"
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[120px]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
