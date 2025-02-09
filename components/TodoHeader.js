import React from 'react';
import styles from "../styles/Home.module.css";

// 用props帶入(completionPercentage計算已完成的進度、progressBarRef完成進度條抓取dom操作)
export const TodoHeader = ({ completionPercentage, progressBarRef }) => {
  return (
    <>
      <h1 className={styles.title}>TodoList</h1>
      <h6 className={styles.directions}>Add things to do</h6>
      <hr />
      <div className={styles.progressWrapper}>
        <p className={styles.progressText}>完成度：{completionPercentage}%</p>
        <div className={styles.progressBar}>
          <div
            ref={progressBarRef}
            className={styles.progressFill}
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </>
  );
};