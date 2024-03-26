import capitalize from "lodash/capitalize";
import { Badge, BadgeColor, BadgeSize } from "@features/ui";
import { ProjectLanguage } from "@api/projects.types";
import { IssueLevel } from "@api/issues.types";
import type { Issue } from "@api/issues.types";
import styles from "./issue-row.module.scss";
import { UICheckbox } from "@features/ui";
import { useState, useEffect } from "react";

type IssueRowProps = {
  projectLanguage: ProjectLanguage;
  issue: Issue;
};

const levelColors = {
  [IssueLevel.info]: BadgeColor.success,
  [IssueLevel.warning]: BadgeColor.warning,
  [IssueLevel.error]: BadgeColor.error,
};

export function IssueRow({ projectLanguage, issue }: IssueRowProps) {
  const [checked, setChecked] = useState(false);

  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];

  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const handleViewportUpdate = () => {
      const newViewport = window.innerWidth;
      setViewportWidth(newViewport);
    };
    handleViewportUpdate();
    window.addEventListener("resize", handleViewportUpdate);
    return () => window.removeEventListener("resize", handleViewportUpdate);
  });

  return (
    <div className={styles.row}>
      <div className={styles.issueCell}>
        <div className={styles.checkbox}>
          <UICheckbox
            onChange={() => setChecked(!checked)}
            checked={checked}
            size="medium"
          ></UICheckbox>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.languageIcon}
          src={`/icons/${projectLanguage}.svg`}
          alt={projectLanguage}
        />
        <div>
          <div className={styles.errorTypeAndMessage}>
            <span className={styles.errorType}>{name}:&nbsp;</span>
            {message}
          </div>
          <div>{firstLineOfStackTrace}</div>
        </div>
      </div>
      <div className={styles.cell}>
        <picture>
          <source media="(max-width: 845px)" srcSet="/icons/chartmobile.png" />
          <source media="(min-width: 845px)" srcSet="/icons/chart.png" />
          <img src="/icons/chart.png" alt="chart" />
        </picture>
      </div>

      {viewportWidth <= 845 ? (
        <div className={styles.badges}>
          <div className={styles.badgescontainer}>
            <span>Status</span>
            <Badge color={levelColors[level]} size={BadgeSize.sm}>
              {capitalize(level)}
            </Badge>
          </div>
          <div className={styles.badgescontainer}>
            <span>Events</span>
            {numEvents}
          </div>
          <div className={styles.badgescontainer}>
            <span>Users</span>
            {numUsers}
          </div>
        </div>
      ) : (
        <>
          <div className={styles.cell}>
            <Badge color={levelColors[level]} size={BadgeSize.sm}>
              {capitalize(level)}
            </Badge>
          </div>
          <div className={styles.cell}>{numEvents}</div>
          <div className={styles.cell}>{numUsers}</div>
        </>
      )}
    </div>
  );
}
