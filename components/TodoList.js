import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd"; //引入拖曳套件
import { TodoItem } from "./TodoItem";
import styles from "../styles/Home.module.css";

// 用props帶入(排序規則函式getSortedItems、控制已完成項目finishedItems、完成清單函式handleFinish、刪除清單函式handleRemove、用來滾動到清單底部bottomRef)
export const TodoListComponent = ({
  getSortedItems,
  finishedItems,
  handleFinish,
  handleRemove,
  bottomRef,
}) => {
  return (
    <Droppable droppableId="todo-list">
      {(provided) => (
        <div
          className={styles.list}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {/* 使用map方法遍歷清單陣列 */}
          {getSortedItems().map((item, index) => (
            <Draggable
              key={item.content}
              draggableId={item.content}
              index={index}
            >
              {(provided) => (
                <TodoItem
                  item={item}
                  index={index}
                  provided={provided}
                  finishedItems={finishedItems}
                  handleFinish={handleFinish}
                  handleRemove={handleRemove}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          {/* 這個 div 會幫助滾動到底部 */}
          <div ref={bottomRef} />
        </div>
      )}
    </Droppable>
  );
};
