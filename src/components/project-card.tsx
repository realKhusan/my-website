import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IProject } from "@/types/main";
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Badge } from './ui/badge';
function ProjectCard({ project }: { project: IProject }) {
    return (
        <Card
            key={project.id}
            className="group flex flex-col p-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1  border-0 shadow-lg"
        >
            <div className="relative overflow-hidden rounded-t-lg">
                <img
                    loading='lazy'
                    src={project.img || "/placeholder.svg"}
                    alt={project.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-xl font-semibold text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.name}
                    </CardTitle>
                    <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </CardHeader>

            <CardContent className="pt-0 flex flex-col justify-between flex-grow">
                <div>
                    <CardDescription className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                        {project.desc}
                    </CardDescription>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                            <Badge
                                key={tech}
                                variant="secondary"
                                className={"bg-gray-100 text-gray-800 font-medium"}
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>

                <Link href={project.link} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full group/btn">
                        <span>View Project</span>
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}

export default ProjectCard
