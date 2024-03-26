import { useRouter } from "next/router";
import { ProjectLanguage } from "@api/projects.types";
import { useGetProjects } from "@features/projects";
import { useGetIssues } from "../../api/use-get-issues";
import { IssueRow } from "./issue-row";
import { UISelect, UIInput, UIButton } from "@features/ui";
import styles from "./issue-list.module.scss";
import { capitalize } from "lodash";
import { UICheckbox } from "@features/ui";

export type status = "open" | "resolved" | undefined;
export type level = "error" | "warning" | "info" | undefined;
export type search = string | undefined;

const statusFiltertoDisplay = {
  open: "Unresolved",
  resolved: "Resolved",
};

export function IssueList() {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const statusFilter = router.query.status as status;
  const levelFilter = router.query.level as level;
  const searchFilter = router.query.search as search;

  // Adjust values to match the dropdown options
  const statusDisplay = statusFilter && statusFiltertoDisplay[statusFilter];
  const levelDisplay = levelFilter && capitalize(levelFilter);

  const setFilters = (
    page: number,
    status: status,
    level: level,
    search: search,
  ) => {
    router.push({
      pathname: router.pathname,
      query: {
        page: page,
        status: status,
        level: level,
        search: search,
      },
    });
  };

  const issuesPage = useGetIssues(
    page,
    statusFilter,
    levelFilter,
    searchFilter,
  );
  const projects = useGetProjects();

  if (projects.isLoading || issuesPage.isLoading) {
    return <div>Loading</div>;
  }

  if (projects.isError) {
    console.error(projects.error);
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>,
  );
  const { items, meta } = issuesPage.data || {};

  const handleSelectStatus = (option: string | undefined) => {
    if (option === "Resolved") {
      setFilters(page, "resolved", levelFilter, searchFilter);
    } else if (option === "Unresolved") {
      setFilters(page, "open", levelFilter, searchFilter);
    } else if (option === undefined) {
      setFilters(page, undefined, levelFilter, searchFilter);
    }
  };

  const handleSelectLevel = (option: string | undefined) => {
    const level = option && option.toLowerCase();
    if (level === "error" || level === "info" || level === "warning") {
      setFilters(page, statusFilter, level, searchFilter);
    } else if (option === undefined) {
      setFilters(page, statusFilter, undefined, searchFilter);
    }
  };

  const handleSearch = (input: string) => {
    setFilters(page, statusFilter, levelFilter, input);
  };

  return (
    <div>
      <div className={styles.filters}>
        <div>
          <UIButton
            as="button"
            size="medium"
            color="primary"
            icon={true}
            iconSrc="/icons/checkwhite.svg"
            iconPosition="leading"
            iconAlt="checkmark"
          >
            Resolve selected issues
          </UIButton>
        </div>
        <div className={styles.inputs}>
          <div className={styles.select}>
            <UISelect
              onSelect={handleSelectStatus}
              options={["Resolved", "Unresolved"]}
              width="100%"
              placeholder="Status"
              defaultOption={statusDisplay}
            />
          </div>
          <div className={styles.select}>
            <UISelect
              onSelect={handleSelectLevel}
              options={["Error", "Warning", "Info"]}
              width="100%"
              placeholder="Level"
              defaultOption={levelDisplay}
            />
          </div>
          <div className={styles.input}>
            <UIInput
              onChange={handleSearch}
              placeholder="Project Name"
              icon="/icons/search.svg"
              value={searchFilter}
            />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>
                <UICheckbox
                  onChange={() => undefined}
                  checked={false}
                  size="medium"
                ></UICheckbox>{" "}
                Issue
              </th>
              <th className={styles.headerCell}>Graph</th>
              <th className={styles.headerCell}>Level</th>
              <th className={styles.headerCell}>Events</th>
              <th className={styles.headerCell}>Users</th>
            </tr>
          </thead>
          <tbody>
            {(items || []).map((issue) => (
              <IssueRow
                key={issue.id}
                issue={issue}
                projectLanguage={projectIdToLanguage[issue.projectId]}
              />
            ))}
          </tbody>
        </table>
        <div className={styles.paginationContainer}>
          <div>
            <button
              className={styles.paginationButton}
              onClick={() =>
                setFilters(page - 1, statusFilter, levelFilter, searchFilter)
              }
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className={styles.paginationButton}
              onClick={() =>
                setFilters(page + 1, statusFilter, levelFilter, searchFilter)
              }
              disabled={page === meta?.totalPages}
            >
              Next
            </button>
          </div>
          <div className={styles.pageInfo}>
            Page <span className={styles.pageNumber}>{meta?.currentPage}</span>{" "}
            of <span className={styles.pageNumber}>{meta?.totalPages}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
