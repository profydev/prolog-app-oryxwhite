import { ProjectCard } from "../project-card";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    console.error(error);
    return (
      <div className={styles.error}>
        <div>
          <img src="/icons/alert-circle.svg" alt="Alert Circle" />
          <div>There was a problem while loading the project data</div>
        </div>
        {/* <div> */}
        <button className={styles["refetch-button"]} onClick={() => refetch()}>
          Try Again
          <img src="/icons/arrow-right.svg" alt="Arrow Right" />
        </button>
        {/* </div> */}
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
