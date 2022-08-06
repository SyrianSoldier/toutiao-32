// 将file对象解析成base64, 以promise管理
export const resolveToBase64 = (file) => {
  return new Promise((resolve) => {
    const fr = new FileReader()

    fr.readAsDataURL(file)

    fr.onload = (e) => {
      resolve(e.target.result)
    }
  })
}
