import React from 'react';
import { TiDeleteOutline } from "react-icons/ti";//引入icon套件
import styles from "../styles/Home.module.css";

// 用props帶入(清單item、索引index、拖曳provided、控制已完成項目finishedItems、完成清單函式handleFinish、刪除清單函式handleRemove)
export const TodoItem = ({ item, index, provided, finishedItems, handleFinish, handleRemove }) => {
  return (
    <div
      ref={provided.innerRef}
    // 展開.draggableProps、...provided.dragHandleProps
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={styles.item}
    >
    {/* 勾選完成checkbox */}
      <input
        type="checkbox"
        //checked值綁定finishedItems(set).has判斷是否包含item.content
        checked={finishedItems.has(item.content)}
        //onChange帶入元素標籤 e.target.checked勾選狀態及item.content內容
        onChange={(e) => handleFinish(item.content, e.target.checked)}
        className={styles.checkbox}
      />
      <span
        className={`${styles.content} ${
            //finishedItems(set).has判斷是否包含item.content 用三源運算來切換style樣式
          finishedItems.has(item.content) ? styles.contentCompleted : ""
        }`}
      >
        {item.content}
      </span>
      {/* 刪除按鈕 */}
      {/* handleRemove(item.content)}帶入item.content參數來刪除列表中清單 */}
      <button onClick={() => handleRemove(item.content)} className={styles.deleteButton}>
        <TiDeleteOutline className={styles.deleteIcon} />
      </button>
    </div>
  );
};