import React from 'react';
import styles from "../styles/Home.module.css";

// 用props帶入(控制加入時間排序開關、控制已完成向下排序開關)
export const TodoControls = ({ sortByTime, setSortByTime, sortByCompletion, setSortByCompletion }) => {
  return (
    <div className="switch">
        {/* 開關：按時間排序  */}
      <div className="form-check form-switch switch-item">
        <input
          type="checkbox"
          className="form-check-input"
          role="switch"
          id="timeSortSwitch"
          checked={sortByTime}
          onChange={(e) => setSortByTime(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="timeSortSwitch">
          按加入時間排序
        </label>
      </div>
      {/* 開關：已完成的移到底部 */}
      <div className="form-check form-switch switch-item">
        <input
          type="checkbox"
          className="form-check-input"
          role="switch"
          id="sortSwitch"
          checked={sortByCompletion}
          onChange={(e) => setSortByCompletion(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="sortSwitch">
          將已完成項目移至底部
        </label>
      </div>
    </div>
  );
};