import React, { useRef, useState, useEffect } from "react"//引入hook
import { DragDropContext } from "@hello-pangea/dnd"//引入拖曳套件
import { TodoHeader } from '../components/TodoHeader'//引入元件TodoHeader
import { TodoListComponent } from '../components/TodoList'//引入元件TodoList
import { TodoControls } from '../components/TodoControls'//引入元件TodoControls
import { TodoInput } from '../components/TodoInput'//引入元件TodoInput
import styles from "../styles/Home.module.css"//引入樣式
import "bootstrap/dist/css/bootstrap.min.css"//引入bootstrap

const TodoList = () => {
    const [text, setText] = useState("");//控制輸入文字
    const [list, setList] = useState([
      { content: "買牛奶", timestamp: Date.now() - 300000 },
      { content: "寫程式", timestamp: Date.now() - 200000 },
      { content: "運動", timestamp: Date.now() - 100000 },
    ]);//控制列表
    const [finishedItems, setFinishedItems] = useState(new Set());//控制已完成項目
    const [sortByTime, setSortByTime] = useState(true);//控制加入時間排序開關
    const [sortByCompletion, setSortByCompletion] = useState(false);//控制已完成向下排序開關
    const progressBarRef = useRef();//完成進度條抓取dom操作
    const bottomRef = useRef(null); // 用來滾動到清單底部
    const isAddingRef = useRef(false);//來標記是否是新增
    const add=useRef(false)//使否有輸入文字，控制+加入按鈕
  
    //當未輸入時無法新增至清單
    useEffect(()=>{
      if(!text){
        add.current.disabled=false 
        // 無法送出提示
        add.current.style.cursor= 'not-allowed'
      }else{
        add.current.disabled=false
        // 可點擊提示
        add.current.style.cursor= 'pointer'
      }
      // 狀態控制是否有輸入文字
    },[text])
  
    //當新增清單當列表狀態更改時觸發 scrollToBottom事件
    useEffect(() => {
      if (isAddingRef.current) {
        scrollToBottom();
        isAddingRef.current = false; // 重置標記
      }
    }, [list]);
  
    //僅在新增項目時滾動到底部 
    const scrollToBottom = () => {
    //滑動到ref指定元素中
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
  
    // 處理拖曳後重新排序
    const handleDragEnd = (result) => {
      if (!result.destination) return;
      const newList = Array.from(list);
      const [movedItem] = newList.splice(result.source.index, 1);
      newList.splice(result.destination.index, 0, movedItem);
      setList(newList);
      setSortByTime(false);
    };
  
    //新增清單
    const handleAdd = () => {
      //去掉前後空白判斷是否為空字串
      if (text.trim() === "") return;
      const newItem = { content: text, timestamp: Date.now() };//加入時間key來判斷排列順序
      isAddingRef.current = true;//將新增ref設為true
      setList([...list, newItem]);//展開陣列將新的值加入到陣列中
      setText("");
      scrollToBottom(); // 新增時滾動到底部
    };
  
    //刪除清單
    const handleRemove = (content) => {
      const del = confirm("是否刪除？")//判斷是否刪除
      if (del) {//如果為true則使用filter去除所選擇的陣列值
        setList(list.filter((item) => item.content !== content));
        setFinishedItems((prev) => {//設定finishedItems狀態搭配set集合使用
          const newSet = new Set(prev);
          newSet.delete(content);
          return newSet;
        });
      }
    };
  
    //完成清單
    const handleFinish = (content, isChecked) => {
      setFinishedItems((prev) => {//設定finishedItems狀態搭配set集合使用
        const newSet = new Set(prev);
        if (isChecked) {//將帶入參數判斷是否勾選
          newSet.add(content);
        } else {
          newSet.delete(content);
        }
        return newSet;
      });
    };
  
    //排序規則
    const getSortedItems = () => {
      let sortedList = [...list];
  
      if (sortByTime) { //使用陣列sort方法作時間排序
        sortedList.sort((a, b) => a.timestamp - b.timestamp);
      }
  
      if (sortByCompletion) {
      if (sortByTime) { //使用陣列sort方法作時間排序
        sortedList.sort((a, b) => {//使用set.has方法判斷使否含有完成的清單
          const isAFinished = finishedItems.has(a.content);
          const isBFinished = finishedItems.has(b.content);
          return isAFinished === isBFinished ? 0 : isAFinished ? 1 : -1;
        });
      }
  
      
    };
    return sortedList;
    }
  
    // 計算已完成的進度finishedItems.size(set.size取得已完成的數量)/list.length(list.length取得陣列長度)*100.toFixed(0)去掉後面小數點
    const completionPercentage = ((finishedItems.size / list.length) * 100).toFixed(0);

      // ------------------------------------------------

  return (
    <div className={styles.container}>
      {/* 進度條區塊 */}
      <TodoHeader 
        completionPercentage={completionPercentage}
        progressBarRef={progressBarRef}
      />
      
      {/* 拖曳清單區塊區塊 */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <TodoListComponent
          getSortedItems={getSortedItems}
          finishedItems={finishedItems}
          handleFinish={handleFinish}
          handleRemove={handleRemove}
          bottomRef={bottomRef}
        />
      </DragDropContext>

       {/* 切換排序區塊 */}
      <TodoControls
        sortByTime={sortByTime}
        setSortByTime={setSortByTime}
        sortByCompletion={sortByCompletion}
        setSortByCompletion={setSortByCompletion}
      />

      {/* 新增區塊 */}
      <TodoInput
        text={text}
        setText={setText}
        handleAdd={handleAdd}
        add={add}
      />
    </div>
  );
};

export default TodoList;