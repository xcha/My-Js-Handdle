<!-- FsVirtualList.vue -->
<template>
    <div class="container">
        <div ref="containerRef" class="fs-virtuallist-container" @scroll="handleScroll">
            <div class="fs-virtuallist-list" :style="scrollStyle">
                <div v-for="item in renderList" :key="item" class="fs-virtuallist-item">
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, nextTick } from 'vue'

// ---------- 状态定义 ----------
const state = reactive({
    dataSource: [],        // 模拟数据源
    itemHeight: 100,       // 固定 item 高度 (px)
    viewHeight: 0,         // container 高度
    maxCount: 0,           // 虚拟列表视图最大容纳量
})

const containerRef = ref(null)  // 容器 DOM 引用
const startIndex = ref(0)       // 当前视图起始索引
const lastStart = ref(0)        // 上次起始索引，用于判断是否重新渲染

// ---------- 计算属性 ----------
// 计算当前视图结束索引
const endIndex = computed(() => {
    const end = startIndex.value + state.maxCount
    return end < state.dataSource.length ? end : state.dataSource.length
})

// 计算当前要渲染的列表
const renderList = computed(() => {
    return state.dataSource.slice(startIndex.value, endIndex.value)
})

// 计算滚动容器的样式（高度 + 偏移）
const scrollStyle = computed(() => {
    const { dataSource, itemHeight } = state
    const totalHeight = dataSource.length * itemHeight
    const offset = startIndex.value * itemHeight

    return {
        height: `${totalHeight - offset}px`,      // 剩余高度撑开滚动条
        transform: `translate3d(0, ${offset}px, 0)` // Y轴偏移
    }
})

// ---------- 方法 ----------
// 添加更多数据（模拟滚动到底部加载）
const addData = () => {
    for (let i = 0; i < 10; i++) {
        state.dataSource.push(state.dataSource.length + 1)
    }
}

// 检查是否需要添加数据（当 endIndex 接近末尾时）
const checkAddData = () => {
    if (endIndex.value >= state.dataSource.length - 1) {
        addData()
    }
}

// 滚动事件处理（带 raf 节流）
const handleScroll = () => {
    if (!containerRef.value) return

    const scrollTop = containerRef.value.scrollTop
    const newStartIndex = Math.floor(scrollTop / state.itemHeight)

    if (newStartIndex !== startIndex.value) {
        startIndex.value = newStartIndex
        // 这里不需要手动调 render，因为计算属性会响应式更新
        // 但需要检查是否需要加载更多数据
        checkAddData()
    }
}

// 初始化容器高度和 maxCount
const init = () => {
    if (!containerRef.value) return

    // 获取容器实际高度
    state.viewHeight = containerRef.value.offsetHeight
    // 计算最多能渲染多少个 item（向上取整 + 1 作为缓冲区）
    state.maxCount = Math.ceil(state.viewHeight / state.itemHeight) + 1

    // 初始添加数据
    addData()
}

// ---------- 生命周期 ----------
onMounted(() => {
    init()
})
</script>

<style scoped>
.container {
    width: 600px;
    height: 600px;
    margin: 100px auto;
    border: 1px solid red;
}

.fs-virtuallist-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.fs-virtuallist-list {
    width: 100%;
    position: relative;
    /* 确保 transform 生效 */
}

.fs-virtuallist-item {
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    border: 1px solid #000;
    text-align: center;
    font-size: 20px;
    line-height: 100px;
}
</style>