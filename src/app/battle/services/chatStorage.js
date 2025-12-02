/**
 * 对战聊天 IndexedDB 存储服务
 */

const DB_NAME = 'battle-chat-db'
const DB_VERSION = 1
const STORE_NAME = 'sessions'

let db = null

/**
 * 初始化数据库
 */
export async function initDB() {
  if (db) return db
  
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    
    request.onerror = () => reject(request.error)
    
    request.onsuccess = () => {
      db = request.result
      resolve(db)
    }
    
    request.onupgradeneeded = (event) => {
      const database = event.target.result
      
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        const store = database.createObjectStore(STORE_NAME, { keyPath: 'id' })
        store.createIndex('updatedAt', 'updatedAt', { unique: false })
      }
    }
  })
}

/**
 * 会话数据结构
 * @typedef {Object} Session
 * @property {string} id - 会话ID
 * @property {string} title - 会话标题（第一条消息的前20字）
 * @property {Array} messages - 消息列表
 * @property {Object} votes - 投票记录 { roundIndex: { choice, modelA, modelB } }
 * @property {string} modelA - 模型A的ID
 * @property {string} modelB - 模型B的ID
 * @property {number} createdAt - 创建时间
 * @property {number} updatedAt - 更新时间
 */

/**
 * 创建新会话
 */
export async function createSession(modelA, modelB) {
  await initDB()
  
  const session = {
    id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: '新对话',
    messages: [],
    votes: {},
    modelA,
    modelB,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.add(session)
    
    request.onsuccess = () => resolve(session)
    request.onerror = () => reject(request.error)
  })
}

/**
 * 获取会话
 */
export async function getSession(id) {
  await initDB()
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get(id)
    
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

/**
 * 更新会话
 * @param {string|Object} sessionOrId - 会话对象或会话ID
 * @param {Object} [updates] - 如果第一个参数是ID，则此参数为更新内容
 */
export async function updateSession(sessionOrId, updates = null) {
  await initDB()
  
  // 支持两种调用方式：
  // 1. updateSession(session) - 传入完整会话对象
  // 2. updateSession(sessionId, { title: 'xxx' }) - 传入ID和部分更新
  let sessionToUpdate
  
  if (typeof sessionOrId === 'string' && updates) {
    // 方式2：先获取现有会话，再合并更新
    const existing = await getSession(sessionOrId)
    if (!existing) throw new Error('Session not found')
    sessionToUpdate = { ...existing, ...updates }
  } else {
    // 方式1：传入完整对象
    sessionToUpdate = sessionOrId
  }
  
  const updated = {
    ...sessionToUpdate,
    updatedAt: Date.now(),
  }
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.put(updated)
    
    request.onsuccess = () => resolve(updated)
    request.onerror = () => reject(request.error)
  })
}

/**
 * 删除会话
 */
export async function deleteSession(id) {
  await initDB()
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.delete(id)
    
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

/**
 * 获取所有会话（按更新时间倒序）
 */
export async function getAllSessions() {
  await initDB()
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const index = store.index('updatedAt')
    const request = index.openCursor(null, 'prev')
    
    const sessions = []
    request.onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        sessions.push(cursor.value)
        cursor.continue()
      } else {
        resolve(sessions)
      }
    }
    request.onerror = () => reject(request.error)
  })
}

/**
 * 清空所有会话
 */
export async function clearAllSessions() {
  await initDB()
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.clear()
    
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}
