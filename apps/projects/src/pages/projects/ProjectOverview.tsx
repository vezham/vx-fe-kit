import { ProjectLayout } from '../../layouts/projects'
import { ProjectDetails } from '../../layouts/projects/project-details'
import { ProjectDetailsProps } from '../../layouts/projects/types'

const Page: React.FC<ProjectDetailsProps> = originalProps => {
  const { project } = originalProps
  return (
    <>
      <ProjectLayout />
      <ProjectDetails project={project} />
    </>
  )
}

export { Page }
