"use client"
import { IProject } from "@/types/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/project-card";

function Projects() {
  const [data, setData] = useState<IProject[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://0d66cdb5761cc26d.mokky.dev/projects');
        setData(response.data);
      } catch (e) {
        console.error('Error fetching:', e);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="px-5 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

    </div>
  );
}

export default Projects;
