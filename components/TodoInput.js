import React from 'react';
import styles from "../styles/Home.module.css";

// 用props帶入(text,setText控制輸入文字、handleAdd新增清單function、add使否有輸入文字，控制+加入按鈕)
export const TodoInput = ({ text, setText, handleAdd, add }) => {
  return (
    <div className={styles.inputWrapper}>
         {/* 輸入加入清單文字input */}
      <input
        type="text"
        value={text}//綁定狀態
        onChange={(e) => setText(e.target.value)}//設定狀態
        placeholder="新增待辦事項"
        className={styles.input}
      />
      <button onClick={handleAdd} className={styles.addButton} ref={add}>
        +
      </button>
    </div>
  );
};