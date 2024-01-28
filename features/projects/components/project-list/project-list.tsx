import { ProjectCard } from "../project-card";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";
import { Spinner } from "../loading-spinner";

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    console.error(error);
    return (
      <div className={styles.error} data-cy={"alert-error"}>
        <div>
          <img src="/icons/alert-circle.svg" alt="Alert Circle" />
          <div>There was a problem while loading the project data</div>
        </div>
        <button className={styles["refetch-button"]} onClick={() => refetch()}>
          Try Again
          <img src="/icons/arrow-right.svg" alt="Arrow Right" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <ul className={styles.list}>
        {data?.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
