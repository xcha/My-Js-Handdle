import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import "./FsVirtualList.css"; // 样式文件（见下文）

const FsVirtualList = () => {
  // ---------- 状态定义 ----------
  const [dataSource, setDataSource] = useState([]);
  const [viewHeight, setViewHeight] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  // 固定配置
  const itemHeight = 100;

  // DOM 引用
  const containerRef = useRef(null);

  // 计算最大容纳量
  const maxCount = useMemo(() => {
    return Math.ceil(viewHeight / itemHeight) + 1;
  }, [viewHeight]);

  // 计算结束索引
  const endIndex = useMemo(() => {
    const end = startIndex + maxCount;
    return end < dataSource.length ? end : dataSource.length;
  }, [startIndex, maxCount, dataSource.length]);

  // 计算当前渲染列表
  const renderList = useMemo(() => {
    return dataSource.slice(startIndex, endIndex);
  }, [dataSource, startIndex, endIndex]);

  // 计算滚动样式
  const scrollStyle = useMemo(() => {
    const totalHeight = dataSource.length * itemHeight;
    const offset = startIndex * itemHeight;

    return {
      height: `${totalHeight - offset}px`,
      transform: `translate3d(0, ${offset}px, 0)`,
    };
  }, [dataSource.length, startIndex, itemHeight]);

  // ---------- 辅助函数 ----------
  // 添加更多数据
  const addData = useCallback(() => {
    setDataSource((prev) => {
      const newData = [];
      for (let i = 0; i < 10; i++) {
        newData.push(prev.length + i + 1);
      }
      return [...prev, ...newData];
    });
  }, []);

  // 检查是否需要加载更多
  const checkAddData = useCallback(() => {
    if (endIndex >= dataSource.length - 1) {
      addData();
    }
  }, [endIndex, dataSource.length, addData]);

  // 滚动处理
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const scrollTop = containerRef.current.scrollTop;
    const newStartIndex = Math.floor(scrollTop / itemHeight);

    if (newStartIndex !== startIndex) {
      setStartIndex(newStartIndex);
      // 在下次渲染后检查是否需要加载更多
      setTimeout(checkAddData, 0);
    }
  }, [startIndex, itemHeight, checkAddData]);

  // 节流处理（使用 requestAnimationFrame）
  const throttledScroll = useCallback(() => {
    let ticking = false;

    return () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
  }, [handleScroll]);

  // ---------- 初始化 ----------
  useEffect(() => {
    if (containerRef.current) {
      // 获取容器高度
      setViewHeight(containerRef.current.offsetHeight);
      // 初始添加数据
      addData();
    }
  }, [addData]);

  // 监听 scroll 事件
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollHandler = throttledScroll();
    container.addEventListener("scroll", scrollHandler);

    return () => {
      container.removeEventListener("scroll", scrollHandler);
    };
  }, [throttledScroll]);

  // 当数据源变化时，检查是否需要立即加载更多（处理快速滚动到底部的情况）
  useEffect(() => {
    checkAddData();
  }, [endIndex, checkAddData]);

  return (
    <div className="container">
      <div ref={containerRef} className="fs-virtuallist-container">
        <div className="fs-virtuallist-list" style={scrollStyle}>
          {renderList.map((item) => (
            <div key={item} className="fs-virtuallist-item">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default FsVirtualList;

