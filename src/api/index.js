// export * from '路径'
// 从路径下 引入所有"按需导出"的东西, 再原封不动的按需暴露出去
// 不包含默认导出的东西

// import { login, getCodeAPI } from './user'
// export { login, getCodeAPI }
export * from './user'

// 引入默认导出的东西, 重新起名后按需导出, default
export { default as getUser } from './user'
